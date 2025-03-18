# Meteora Dynamic Pools Virtual Price
This program calculates the virtual price of any given meteora dynamic pool:

- For volatile pools: the `d` variant, for volatile pools it's pretty straightforward calculated with `constant_product_compute_invariant()`

- For stable pools: the `d` variant is calculated via `fast_compute_stable_invariant()` after upscaling both tokens, and handling depeg.

## Structure
- `programs/`: Home to our anchor programs
  - `./programs/meteora-vp`
    - `curve.rs`: Some math functions ported from meteora (since they were private)
    - `errors.rs`: Our errors
    - `instructions/*`: Instructions of the program
    - `lib.rs`: Program entrypoint
- `tests/*`: Typescript tests and their utils, the main test is `./tests/meteora-vp.test.ts`
- `sdk/`: Codama web3.js v2 generated SDKs
- `idl/`: List of IDLs of our program + related meteora programs (vault & amm)
- `generator/`: Codama scripts

### Setup

1. Make sure you have `bun` installed, if not run this:

```bash
curl -fsSL https://bun.sh/install | bash
```

2. Add a `wallet.json` file in the root of the project, this will be the signer for test transactions.

3. (optional) Run the following command to generate the IDL:

```bash
bun generate:idl
```

4. (optional) Run the following command to generate SDK clients

```bash
bun generate:sdk
```

5. (optional) airdrop some tokens
```bash
solana airdrop 1 -u devnet -k wallet.json
```

6. Run the tests
```bash
bun test
```

### Improvement notes
* If this is meant to be used by other programs (via CPIs) we can optimize CUs greatly by using Pinocchio and skipping accounts constraints (since this doesn't really edit on any state).

* We can opt for our own curve library (to calculate `amount_by_share` etc..) by porting meteora code (which is itself ported from saber) so we can use a newer version of anchor, we are currently pinned to use 0.28.0 which doesn't have a lot of optimizations because of peer deps issues.

* We can write more tests for our own math impl functions (constant_product_compute_invariant, fast_compute_stable_invariant, stable_upscale_token_a, stable_upscale_token_b)


