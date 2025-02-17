use anchor_lang::prelude::*;

#[error_code]
pub enum MeteoraVPErrors {
    #[msg("Type conversion failed")]
    TypeConversionFailed,
    #[msg("Checked Calculation overflowed")]
    CheckedCalculationOverflow,
    #[msg("Invalid amount by share")]
    InvalidAmountByShare,
    #[msg("Invalid upscaled token amount")]
    InvalidUpscaledTokenAmount,
}
