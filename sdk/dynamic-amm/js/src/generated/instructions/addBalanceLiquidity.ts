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
import { AMM_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const ADD_BALANCE_LIQUIDITY_DISCRIMINATOR = new Uint8Array([
  168, 227, 50, 62, 189, 171, 84, 176,
]);

export function getAddBalanceLiquidityDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    ADD_BALANCE_LIQUIDITY_DISCRIMINATOR
  );
}

export type AddBalanceLiquidityInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountPool extends string | IAccountMeta<string> = string,
  TAccountLpMint extends string | IAccountMeta<string> = string,
  TAccountUserPoolLp extends string | IAccountMeta<string> = string,
  TAccountAVaultLp extends string | IAccountMeta<string> = string,
  TAccountBVaultLp extends string | IAccountMeta<string> = string,
  TAccountAVault extends string | IAccountMeta<string> = string,
  TAccountBVault extends string | IAccountMeta<string> = string,
  TAccountAVaultLpMint extends string | IAccountMeta<string> = string,
  TAccountBVaultLpMint extends string | IAccountMeta<string> = string,
  TAccountATokenVault extends string | IAccountMeta<string> = string,
  TAccountBTokenVault extends string | IAccountMeta<string> = string,
  TAccountUserAToken extends string | IAccountMeta<string> = string,
  TAccountUserBToken extends string | IAccountMeta<string> = string,
  TAccountUser extends string | IAccountMeta<string> = string,
  TAccountVaultProgram extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountPool extends string
        ? WritableAccount<TAccountPool>
        : TAccountPool,
      TAccountLpMint extends string
        ? WritableAccount<TAccountLpMint>
        : TAccountLpMint,
      TAccountUserPoolLp extends string
        ? WritableAccount<TAccountUserPoolLp>
        : TAccountUserPoolLp,
      TAccountAVaultLp extends string
        ? WritableAccount<TAccountAVaultLp>
        : TAccountAVaultLp,
      TAccountBVaultLp extends string
        ? WritableAccount<TAccountBVaultLp>
        : TAccountBVaultLp,
      TAccountAVault extends string
        ? WritableAccount<TAccountAVault>
        : TAccountAVault,
      TAccountBVault extends string
        ? WritableAccount<TAccountBVault>
        : TAccountBVault,
      TAccountAVaultLpMint extends string
        ? WritableAccount<TAccountAVaultLpMint>
        : TAccountAVaultLpMint,
      TAccountBVaultLpMint extends string
        ? WritableAccount<TAccountBVaultLpMint>
        : TAccountBVaultLpMint,
      TAccountATokenVault extends string
        ? WritableAccount<TAccountATokenVault>
        : TAccountATokenVault,
      TAccountBTokenVault extends string
        ? WritableAccount<TAccountBTokenVault>
        : TAccountBTokenVault,
      TAccountUserAToken extends string
        ? WritableAccount<TAccountUserAToken>
        : TAccountUserAToken,
      TAccountUserBToken extends string
        ? WritableAccount<TAccountUserBToken>
        : TAccountUserBToken,
      TAccountUser extends string
        ? ReadonlySignerAccount<TAccountUser> & IAccountSignerMeta<TAccountUser>
        : TAccountUser,
      TAccountVaultProgram extends string
        ? ReadonlyAccount<TAccountVaultProgram>
        : TAccountVaultProgram,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      ...TRemainingAccounts,
    ]
  >;

export type AddBalanceLiquidityInstructionData = {
  discriminator: ReadonlyUint8Array;
  poolTokenAmount: bigint;
  maximumTokenAAmount: bigint;
  maximumTokenBAmount: bigint;
};

export type AddBalanceLiquidityInstructionDataArgs = {
  poolTokenAmount: number | bigint;
  maximumTokenAAmount: number | bigint;
  maximumTokenBAmount: number | bigint;
};

export function getAddBalanceLiquidityInstructionDataEncoder(): Encoder<AddBalanceLiquidityInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['poolTokenAmount', getU64Encoder()],
      ['maximumTokenAAmount', getU64Encoder()],
      ['maximumTokenBAmount', getU64Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: ADD_BALANCE_LIQUIDITY_DISCRIMINATOR,
    })
  );
}

export function getAddBalanceLiquidityInstructionDataDecoder(): Decoder<AddBalanceLiquidityInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['poolTokenAmount', getU64Decoder()],
    ['maximumTokenAAmount', getU64Decoder()],
    ['maximumTokenBAmount', getU64Decoder()],
  ]);
}

export function getAddBalanceLiquidityInstructionDataCodec(): Codec<
  AddBalanceLiquidityInstructionDataArgs,
  AddBalanceLiquidityInstructionData
> {
  return combineCodec(
    getAddBalanceLiquidityInstructionDataEncoder(),
    getAddBalanceLiquidityInstructionDataDecoder()
  );
}

export type AddBalanceLiquidityInput<
  TAccountPool extends string = string,
  TAccountLpMint extends string = string,
  TAccountUserPoolLp extends string = string,
  TAccountAVaultLp extends string = string,
  TAccountBVaultLp extends string = string,
  TAccountAVault extends string = string,
  TAccountBVault extends string = string,
  TAccountAVaultLpMint extends string = string,
  TAccountBVaultLpMint extends string = string,
  TAccountATokenVault extends string = string,
  TAccountBTokenVault extends string = string,
  TAccountUserAToken extends string = string,
  TAccountUserBToken extends string = string,
  TAccountUser extends string = string,
  TAccountVaultProgram extends string = string,
  TAccountTokenProgram extends string = string,
> = {
  /** Pool account (PDA) */
  pool: Address<TAccountPool>;
  /** LP token mint of the pool */
  lpMint: Address<TAccountLpMint>;
  /** user pool lp token account. lp will be burned from this account upon success liquidity removal. */
  userPoolLp: Address<TAccountUserPoolLp>;
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
  /** Token vault account of vault A */
  aTokenVault: Address<TAccountATokenVault>;
  /** Token vault account of vault B */
  bTokenVault: Address<TAccountBTokenVault>;
  /** User token A account. Token will be transfer from this account if it is add liquidity operation. Else, token will be transfer into this account. */
  userAToken: Address<TAccountUserAToken>;
  /** User token B account. Token will be transfer from this account if it is add liquidity operation. Else, token will be transfer into this account. */
  userBToken: Address<TAccountUserBToken>;
  /** User account. Must be owner of user_a_token, and user_b_token. */
  user: TransactionSigner<TAccountUser>;
  /** Vault program. the pool will deposit/withdraw liquidity from the vault. */
  vaultProgram: Address<TAccountVaultProgram>;
  /** Token program. */
  tokenProgram?: Address<TAccountTokenProgram>;
  poolTokenAmount: AddBalanceLiquidityInstructionDataArgs['poolTokenAmount'];
  maximumTokenAAmount: AddBalanceLiquidityInstructionDataArgs['maximumTokenAAmount'];
  maximumTokenBAmount: AddBalanceLiquidityInstructionDataArgs['maximumTokenBAmount'];
};

export function getAddBalanceLiquidityInstruction<
  TAccountPool extends string,
  TAccountLpMint extends string,
  TAccountUserPoolLp extends string,
  TAccountAVaultLp extends string,
  TAccountBVaultLp extends string,
  TAccountAVault extends string,
  TAccountBVault extends string,
  TAccountAVaultLpMint extends string,
  TAccountBVaultLpMint extends string,
  TAccountATokenVault extends string,
  TAccountBTokenVault extends string,
  TAccountUserAToken extends string,
  TAccountUserBToken extends string,
  TAccountUser extends string,
  TAccountVaultProgram extends string,
  TAccountTokenProgram extends string,
  TProgramAddress extends Address = typeof AMM_PROGRAM_ADDRESS,
>(
  input: AddBalanceLiquidityInput<
    TAccountPool,
    TAccountLpMint,
    TAccountUserPoolLp,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint,
    TAccountATokenVault,
    TAccountBTokenVault,
    TAccountUserAToken,
    TAccountUserBToken,
    TAccountUser,
    TAccountVaultProgram,
    TAccountTokenProgram
  >,
  config?: { programAddress?: TProgramAddress }
): AddBalanceLiquidityInstruction<
  TProgramAddress,
  TAccountPool,
  TAccountLpMint,
  TAccountUserPoolLp,
  TAccountAVaultLp,
  TAccountBVaultLp,
  TAccountAVault,
  TAccountBVault,
  TAccountAVaultLpMint,
  TAccountBVaultLpMint,
  TAccountATokenVault,
  TAccountBTokenVault,
  TAccountUserAToken,
  TAccountUserBToken,
  TAccountUser,
  TAccountVaultProgram,
  TAccountTokenProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? AMM_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    pool: { value: input.pool ?? null, isWritable: true },
    lpMint: { value: input.lpMint ?? null, isWritable: true },
    userPoolLp: { value: input.userPoolLp ?? null, isWritable: true },
    aVaultLp: { value: input.aVaultLp ?? null, isWritable: true },
    bVaultLp: { value: input.bVaultLp ?? null, isWritable: true },
    aVault: { value: input.aVault ?? null, isWritable: true },
    bVault: { value: input.bVault ?? null, isWritable: true },
    aVaultLpMint: { value: input.aVaultLpMint ?? null, isWritable: true },
    bVaultLpMint: { value: input.bVaultLpMint ?? null, isWritable: true },
    aTokenVault: { value: input.aTokenVault ?? null, isWritable: true },
    bTokenVault: { value: input.bTokenVault ?? null, isWritable: true },
    userAToken: { value: input.userAToken ?? null, isWritable: true },
    userBToken: { value: input.userBToken ?? null, isWritable: true },
    user: { value: input.user ?? null, isWritable: false },
    vaultProgram: { value: input.vaultProgram ?? null, isWritable: false },
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
      getAccountMeta(accounts.pool),
      getAccountMeta(accounts.lpMint),
      getAccountMeta(accounts.userPoolLp),
      getAccountMeta(accounts.aVaultLp),
      getAccountMeta(accounts.bVaultLp),
      getAccountMeta(accounts.aVault),
      getAccountMeta(accounts.bVault),
      getAccountMeta(accounts.aVaultLpMint),
      getAccountMeta(accounts.bVaultLpMint),
      getAccountMeta(accounts.aTokenVault),
      getAccountMeta(accounts.bTokenVault),
      getAccountMeta(accounts.userAToken),
      getAccountMeta(accounts.userBToken),
      getAccountMeta(accounts.user),
      getAccountMeta(accounts.vaultProgram),
      getAccountMeta(accounts.tokenProgram),
    ],
    programAddress,
    data: getAddBalanceLiquidityInstructionDataEncoder().encode(
      args as AddBalanceLiquidityInstructionDataArgs
    ),
  } as AddBalanceLiquidityInstruction<
    TProgramAddress,
    TAccountPool,
    TAccountLpMint,
    TAccountUserPoolLp,
    TAccountAVaultLp,
    TAccountBVaultLp,
    TAccountAVault,
    TAccountBVault,
    TAccountAVaultLpMint,
    TAccountBVaultLpMint,
    TAccountATokenVault,
    TAccountBTokenVault,
    TAccountUserAToken,
    TAccountUserBToken,
    TAccountUser,
    TAccountVaultProgram,
    TAccountTokenProgram
  >;

  return instruction;
}

export type ParsedAddBalanceLiquidityInstruction<
  TProgram extends string = typeof AMM_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Pool account (PDA) */
    pool: TAccountMetas[0];
    /** LP token mint of the pool */
    lpMint: TAccountMetas[1];
    /** user pool lp token account. lp will be burned from this account upon success liquidity removal. */
    userPoolLp: TAccountMetas[2];
    /** LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    aVaultLp: TAccountMetas[3];
    /** LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault. */
    bVaultLp: TAccountMetas[4];
    /** Vault account for token a. token a of the pool will be deposit / withdraw from this vault account. */
    aVault: TAccountMetas[5];
    /** Vault account for token b. token b of the pool will be deposit / withdraw from this vault account. */
    bVault: TAccountMetas[6];
    /** LP token mint of vault a */
    aVaultLpMint: TAccountMetas[7];
    /** LP token mint of vault b */
    bVaultLpMint: TAccountMetas[8];
    /** Token vault account of vault A */
    aTokenVault: TAccountMetas[9];
    /** Token vault account of vault B */
    bTokenVault: TAccountMetas[10];
    /** User token A account. Token will be transfer from this account if it is add liquidity operation. Else, token will be transfer into this account. */
    userAToken: TAccountMetas[11];
    /** User token B account. Token will be transfer from this account if it is add liquidity operation. Else, token will be transfer into this account. */
    userBToken: TAccountMetas[12];
    /** User account. Must be owner of user_a_token, and user_b_token. */
    user: TAccountMetas[13];
    /** Vault program. the pool will deposit/withdraw liquidity from the vault. */
    vaultProgram: TAccountMetas[14];
    /** Token program. */
    tokenProgram: TAccountMetas[15];
  };
  data: AddBalanceLiquidityInstructionData;
};

export function parseAddBalanceLiquidityInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedAddBalanceLiquidityInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 16) {
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
      userPoolLp: getNextAccount(),
      aVaultLp: getNextAccount(),
      bVaultLp: getNextAccount(),
      aVault: getNextAccount(),
      bVault: getNextAccount(),
      aVaultLpMint: getNextAccount(),
      bVaultLpMint: getNextAccount(),
      aTokenVault: getNextAccount(),
      bTokenVault: getNextAccount(),
      userAToken: getNextAccount(),
      userBToken: getNextAccount(),
      user: getNextAccount(),
      vaultProgram: getNextAccount(),
      tokenProgram: getNextAccount(),
    },
    data: getAddBalanceLiquidityInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
