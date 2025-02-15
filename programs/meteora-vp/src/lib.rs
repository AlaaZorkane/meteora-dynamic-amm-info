use anchor_lang::prelude::*;

pub mod constants;
pub mod curve;
pub mod errors;
pub mod instructions;

pub use constants::*;
pub use curve::*;
pub use errors::*;
pub use instructions::*;

declare_id!("expo9shvoWz6Bi96TsomKkWTAWYAm4ywuzP2u8EAXaV");

#[program]
pub mod meteora_vp {
    use super::*;

    pub fn get_virtual_price(ctx: Context<GetVirtualPriceAccounts>) -> Result<()> {
        _get_virtual_price(&ctx)
    }
}
