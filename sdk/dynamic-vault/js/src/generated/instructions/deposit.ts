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
  getU64Decoder,
  getU64Encoder,
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
  type ReadonlySignerAccount,
  type ReadonlyUint8Array,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const DEPOSIT_DISCRIMINATOR = new Uint8Array([
  242, 35, 198, 137, 82, 225, 242, 182,
]);

export function getDepositDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(DEPOSIT_DISCRIMINATOR);
}

export type DepositInstruction<
  TProgram extends string = typeof VAULT_PROGRAM_ADDRESS,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountTokenVault extends string | IAccountMeta<string> = string,
  TAccountLpMint extends string | IAccountMeta<string> = string,
  TAccountUserToken extends string | IAccountMeta<string> = string,
  TAccountUserLp extends string | IAccountMeta<string> = string,
  TAccountUser extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountVault extends string
        ? WritableAccount<TAccountVault>
        : TAccountVault,
      TAccountTokenVault extends string
        ? WritableAccount<TAccountTokenVault>
        : TAccountTokenVault,
      TAccountLpMint extends string
        ? WritableAccount<TAccountLpMint>
        : TAccountLpMint,
      TAccountUserToken extends string
        ? WritableAccount<TAccountUserToken>
        : TAccountUserToken,
      TAccountUserLp extends string
        ? WritableAccount<TAccountUserLp>
        : TAccountUserLp,
      TAccountUser extends string
        ? ReadonlySignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser>
        : TAccountUser,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type DepositInstructionData = {
  discriminator: ReadonlyUint8Array;
  tokenAmount: bigint;
  minimumLpTokenAmount: bigint;
};

export type DepositInstructionDataArgs = {
  tokenAmount: number | bigint;
  minimumLpTokenAmount: number | bigint;
};

export function getDepositInstructionDataEncoder(): Encoder<DepositInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['tokenAmount', getU64Encoder()],
      ['minimumLpTokenAmount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: DEPOSIT_DISCRIMINATOR })
  );
}

export function getDepositInstructionDataDecoder(): Decoder<DepositInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['tokenAmount', getU64Decoder()],
    ['minimumLpTokenAmount', getU64Decoder()],
  ]);
}

export function getDepositInstructionDataCodec(): Codec<
  DepositInstructionDataArgs,
  DepositInstructionData
> {
  return combineCodec(
    getDepositInstructionDataEncoder(),
    getDepositInstructionDataDecoder()
  );
}

export type DepositInput<
  TAccountVault extends string = string,
  TAccountTokenVault extends string = string,
  TAccountLpMint extends string = string,
  TAccountUserToken extends string = string,
  TAccountUserLp extends string = string,
  TAccountUser extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** vault */
  vault: Address<TAccountVault>;
  /** token_vault */
  tokenVault: Address<TAccountTokenVault>;
  /** lp_mint */
  lpMint: Address<TAccountLpMint>;
  /** user_token */
  userToken: Address<TAccountUserToken>;
  /** user_lp */
  userLp: Address<TAccountUserLp>;
  /** user */
  user: TransactionSigner<TAccountUser>;
  /** token_program */
  tokenProgram?: Address<TAccountTokenProgram>;
  tokenAmount: DepositInstructionDataArgs['tokenAmount'];
  minimumLpTokenAmount: DepositInstructionDataArgs['minimumLpTokenAmount'];
};

export function getDepositInstruction<
  TAccountVault extends string,
  TAccountTokenVault extends string,
  TAccountLpMint extends string,
  TAccountUserToken extends string,
  TAccountUserLp extends string,
  TAccountUser extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof VAULT_PROGRAM_ADDRESS,
>(
  input: DepositInput<
    TAccountVault,
    TAccountTokenVault,
    TAccountLpMint,
    TAccountUserToken,
    TAccountUserLp,
    TAccountUser,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): DepositInstruction<
  TProgramAddress,
  TAccountVault,
  TAccountTokenVault,
  TAccountLpMint,
  TAccountUserToken,
  TAccountUserLp,
  TAccountUser,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    vault: { value: input.vault ?? null, isWritable: true },
    tokenVault: { value: input.tokenVault ?? null, isWritable: true },
    lpMint: { value: input.lpMint ?? null, isWritable: true },
    userToken: { value: input.userToken ?? null, isWritable: true },
    userLp: { value: input.userLp ?? null, isWritable: true },
    user: { value: input.user ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.tokenVault),
      getAccountMeta(accounts.lpMint),
      getAccountMeta(accounts.userToken),
      getAccountMeta(accounts.userLp),
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getDepositInstructionDataEncoder().encode(
      args as DepositInstructionDataArgs
    ),
  } as DepositInstruction<
    TProgramAddress,
    TAccountVault,
    TAccountTokenVault,
    TAccountLpMint,
    TAccountUserToken,
    TAccountUserLp,
    TAccountUser,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedDepositInstruction<
  TProgram extends string = typeof VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** vault */
    vault: TAccountMetas[0];
    /** token_vault */
    tokenVault: TAccountMetas[1];
    /** lp_mint */
    lpMint: TAccountMetas[2];
    /** user_token */
    userToken: TAccountMetas[3];
    /** user_lp */
    userLp: TAccountMetas[4];
    /** user */
    user: TAccountMetas[5];
    /** token_program */
    tokenProgram: TAccountMetas[6];
  };
  data: DepositInstructionData;
};

export function parseDepositInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedDepositInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
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
      vault: getNextAccount(),
      tokenVault: getNextAccount(),
      lpMint: getNextAccount(),
      userToken: getNextAccount(),
      userLp: getNextAccount(),
      user: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getDepositInstructionDataDecoder().decode(instruction.data),
  };
}
