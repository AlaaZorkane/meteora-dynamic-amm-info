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
  getAddressDecoder,
  getAddressEncoder,
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
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { AMM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_WHITELISTED_VAULT_DISCRIMINATOR = new Uint8Array([
  12, 148, 94, 42, 55, 57, 83, 247,
]);

export function getSetWhitelistedVaultDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    SET_WHITELISTED_VAULT_DISCRIMINATOR
  );
}

export type SetWhitelistedVaultInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      ...TRemainingAccounts,
    ]
  >;

export type SetWhitelistedVaultInstructionData = {
  discriminator: ReadonlyUint8Array;
  whitelistedVault: Address;
};

export type SetWhitelistedVaultInstructionDataArgs = {
  whitelistedVault: Address;
};

export function getSetWhitelistedVaultInstructionDataEncoder(): Encoder<SetWhitelistedVaultInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['whitelistedVault', getAddressEncoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: SET_WHITELISTED_VAULT_DISCRIMINATOR,
    })
  );
}

export function getSetWhitelistedVaultInstructionDataDecoder(): Decoder<SetWhitelistedVaultInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['whitelistedVault', getAddressDecoder()],
  ]);
}

export function getSetWhitelistedVaultInstructionDataCodec(): Codec<
  SetWhitelistedVaultInstructionDataArgs,
  SetWhitelistedVaultInstructionData
> {
  return combineCodec(
    getSetWhitelistedVaultInstructionDataEncoder(),
    getSetWhitelistedVaultInstructionDataDecoder()
  );
}

export type SetWhitelistedVaultInput<
  TAccountPool extends string = string,
  TAccountAdmin extends string = string,
> = {
  pool: Address<TAccountPool>;
  admin: TransactionSigner<TAccountAdmin>;
  whitelistedVault: SetWhitelistedVaultInstructionDataArgs['whitelistedVault'];
};

export function getSetWhitelistedVaultInstruction<
  TAccountPool extends string,
  TAccountAdmin extends string,
  TProgramAddress extends Address = typeof AMM_PROGRAM_ADDRESS,
>(
  input: SetWhitelistedVaultInput<TAccountPool, TAccountAdmin>,
  config?: { programAddress?: TProgramAddress }
): SetWhitelistedVaultInstruction<
  TProgramAddress,
  TAccountPool,
  TAccountAdmin
> {
  // Program address.
  const programAddress = config?.programAddress ?? AMM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pool: { value: input.pool ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.pool), getAccountMeta(accounts.admin)],
    programAddress,
    data: getSetWhitelistedVaultInstructionDataEncoder().encode(
      args as SetWhitelistedVaultInstructionDataArgs
    ),
  } as SetWhitelistedVaultInstruction<
    TProgramAddress,
    TAccountPool,
    TAccountAdmin
  >;

  return instruction;
}

export type ParsedSetWhitelistedVaultInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    pool: TAccountMetas[0];
    admin: TAccountMetas[1];
  };
  data: SetWhitelistedVaultInstructionData;
};

export function parseSetWhitelistedVaultInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetWhitelistedVaultInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
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
      admin: getNextAccount(),
    },
    data: getSetWhitelistedVaultInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
