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
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
} from '@solana/web3.js';
import { AMM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const GET_POOL_INFO_DISCRIMINATOR = new Uint8Array([
  9, 48, 220, 101, 22, 240, 78, 200,
]);

export function getGetPoolInfoDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    GET_POOL_INFO_DISCRIMINATOR
  );
}

export type GetPoolInfoInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLpMint extends string | IAccountMeta<string> = string,
  TAccountAVaultLp extends string | IAccountMeta<string> = string,
  TAccountBVaultLp extends string | IAccountMeta<string> = string,
  TAccountAVault extends string | IAccountMeta<string> = string,
  TAccountBVault extends string | IAccountMeta<string> = string,
  TAccountAVaultLpMint extends string | IAccountMeta<string> = string,
  TAccountBVaultLpMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPool extends string
        ? ReadonlyAccount<TAccountPool>
        : TAccountPool,
      TAccountLpMint extends string
        ? ReadonlyAccount<TAccountLpMint>
        : TAccountLpMint,
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
      TAccountAVaultLpMint extends string
        ? ReadonlyAccount<TAccountAVaultLpMint>
        : TAccountAVaultLpMint,
      TAccountBVaultLpMint extends string
        ? ReadonlyAccount<TAccountBVaultLpMint>
        : TAccountBVaultLpMint,
      ...TRemainingAccounts,
    ]
  >;

export type GetPoolInfoInstructionData = { discriminator: ReadonlyUint8Array };

export type GetPoolInfoInstructionDataArgs = {};

export function getGetPoolInfoInstructionDataEncoder(): Encoder<GetPoolInfoInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    (value) => ({ ...value, discriminator: GET_POOL_INFO_DISCRIMINATOR })
  );
}

export function getGetPoolInfoInstructionDataDecoder(): Decoder<GetPoolInfoInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getGetPoolInfoInstructionDataCodec(): Codec<
  GetPoolInfoInstructionDataArgs,
  GetPoolInfoInstructionData
> {
  return combineCodec(
    getGetPoolInfoInstructionDataEncoder(),
    getGetPoolInfoInstructionDataDecoder()
  );
}

export type GetPoolInfoInput<
  TAccountPool extends string = string,
  TAccountLpMint extends string = string,
  TAccountAVaultLp extends string = string,
  TAccountBVaultLp extends string = string,
  TAccountAVault extends string = string,
  TAccountBVault extends string = string,
  TAccountAVaultLpMint extends string = string,
  TAccountBVaultLpMint extends string = string,
> = {
  /** Pool account (PDA) */
  pool: Address<TAccountPool>;
  /** LP token mint of the pool */
  lpMint: Address<TAccountLpMint>;
  /** LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
  aVaultLp: Address<TAccountAVaultLp>;
  /** LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
  bVaultLp: Address<TAccountBVaultLp>;
  /** Vault account for token a. token a of the pool will be deposit / withdraw from this vault account. */
  aVault: Address<TAccountAVault>;
  /** Vault account for token b. token b of the pool will be deposit / withdraw from this vault account. */
  bVault: Address<TAccountBVault>;
  /** LP token mint of vault a */
  aVaultLpMint: Address<TAccountAVaultLpMint>;
  /** LP token mint of vault b */
  bVaultLpMint: Address<TAccountBVaultLpMint>;
};

export function getGetPoolInfoInstruction<
  TAccountPool extends string,
  TAccountLpMint extends string,
  TAccountAVaultLp extends string,
  TAccountBVaultLp extends string,
  TAccountAVault extends string,
  TAccountBVault extends string,
  TAccountAVaultLpMint extends string,
  TAccountBVaultLpMint extends string,
  TProgramAddress extends Address = typeof AMM_PROGRAM_ADDRESS,
>(
  input: GetPoolInfoInput<
    TAccountPool,
    TAccountLpMint,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint
  >,
  config?: { programAddress?: TProgramAddress }
): GetPoolInfoInstruction<
  TProgramAddress,
  TAccountPool,
  TAccountLpMint,
  TAccountAVaultLp,
  TAccountBVaultLp,
  TAccountAVault,
  TAccountBVault,
  TAccountAVaultLpMint,
  TAccountBVaultLpMint
> {
  // Program address.
  const programAddress = config?.programAddress ?? AMM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pool: { value: input.pool ?? null, isWritable: false },
    lpMint: { value: input.lpMint ?? null, isWritable: false },
    aVaultLp: { value: input.aVaultLp ?? null, isWritable: false },
    bVaultLp: { value: input.bVaultLp ?? null, isWritable: false },
    aVault: { value: input.aVault ?? null, isWritable: false },
    bVault: { value: input.bVault ?? null, isWritable: false },
    aVaultLpMint: { value: input.aVaultLpMint ?? null, isWritable: false },
    bVaultLpMint: { value: input.bVaultLpMint ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lpMint),
      getAccountMeta(accounts.aVaultLp),
      getAccountMeta(accounts.bVaultLp),
      getAccountMeta(accounts.aVault),
      getAccountMeta(accounts.bVault),
      getAccountMeta(accounts.aVaultLpMint),
      getAccountMeta(accounts.bVaultLpMint),
    ],
    programAddress,
    data: getGetPoolInfoInstructionDataEncoder().encode({}),
  } as GetPoolInfoInstruction<
    TProgramAddress,
    TAccountPool,
    TAccountLpMint,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint
  >;

  return instruction;
}

export type ParsedGetPoolInfoInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Pool account (PDA) */
    pool: TAccountMetas[0];
    /** LP token mint of the pool */
    lpMint: TAccountMetas[1];
    /** LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    aVaultLp: TAccountMetas[2];
    /** LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    bVaultLp: TAccountMetas[3];
    /** Vault account for token a. token a of the pool will be deposit / withdraw from this vault account. */
    aVault: TAccountMetas[4];
    /** Vault account for token b. token b of the pool will be deposit / withdraw from this vault account. */
    bVault: TAccountMetas[5];
    /** LP token mint of vault a */
    aVaultLpMint: TAccountMetas[6];
    /** LP token mint of vault b */
    bVaultLpMint: TAccountMetas[7];
  };
  data: GetPoolInfoInstructionData;
};

export function parseGetPoolInfoInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedGetPoolInfoInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
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
      pool: getNextAccount(),
      lpMint: getNextAccount(),
      aVaultLp: getNextAccount(),
      bVaultLp: getNextAccount(),
      aVault: getNextAccount(),
      bVault: getNextAccount(),
      aVaultLpMint: getNextAccount(),
      bVaultLpMint: getNextAccount(),
    },
    data: getGetPoolInfoInstructionDataDecoder().decode(instruction.data),
  };
}
