use num_integer::Roots;

use crate::{MAX_ITERS, N_COINS};

pub fn constant_product_compute_invariant(token_a_amount: u64, token_b_amount: u64) -> u128 {
    let token_a_amount = u128::from(token_a_amount);
    let token_b_amount = u128::from(token_b_amount);

    (token_a_amount * token_b_amount).sqrt()
}

/// Ported from https://github.com/MeteoraAg/dynamic-amm-sdk/blob/main/ts-client/src/amm/curve/stable-swap-math/calculator.ts#L24-L45
pub fn fast_compute_stable_invariant(
    amp_factor: u64,
    token_a_amount: u64,
    token_b_amount: u64,
) -> u128 {
    let amp_factor = u128::from(amp_factor);
    let bn_n_coins = u128::from(N_COINS);
    let token_a_amount = u128::from(token_a_amount);
    let token_b_amount = u128::from(token_b_amount);

    // A*n^n
    let ann = amp_factor * bn_n_coins;

    // sum(x_i), a.k.a S
    let s = token_a_amount + token_b_amount;

    if s == 0 {
        return 0;
    }

    let mut d_prev = 0;
    let mut d = s;

    for _ in 0..MAX_ITERS {
        if d.abs_diff(d_prev) <= 1 {
            break;
        }

        d_prev = d;
        let mut dp = d;

        // dp = (dp * d) / (amount_a * N_COINS)
        dp = (dp * d) / (token_a_amount * bn_n_coins);

        // dp = (dp * d) / (amount_b * N_COINS)
        dp = (dp * d) / (token_b_amount * bn_n_coins);

        // d = (d * (ann * s + dp * N_COINS)) / (d * (ann - 1) + dp * (N_COINS + 1))
        let d_numerator = d * (ann * s + dp * bn_n_coins);
        let d_denominator = d * (ann - 1) + dp * (bn_n_coins + 1);
        d = d_numerator / d_denominator;
    }

    d
}
