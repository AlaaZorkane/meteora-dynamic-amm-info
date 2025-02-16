use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};
use dynamic_amm::state::{CurveType, Pool};
use dynamic_vault::state::Vault;

use crate::{
    constant_product_compute_invariant, fast_compute_stable_invariant, VIRTUAL_PRICE_PRECISION,
};

pub fn _get_virtual_price(ctx: &Context<GetVirtualPriceAccounts>) -> Result<()> {
    let pool_lp_supply = ctx.accounts.lp_mint.supply;

    let on_chain_time = Clock::get()?.unix_timestamp as u64;
    let a_vault = &ctx.accounts.a_vault;
    let b_vault = &ctx.accounts.b_vault;
    let a_vault_lp = &ctx.accounts.a_vault_lp;
    let b_vault_lp = &ctx.accounts.b_vault_lp;
    let a_vault_lp_mint = &ctx.accounts.a_vault_lp_mint;
    let b_vault_lp_mint = &ctx.accounts.b_vault_lp_mint;

    let token_a_amount = a_vault
        .get_amount_by_share(on_chain_time, a_vault_lp.amount, a_vault_lp_mint.supply)
        .unwrap();
    let token_b_amount = b_vault
        .get_amount_by_share(on_chain_time, b_vault_lp.amount, b_vault_lp_mint.supply)
        .unwrap();

    msg!("token_a_amount: {}", token_a_amount);
    msg!("token_b_amount: {}", token_b_amount);

    let invariant = match ctx.accounts.pool.curve_type {
        CurveType::ConstantProduct => {
            constant_product_compute_invariant(token_a_amount, token_b_amount)
        }
        CurveType::Stable { amp, .. } => {
            msg!("amp: {}", amp);
            fast_compute_stable_invariant(amp, token_a_amount, token_b_amount)
        }
    };

    msg!("invariant: {}", invariant);

    let virtual_price = if pool_lp_supply == 0 {
        VIRTUAL_PRICE_PRECISION
    } else {
        invariant
            .checked_mul(VIRTUAL_PRICE_PRECISION)
            .unwrap()
            .checked_div(pool_lp_supply as u128)
            .unwrap()
    };

    let virtual_price_display = virtual_price as f64 / VIRTUAL_PRICE_PRECISION as f64;

    msg!("virtual_price: {}", virtual_price);
    msg!("virtual_price (display): {}", virtual_price_display);

    Ok(())
}

/// TODO: add constraints for the accounts based on pool data
#[derive(Accounts)]
pub struct GetVirtualPriceAccounts<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    /// Pool account (PDA)
    pub pool: Box<Account<'info, Pool>>,
    /// LP token mint of the pool
    pub lp_mint: Box<Account<'info, Mint>>,
    /// LP token mint of vault A
    pub a_vault_lp_mint: Box<Account<'info, Mint>>,
    /// LP token mint of vault B
    pub b_vault_lp_mint: Box<Account<'info, Mint>>,
    /// LP token account of vault A. Used to receive/burn the vault LP upon deposit/withdraw from the vault.
    pub a_vault_lp: Box<Account<'info, TokenAccount>>,
    /// LP token account of vault B. Used to receive/burn the vault LP upon deposit/withdraw from the vault.
    pub b_vault_lp: Box<Account<'info, TokenAccount>>,
    /// Vault account for token a. token a of the pool will be deposit / withdraw from this vault account.
    pub a_vault: Box<Account<'info, Vault>>,
    /// Vault account for token b. token b of the pool will be deposit / withdraw from this vault account.
    pub b_vault: Box<Account<'info, Vault>>,
}
