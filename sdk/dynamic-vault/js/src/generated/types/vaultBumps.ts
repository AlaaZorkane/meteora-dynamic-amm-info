/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

/** Vault bumps struct */
export type VaultBumps = {
  /** vault_bump */
  vaultBump: number;
  /** token_vault_bump */
  tokenVaultBump: number;
};

export type VaultBumpsArgs = VaultBumps;

export function getVaultBumpsEncoder(): Encoder<VaultBumpsArgs> {
  return getStructEncoder([
    ['vaultBump', getU8Encoder()],
    ['tokenVaultBump', getU8Encoder()],
  ]);
}

export function getVaultBumpsDecoder(): Decoder<VaultBumps> {
  return getStructDecoder([
    ['vaultBump', getU8Decoder()],
    ['tokenVaultBump', getU8Decoder()],
  ]);
}

export function getVaultBumpsCodec(): Codec<VaultBumpsArgs, VaultBumps> {
  return combineCodec(getVaultBumpsEncoder(), getVaultBumpsDecoder());
}
