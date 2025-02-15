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

export const WITHDRAW_STRATEGY_DISCRIMINATOR = new Uint8Array([
  31, 45, 162, 5, 193, 217, 134, 188,
]);

export function getWithdrawStrategyDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    WITHDRAW_STRATEGY_DISCRIMINATOR
  );
}

export type WithdrawStrategyInstruction<
  TProgram extends string = typeof VAULT_PROGRAM_ADDRESS,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountStrategy extends string | IAccountMeta<string> = string,
  TAccountTokenVault extends string | IAccountMeta<string> = string,
  TAccountFeeVault extends string | IAccountMeta<string> = string,
  TAccountLpMint extends string | IAccountMeta<string> = string,
  TAccountStrategyProgram extends string | IAccountMeta<string> = string,
  TAccountCollateralVault extends string | IAccountMeta<string> = string,
  TAccountReserve extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountOperator extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountVault extends string
        ? WritableAccount<TAccountVault>
        : TAccountVault,
      TAccountStrategy extends string
        ? WritableAccount<TAccountStrategy>
        : TAccountStrategy,
      TAccountTokenVault extends string
        ? WritableAccount<TAccountTokenVault>
        : TAccountTokenVault,
      TAccountFeeVault extends string
        ? WritableAccount<TAccountFeeVault>
        : TAccountFeeVault,
      TAccountLpMint extends string
        ? WritableAccount<TAccountLpMint>
        : TAccountLpMint,
      TAccountStrategyProgram extends string
        ? ReadonlyAccount<TAccountStrategyProgram>
        : TAccountStrategyProgram,
      TAccountCollateralVault extends string
        ? WritableAccount<TAccountCollateralVault>
        : TAccountCollateralVault,
      TAccountReserve extends string
        ? WritableAccount<TAccountReserve>
        : TAccountReserve,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountOperator extends string
        ? ReadonlySignerAccount<TAccountOperator> &
            IAccountSignerMeta<TAccountOperator>
        : TAccountOperator,
      ...TRemainingAccounts,
    ]
  >;

export type WithdrawStrategyInstructionData = {
  discriminator: ReadonlyUint8Array;
  amount: bigint;
};

export type WithdrawStrategyInstructionDataArgs = { amount: number | bigint };

export function getWithdrawStrategyInstructionDataEncoder(): Encoder<WithdrawStrategyInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: WITHDRAW_STRATEGY_DISCRIMINATOR })
  );
}

export function getWithdrawStrategyInstructionDataDecoder(): Decoder<WithdrawStrategyInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['amount', getU64Decoder()],
  ]);
}

export function getWithdrawStrategyInstructionDataCodec(): Codec<
  WithdrawStrategyInstructionDataArgs,
  WithdrawStrategyInstructionData
> {
  return combineCodec(
    getWithdrawStrategyInstructionDataEncoder(),
    getWithdrawStrategyInstructionDataDecoder()
  );
}

export type WithdrawStrategyInput<
  TAccountVault extends string = string,
  TAccountStrategy extends string = string,
  TAccountTokenVault extends string = string,
  TAccountFeeVault extends string = string,
  TAccountLpMint extends string = string,
  TAccountStrategyProgram extends string = string,
  TAccountCollateralVault extends string = string,
  TAccountReserve extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountOperator extends string = string,
> = {
  /** vault */
  vault: Address<TAccountVault>;
  /** strategy */
  strategy: Address<TAccountStrategy>;
  /** token_vault */
  tokenVault: Address<TAccountTokenVault>;
  /** fee_vault */
  feeVault: Address<TAccountFeeVault>;
  /** lp_mint */
  lpMint: Address<TAccountLpMint>;
  strategyProgram: Address<TAccountStrategyProgram>;
  /** collateral_vault */
  collateralVault: Address<TAccountCollateralVault>;
  reserve: Address<TAccountReserve>;
  /** token_program */
  tokenProgram?: Address<TAccountTokenProgram>;
  /** operator */
  operator: TransactionSigner<TAccountOperator>;
  amount: WithdrawStrategyInstructionDataArgs['amount'];
};

export function getWithdrawStrategyInstruction<
  TAccountVault extends string,
  TAccountStrategy extends string,
  TAccountTokenVault extends string,
  TAccountFeeVault extends string,
  TAccountLpMint extends string,
  TAccountStrategyProgram extends string,
  TAccountCollateralVault extends string,
  TAccountReserve extends string,
  TAccountTokenProgram extends string,
  TAccountOperator extends string,
  TProgramAddress extends Address = typeof VAULT_PROGRAM_ADDRESS,
>(
  input: WithdrawStrategyInput<
    TAccountVault,
    TAccountStrategy,
    TAccountTokenVault,
    TAccountFeeVault,
    TAccountLpMint,
    TAccountStrategyProgram,
    TAccountCollateralVault,
    TAccountReserve,
    TAccountTokenProgram,
    TAccountOperator
  >,
  config?: { programAddress?: TProgramAddress }
): WithdrawStrategyInstruction<
  TProgramAddress,
  TAccountVault,
  TAccountStrategy,
  TAccountTokenVault,
  TAccountFeeVault,
  TAccountLpMint,
  TAccountStrategyProgram,
  TAccountCollateralVault,
  TAccountReserve,
  TAccountTokenProgram,
  TAccountOperator
> {
  // Program address.
  const programAddress = config?.programAddress ?? VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    vault: { value: input.vault ?? null, isWritable: true },
    strategy: { value: input.strategy ?? null, isWritable: true },
    tokenVault: { value: input.tokenVault ?? null, isWritable: true },
    feeVault: { value: input.feeVault ?? null, isWritable: true },
    lpMint: { value: input.lpMint ?? null, isWritable: true },
    strategyProgram: {
      value: input.strategyProgram ?? null,
      isWritable: false,
    },
    collateralVault: { value: input.collateralVault ?? null, isWritable: true },
    reserve: { value: input.reserve ?? null, isWritable: true },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    operator: { value: input.operator ?? null, isWritable: false },
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
      getAccountMeta(accounts.strategy),
      getAccountMeta(accounts.tokenVault),
      getAccountMeta(accounts.feeVault),
      getAccountMeta(accounts.lpMint),
      getAccountMeta(accounts.strategyProgram),
      getAccountMeta(accounts.collateralVault),
      getAccountMeta(accounts.reserve),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.operator),
    ],
    programAddress,
    data: getWithdrawStrategyInstructionDataEncoder().encode(
      args as WithdrawStrategyInstructionDataArgs
    ),
  } as WithdrawStrategyInstruction<
    TProgramAddress,
    TAccountVault,
    TAccountStrategy,
    TAccountTokenVault,
    TAccountFeeVault,
    TAccountLpMint,
    TAccountStrategyProgram,
    TAccountCollateralVault,
    TAccountReserve,
    TAccountTokenProgram,
    TAccountOperator
  >;

  return instruction;
}

export type ParsedWithdrawStrategyInstruction<
  TProgram extends string = typeof VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** vault */
    vault: TAccountMetas[0];
    /** strategy */
    strategy: TAccountMetas[1];
    /** token_vault */
    tokenVault: TAccountMetas[2];
    /** fee_vault */
    feeVault: TAccountMetas[3];
    /** lp_mint */
    lpMint: TAccountMetas[4];
    strategyProgram: TAccountMetas[5];
    /** collateral_vault */
    collateralVault: TAccountMetas[6];
    reserve: TAccountMetas[7];
    /** token_program */
    tokenProgram: TAccountMetas[8];
    /** operator */
    operator: TAccountMetas[9];
  };
  data: WithdrawStrategyInstructionData;
};

export function parseWithdrawStrategyInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedWithdrawStrategyInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 10) {
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
      strategy: getNextAccount(),
      tokenVault: getNextAccount(),
      feeVault: getNextAccount(),
      lpMint: getNextAccount(),
      strategyProgram: getNextAccount(),
      collateralVault: getNextAccount(),
      reserve: getNextAccount(),
      tokenProgram: getNextAccount(),
      operator: getNextAccount(),
    },
    data: getWithdrawStrategyInstructionDataDecoder().decode(instruction.data),
  };
}
