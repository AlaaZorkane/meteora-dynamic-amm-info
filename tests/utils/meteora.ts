import type { IdlTypes } from "@coral-xyz/anchor";
import type { Amm as AmmIdl } from "@meteora-ag/dynamic-amm-sdk";
import type { VaultState } from "@mercurial-finance/vault-sdk";
import type { DepegType } from "@meteora-ag/dynamic-amm-sdk/dist/cjs/src/amm/types";
import {
  DepegType as GeneratedDepegType,
  type DepegArgs,
} from "../../sdk/dynamic-amm/js/src/generated";
import BN from "bn.js";
import type { Vault } from "../../sdk/dynamic-vault/js/src/generated";
import { PublicKey } from "@solana/web3.js-legacy";

export type CustomDepeg = Omit<IdlTypes<AmmIdl>["Depeg"], "depegType"> & {
  depegType: DepegType;
};

export const normalizeDepeg = (depeg: DepegArgs): CustomDepeg => {
  if (depeg.depegType === GeneratedDepegType.Lido) {
    return {
      baseCacheUpdated: new BN(depeg.baseCacheUpdated.toString()),
      baseVirtualPrice: new BN(depeg.baseVirtualPrice.toString()),
      depegType: {
        lido: {},
      },
    };
  }

  if (depeg.depegType === GeneratedDepegType.Marinade) {
    return {
      baseCacheUpdated: new BN(depeg.baseCacheUpdated.toString()),
      baseVirtualPrice: new BN(depeg.baseVirtualPrice.toString()),
      depegType: {
        marinade: {},
      },
    };
  }

  if (depeg.depegType === GeneratedDepegType.SplStake) {
    return {
      baseCacheUpdated: new BN(depeg.baseCacheUpdated.toString()),
      baseVirtualPrice: new BN(depeg.baseVirtualPrice.toString()),
      depegType: {
        splStake: {},
      },
    };
  }

  return {
    baseCacheUpdated: new BN(depeg.baseCacheUpdated.toString()),
    baseVirtualPrice: new BN(depeg.baseVirtualPrice.toString()),
    depegType: {
      none: {},
    },
  };
};

export const normalizeVaultState = (vault: Vault): VaultState => {
  return {
    admin: new PublicKey(vault.admin),
    base: new PublicKey(vault.base),
    enabled: vault.enabled,
    bumps: vault.bumps,
    totalAmount: new BN(vault.totalAmount.toString()),
    tokenVault: new PublicKey(vault.tokenVault),
    feeVault: new PublicKey(vault.feeVault),
    tokenMint: new PublicKey(vault.tokenMint),
    lpMint: new PublicKey(vault.lpMint),
    strategies: vault.strategies.map((strategy) => new PublicKey(strategy)),
    lockedProfitTracker: {
      lastUpdatedLockedProfit: new BN(
        vault.lockedProfitTracker.lastUpdatedLockedProfit.toString(),
      ),
      lastReport: new BN(vault.lockedProfitTracker.lastReport.toString()),
      lockedProfitDegradation: new BN(
        vault.lockedProfitTracker.lockedProfitDegradation.toString(),
      ),
    },
    operator: new PublicKey(vault.operator),
  };
};
