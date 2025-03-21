/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getEnumDecoder,
  getEnumEncoder,
  type Codec,
  type Decoder,
  type Encoder,
} from '@solana/web3.js';

/** Trade (swap) direction */
export enum TradeDirection {
  AtoB,
  BtoA,
}

export type TradeDirectionArgs = TradeDirection;

export function getTradeDirectionEncoder(): Encoder<TradeDirectionArgs> {
  return getEnumEncoder(TradeDirection);
}

export function getTradeDirectionDecoder(): Decoder<TradeDirection> {
  return getEnumDecoder(TradeDirection);
}

export function getTradeDirectionCodec(): Codec<
  TradeDirectionArgs,
  TradeDirection
> {
  return combineCodec(getTradeDirectionEncoder(), getTradeDirectionDecoder());
}
