/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getDiscriminatedUnionDecoder,
  getDiscriminatedUnionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getUnitDecoder,
  getUnitEncoder,
  type Codec,
  type Decoder,
  type Encoder,
  type GetDiscriminatedUnionVariant,
  type GetDiscriminatedUnionVariantContent,
} from '@solana/web3.js';
import {
  getDepegDecoder,
  getDepegEncoder,
  getTokenMultiplierDecoder,
  getTokenMultiplierEncoder,
  type Depeg,
  type DepegArgs,
  type TokenMultiplier,
  type TokenMultiplierArgs,
} from '.';

/** Type of the swap curve */
export type CurveType =
  | { __kind: 'ConstantProduct' }
  | {
      __kind: 'Stable';
      /** Amplification coefficient */
      amp: bigint;
      /** Multiplier for the pool token. Used to normalized token with different decimal into the same precision. */
      tokenMultiplier: TokenMultiplier;
      /** Depeg pool information. Contains functions to allow token amount to be repeg using stake / interest bearing token virtual price */
      depeg: Depeg;
      /** The last amp updated timestamp. Used to prevent update_curve_info called infinitely many times within a short period */
      lastAmpUpdatedTimestamp: bigint;
    };

export type CurveTypeArgs =
  | { __kind: 'ConstantProduct' }
  | {
      __kind: 'Stable';
      /** Amplification coefficient */
      amp: number | bigint;
      /** Multiplier for the pool token. Used to normalized token with different decimal into the same precision. */
      tokenMultiplier: TokenMultiplierArgs;
      /** Depeg pool information. Contains functions to allow token amount to be repeg using stake / interest bearing token virtual price */
      depeg: DepegArgs;
      /** The last amp updated timestamp. Used to prevent update_curve_info called infinitely many times within a short period */
      lastAmpUpdatedTimestamp: number | bigint;
    };

export function getCurveTypeEncoder(): Encoder<CurveTypeArgs> {
  return getDiscriminatedUnionEncoder([
    ['ConstantProduct', getUnitEncoder()],
    [
      'Stable',
      getStructEncoder([
        ['amp', getU64Encoder()],
        ['tokenMultiplier', getTokenMultiplierEncoder()],
        ['depeg', getDepegEncoder()],
        ['lastAmpUpdatedTimestamp', getU64Encoder()],
      ]),
    ],
  ]);
}

export function getCurveTypeDecoder(): Decoder<CurveType> {
  return getDiscriminatedUnionDecoder([
    ['ConstantProduct', getUnitDecoder()],
    [
      'Stable',
      getStructDecoder([
        ['amp', getU64Decoder()],
        ['tokenMultiplier', getTokenMultiplierDecoder()],
        ['depeg', getDepegDecoder()],
        ['lastAmpUpdatedTimestamp', getU64Decoder()],
      ]),
    ],
  ]);
}

export function getCurveTypeCodec(): Codec<CurveTypeArgs, CurveType> {
  return combineCodec(getCurveTypeEncoder(), getCurveTypeDecoder());
}

// Data Enum Helpers.
export function curveType(
  kind: 'ConstantProduct'
): GetDiscriminatedUnionVariant<CurveTypeArgs, '__kind', 'ConstantProduct'>;
export function curveType(
  kind: 'Stable',
  data: GetDiscriminatedUnionVariantContent<CurveTypeArgs, '__kind', 'Stable'>
): GetDiscriminatedUnionVariant<CurveTypeArgs, '__kind', 'Stable'>;
export function curveType<K extends CurveTypeArgs['__kind'], Data>(
  kind: K,
  data?: Data
) {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}

export function isCurveType<K extends CurveType['__kind']>(
  kind: K,
  value: CurveType
): value is CurveType & { __kind: K } {
  return value.__kind === kind;
}
