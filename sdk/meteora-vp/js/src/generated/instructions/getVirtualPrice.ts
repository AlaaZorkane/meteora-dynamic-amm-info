/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { METEORA_VP_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const GET_VIRTUAL_PRICE_DISCRIMINATOR = new Uint8Array([
  41, 165, 98, 171, 1, 184, 61, 157,
]);

export function getGetVirtualPriceDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    GET_VIRTUAL_PRICE_DISCRIMINATOR
  );
}

export type GetVirtualPriceInstruction<
  TProgram extends string = typeof METEORA_VP_PROGRAM_ADDRESS,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLpMint extends string | IAccountMeta<string> = string,
  TAccountAVaultLpMint extends string | IAccountMeta<string> = string,
  TAccountBVaultLpMint extends string | IAccountMeta<string> = string,
  TAccountAVaultLp extends string | IAccountMeta<string> = string,
  TAccountBVaultLp extends string | IAccountMeta<string> = string,
  TAccountAVault extends string | IAccountMeta<string> = string,
  TAccountBVault extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountPool extends string
        ? ReadonlyAccount<TAccountPool>
        : TAccountPool,
      TAccountLpMint extends string
        ? ReadonlyAccount<TAccountLpMint>
        : TAccountLpMint,
      TAccountAVaultLpMint extends string
        ? ReadonlyAccount<TAccountAVaultLpMint>
        : TAccountAVaultLpMint,
      TAccountBVaultLpMint extends string
        ? ReadonlyAccount<TAccountBVaultLpMint>
        : TAccountBVaultLpMint,
      TAccountAVaultLp extends string
        ? ReadonlyAccount<TAccountAVaultLp>
        : TAccountAVaultLp,
      TAccountBVaultLp extends string
        ? ReadonlyAccount<TAccountBVaultLp>
        : TAccountBVaultLp,
      TAccountAVault extends string
        ? ReadonlyAccount<TAccountAVault>
        : TAccountAVault,
      TAccountBVault extends string
        ? ReadonlyAccount<TAccountBVault>
        : TAccountBVault,
      ...TRemainingAccounts,
    ]
  >;

export type GetVirtualPriceInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type GetVirtualPriceInstructionDataArgs = {};

export function getGetVirtualPriceInstructionDataEncoder(): Encoder<GetVirtualPriceInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: GET_VIRTUAL_PRICE_DISCRIMINATOR })
  );
}

export function getGetVirtualPriceInstructionDataDecoder(): Decoder<GetVirtualPriceInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getGetVirtualPriceInstructionDataCodec(): Codec<
  GetVirtualPriceInstructionDataArgs,
  GetVirtualPriceInstructionData
> {
  return combineCodec(
    getGetVirtualPriceInstructionDataEncoder(),
    getGetVirtualPriceInstructionDataDecoder()
  );
}

export type GetVirtualPriceInput<
  TAccountPayer extends string = string,
  TAccountPool extends string = string,
  TAccountLpMint extends string = string,
  TAccountAVaultLpMint extends string = string,
  TAccountBVaultLpMint extends string = string,
  TAccountAVaultLp extends string = string,
  TAccountBVaultLp extends string = string,
  TAccountAVault extends string = string,
  TAccountBVault extends string = string,
> = {
  payer: TransactionSigner<TAccountPayer>;
  /** Pool account (PDA) */
  pool: Address<TAccountPool>;
  /** LP token mint of the pool */
  lpMint: Address<TAccountLpMint>;
  /** LP token mint of vault A */
  aVaultLpMint: Address<TAccountAVaultLpMint>;
  /** LP token mint of vault B */
  bVaultLpMint: Address<TAccountBVaultLpMint>;
  /** LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
  aVaultLp: Address<TAccountAVaultLp>;
  /** LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
  bVaultLp: Address<TAccountBVaultLp>;
  /** Vault account for token a. token a of the pool will be deposit / withdraw from this vault account. */
  aVault: Address<TAccountAVault>;
  /** Vault account for token b. token b of the pool will be deposit / withdraw from this vault account. */
  bVault: Address<TAccountBVault>;
};

export function getGetVirtualPriceInstruction<
  TAccountPayer extends string,
  TAccountPool extends string,
  TAccountLpMint extends string,
  TAccountAVaultLpMint extends string,
  TAccountBVaultLpMint extends string,
  TAccountAVaultLp extends string,
  TAccountBVaultLp extends string,
  TAccountAVault extends string,
  TAccountBVault extends string,
  TProgramAddress extends Address = typeof METEORA_VP_PROGRAM_ADDRESS,
>(
  input: GetVirtualPriceInput<
    TAccountPayer,
    TAccountPool,
    TAccountLpMint,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault
  >,
  config?: { programAddress?: TProgramAddress }
): GetVirtualPriceInstruction<
  TProgramAddress,
  TAccountPayer,
  TAccountPool,
  TAccountLpMint,
  TAccountAVaultLpMint,
  TAccountBVaultLpMint,
  TAccountAVaultLp,
  TAccountBVaultLp,
  TAccountAVault,
  TAccountBVault
> {
  // Program address.
  const programAddress = config?.programAddress ?? METEORA_VP_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    payer: { value: input.payer ?? null, isWritable: true },
    pool: { value: input.pool ?? null, isWritable: false },
    lpMint: { value: input.lpMint ?? null, isWritable: false },
    aVaultLpMint: { value: input.aVaultLpMint ?? null, isWritable: false },
    bVaultLpMint: { value: input.bVaultLpMint ?? null, isWritable: false },
    aVaultLp: { value: input.aVaultLp ?? null, isWritable: false },
    bVaultLp: { value: input.bVaultLp ?? null, isWritable: false },
    aVault: { value: input.aVault ?? null, isWritable: false },
    bVault: { value: input.bVault ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lpMint),
      getAccountMeta(accounts.aVaultLpMint),
      getAccountMeta(accounts.bVaultLpMint),
      getAccountMeta(accounts.aVaultLp),
      getAccountMeta(accounts.bVaultLp),
      getAccountMeta(accounts.aVault),
      getAccountMeta(accounts.bVault),
    ],
    programAddress,
    data: getGetVirtualPriceInstructionDataEncoder().encode({}),
  } as GetVirtualPriceInstruction<
    TProgramAddress,
    TAccountPayer,
    TAccountPool,
    TAccountLpMint,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault
  >;

  return instruction;
}

export type ParsedGetVirtualPriceInstruction<
  TProgram extends string = typeof METEORA_VP_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    payer: TAccountMetas[0];
    /** Pool account (PDA) */
    pool: TAccountMetas[1];
    /** LP token mint of the pool */
    lpMint: TAccountMetas[2];
    /** LP token mint of vault A */
    aVaultLpMint: TAccountMetas[3];
    /** LP token mint of vault B */
    bVaultLpMint: TAccountMetas[4];
    /** LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    aVaultLp: TAccountMetas[5];
    /** LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    bVaultLp: TAccountMetas[6];
    /** Vault account for token a. token a of the pool will be deposit / withdraw from this vault account. */
    aVault: TAccountMetas[7];
    /** Vault account for token b. token b of the pool will be deposit / withdraw from this vault account. */
    bVault: TAccountMetas[8];
  };
  data: GetVirtualPriceInstructionData;
};

export function parseGetVirtualPriceInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedGetVirtualPriceInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 9) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      payer: getNextAccount(),
      pool: getNextAccount(),
      lpMint: getNextAccount(),
      aVaultLpMint: getNextAccount(),
      bVaultLpMint: getNextAccount(),
      aVaultLp: getNextAccount(),
      bVaultLp: getNextAccount(),
      aVault: getNextAccount(),
      bVault: getNextAccount(),
    },
    data: getGetVirtualPriceInstructionDataDecoder().decode(instruction.data),
  };
}
