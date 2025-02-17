use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};
use dynamic_amm::{
    constants::depeg::PRECISION,
    state::{CurveType, DepegType, Pool},
};
use dynamic_vault::state::Vault;

use crate::{
    constant_product_compute_invariant, fast_compute_stable_invariant, stable_upscale_token_a,
    stable_upscale_token_b, MeteoraVPErrors, VIRTUAL_PRICE_PRECISION,
};

pub fn _get_virtual_price(ctx: &Context<GetVirtualPriceAccounts>) -> Result<()> {
    let pool_lp_supply = u128::from(ctx.accounts.lp_mint.supply);

    let on_chain_time: u64 = Clock::get()?
        .unix_timestamp
        .try_into()
        .map_err(|_| MeteoraVPErrors::TypeConversionFailed)?;
    let a_vault = &ctx.accounts.a_vault;
    let b_vault = &ctx.accounts.b_vault;
    let a_vault_lp = &ctx.accounts.a_vault_lp;
    let b_vault_lp = &ctx.accounts.b_vault_lp;
    let a_vault_lp_mint = &ctx.accounts.a_vault_lp_mint;
    let b_vault_lp_mint = &ctx.accounts.b_vault_lp_mint;

    let token_a_amount = a_vault
        .get_amount_by_share(on_chain_time, a_vault_lp.amount, a_vault_lp_mint.supply)
        .ok_or(MeteoraVPErrors::InvalidAmountByShare)?;
    let token_b_amount = b_vault
        .get_amount_by_share(on_chain_time, b_vault_lp.amount, b_vault_lp_mint.supply)
        .ok_or(MeteoraVPErrors::InvalidAmountByShare)?;

    let invariant = match ctx.accounts.pool.curve_type {
        CurveType::ConstantProduct => {
            constant_product_compute_invariant(token_a_amount as u128, token_b_amount as u128)
        }
        CurveType::Stable {
            amp,
            depeg,
            token_multiplier,
            ..
        } => {
            let upscaled_token_a_amount =
                stable_upscale_token_a(&token_multiplier, &depeg, token_a_amount as u128)
                    .ok_or(MeteoraVPErrors::InvalidUpscaledTokenAmount)?;
            let upscaled_token_b_amount =
                stable_upscale_token_b(&token_multiplier, &depeg, token_b_amount as u128)
                    .ok_or(MeteoraVPErrors::InvalidUpscaledTokenAmount)?;

            let mut d = fast_compute_stable_invariant(
                amp,
                upscaled_token_a_amount,
                upscaled_token_b_amount,
            );

            if depeg.depeg_type != DepegType::None {
                d = d
                    .checked_div(PRECISION as u128)
                    .ok_or(MeteoraVPErrors::CheckedCalculationOverflow)?
            }

            d
        }
    };

    let virtual_price = if pool_lp_supply == 0 {
        VIRTUAL_PRICE_PRECISION
    } else {
        invariant
            .checked_mul(VIRTUAL_PRICE_PRECISION)
            .ok_or(MeteoraVPErrors::CheckedCalculationOverflow)?
            .checked_div(pool_lp_supply)
            .ok_or(MeteoraVPErrors::CheckedCalculationOverflow)?
    };

    let virtual_price_display = virtual_price as f64 / VIRTUAL_PRICE_PRECISION as f64;
    msg!("virtual_price: {}", virtual_price);
    msg!("virtual_price (display): {}", virtual_price_display);

    Ok(())
}

#[derive(Accounts)]
pub struct GetVirtualPriceAccounts<'info> {
    #[account(
        has_one = lp_mint,
        has_one = a_vault_lp,
        has_one = b_vault_lp,
        has_one = a_vault,
        has_one = b_vault,
    )]
    pub pool: Box<Account<'info, Pool>>,

    /// LP token mint of the pool
    pub lp_mint: Account<'info, Mint>,

    /// LP token mint of vault A
    pub a_vault_lp_mint: Account<'info, Mint>,

    /// LP token mint of vault B
    pub b_vault_lp_mint: Account<'info, Mint>,

    /// LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault.
    pub a_vault_lp: Account<'info, TokenAccount>,

    /// LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault.
    pub b_vault_lp: Account<'info, TokenAccount>,

    /// Vault account for token a. token a of the pool will be deposit / withdraw from this vault account.
    #[account(
        constraint = a_vault.lp_mint == a_vault_lp_mint.key(),
    )]
    pub a_vault: Box<Account<'info, Vault>>,

    /// Vault account for token b. token b of the pool will be deposit / withdraw from this vault account.
    #[account(
        constraint = b_vault.lp_mint == b_vault_lp_mint.key(),
    )]
    pub b_vault: Box<Account<'info, Vault>>,
}
