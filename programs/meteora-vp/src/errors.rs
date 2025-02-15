use anchor_lang::prelude::*;

#[error_code]
pub enum MeteoraVPErrors {
    #[msg("Calculation overflowed")]
    Overflow,
}
