import { WALLET_FILE_NAME } from "./utils/constants.ts";
import {
  address,
  appendTransactionMessageInstruction,
  createKeyPairSignerFromPrivateKeyBytes,
  createTransactionMessage,
  getBase64Encoder,
  getSignatureFromTransaction,
  isSolanaError,
  pipe,
  sendAndConfirmTransactionFactory,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  type Blockhash,
  type KeyPairSigner,
} from "@solana/web3.js";
import { createLogger, explorerUrl } from "./utils/helpers.ts";
import { beforeAll, beforeEach, describe, it } from "vitest";
import { assert } from "chai";
import {
  createDevnetSolanaRpc,
  createDevnetSolanaRpcSubscriptions,
} from "./__setup__.ts";
import { getGetVirtualPriceInstruction } from "../sdk/meteora-vp/js/src/generated/index.ts";
import { getPoolDecoder } from "../sdk/dynamic-amm/js/src/generated/index.ts";
import { getVaultDecoder } from "../sdk/dynamic-vault/js/src/generated/index.ts";
import Bun from "bun";

const log = createLogger("meteora-vp");

describe("Meteora Virtual Price Program", () => {
  let rpc: ReturnType<typeof createDevnetSolanaRpc>;
  let rpcSubscriptions: ReturnType<typeof createDevnetSolanaRpcSubscriptions>;
  let sendAndConfirm: ReturnType<typeof sendAndConfirmTransactionFactory>;
  let signer: KeyPairSigner<string>;
  let latestBlockhash: Readonly<{
    blockhash: Blockhash;
    lastValidBlockHeight: bigint;
  }>;

  // const devPool = address("FX8rBiRLHKoSzGM8GZbeMxMiVdNLiX4wfuR6BWLSaf1F");
  const devPool = address("FZgdEqq6rwsWnsZ83Ez2pyJqPdPGfDvzYhrbvcboTPtf");
  // const devPool = address("7Q5fLUP4fjTr1pfMXJA2JiQt2kbX8Dc6oo17mKw2qxKi");
  // const devPool = address("2rkn2yM4wJcHPV57T8fPWeBksrfSpiNZoEjRgjtxNDEQ");
  const programId = address("expo9shvoWz6Bi96TsomKkWTAWYAm4ywuzP2u8EAXaV");

  beforeAll(async () => {
    const file = Bun.file(WALLET_FILE_NAME);
    const secretKey = new Uint8Array(await file.json());
    const privateKeyRaw = secretKey.slice(0, 32);
    const keypair = await createKeyPairSignerFromPrivateKeyBytes(privateKeyRaw);
    const keypairPublicKey = keypair.address;

    log.info("Signer: %s", keypairPublicKey);

    rpc = createDevnetSolanaRpc();
    rpcSubscriptions = createDevnetSolanaRpcSubscriptions();
    signer = keypair;
    sendAndConfirm = sendAndConfirmTransactionFactory({
      rpc,
      rpcSubscriptions,
    });
  });

  beforeEach(async () => {
    const { value } = await rpc
      .getLatestBlockhash({
        commitment: "confirmed",
      })
      .send();

    latestBlockhash = value;
  });

  it("successfully calls the getVirtualPrice function", async () => {
    const poolData = await rpc
      .getAccountInfo(devPool, {
        encoding: "base64",
      })
      .send();

    assert(poolData.value?.data, "Pool not found");

    const rawPoolData = getBase64Encoder().encode(poolData.value?.data[0]);
    const pool = getPoolDecoder().decode(rawPoolData);

    log.info("CurveType: %s", pool.curveType.__kind);
    log.info("Pool: %s", devPool);

    const aVaultData = await rpc
      .getAccountInfo(pool.aVault, {
        encoding: "base64",
      })
      .send();
    const bVaultData = await rpc
      .getAccountInfo(pool.bVault, {
        encoding: "base64",
      })
      .send();

    assert(aVaultData.value?.data, "a_vault account not found");
    assert(bVaultData.value?.data, "b_vault account not found");

    const rawAvaultData = getBase64Encoder().encode(aVaultData.value?.data[0]);
    const aVault = getVaultDecoder().decode(rawAvaultData);

    const rawBvaultData = getBase64Encoder().encode(bVaultData.value?.data[0]);
    const bVault = getVaultDecoder().decode(rawBvaultData);

    const instruction = getGetVirtualPriceInstruction(
      {
        pool: devPool,
        lpMint: pool.lpMint,
        payer: signer,
        aVault: pool.aVault,
        bVault: pool.bVault,
        aVaultLpMint: aVault.lpMint,
        bVaultLpMint: bVault.lpMint,
        aVaultLp: pool.aVaultLp,
        bVaultLp: pool.bVaultLp,
      },
      {
        programAddress: programId,
      },
    );

    const txMsg = pipe(
      createTransactionMessage({
        version: 0,
      }),
      (tx) => setTransactionMessageFeePayerSigner(signer, tx),
      (tx) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
      (tx) => appendTransactionMessageInstruction(instruction, tx),
    );

    const signedTx = await signTransactionMessageWithSigners(txMsg);
    const tx = getSignatureFromTransaction(signedTx);

    const poolVaultAlp = await rpc
      .getTokenAccountBalance(address(pool.aVaultLp))
      .send();
    const poolVaultBlp = await rpc
      .getTokenAccountBalance(address(pool.bVaultLp))
      .send();
    const poolVaultAsupply = await rpc
      .getTokenSupply(address(aVault.lpMint))
      .send();
    const poolVaultBsupply = await rpc
      .getTokenSupply(address(bVault.lpMint))
      .send();
    const poolLpSupply = await rpc.getTokenSupply(address(pool.lpMint)).send();

    assert(poolVaultAlp.value, "poolVaultALp not found");
    assert(poolVaultBlp.value, "poolVaultBLp not found");
    assert(poolVaultAsupply.value, "poolVaultAsupply not found");
    assert(poolVaultBsupply.value, "poolVaultBsupply not found");
    assert(poolLpSupply.value, "poolLpSupply not found");

    try {
      await sendAndConfirm(signedTx, {
        commitment: "confirmed",
      });
      log.info("signature: %s", tx);
      log.info("explorer url: %s", explorerUrl(tx));
    } catch (error: unknown) {
      if (isSolanaError(error)) {
        log.error(error.context);
        assert.fail(error.message);
      }
    }
  });
});
