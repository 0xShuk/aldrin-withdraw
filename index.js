import {AUTHORIZED_POOLS, TokenSwap, PoolClient, TokenClient, DTwapClient} from "@aldrin_exchange/sdk";
import {Keypair, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import {Wallet} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import base58 from "bs58";
import { BN } from "bn.js";
import * as token from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(
    Uint8Array.from(base58.decode("pvt_key_here"))
);

const wallet = new Wallet(keypair);
const connection = new Connection("rpc_here");

(async() => {
    // const tokenSwap = await TokenSwap.initialize(connection, wallet);
    const pool = new PoolClient(connection);
    const tokenClient = new TokenClient(connection);

    const poolMint = new PublicKey("2m9ZT6smigrmNKxSRe7to6HnYGMYTztsDiuoJM4k336j");

    const maxQuote = new BN(500_000);
    const usdc = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    const stSol = new PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj");
    const aldrin = new PublicKey("2m9ZT6smigrmNKxSRe7to6HnYGMYTztsDiuoJM4k336j");

    const userBaseTokenAccount = anchor.utils.token.associatedAddress({mint: stSol, owner: keypair.publicKey});
    const userQuoteTokenAccount = anchor.utils.token.associatedAddress({mint: usdc, owner: keypair.publicKey});

    const userPoolTokenAccount = anchor.utils.token.associatedAddress({mint: aldrin, owner: keypair.publicKey});

    const baseTokenVault = new PublicKey("CEKPRyrkVsBvSZB6yG7snybYA86HUMxYhA2SAhnMPYZJ");
    const quoteTokenVault = new PublicKey("CouyQhExzB5x7UpL5bGCPGTfcbHmx4TfqMBSdcLseacb");

    const baseVaultAccount = await tokenClient.getTokenAccount(baseTokenVault);
    const quoteVaultAccount = await tokenClient.getTokenAccount(quoteTokenVault);

    const price = quoteVaultAccount.amount.mul(new BN(1_000_000)).div(baseVaultAccount.amount)

    const pools = await pool.getV2Pools();
    const poolAccount = pools.find((p) => p.poolMint.equals(poolMint))

    const balance = await token.getAccount(connection, userPoolTokenAccount);

    // console.log(poolAccount)

    // const txId = await pool.depositLiquidity({
    //     wallet: wallet,
    //     pool: poolAccount,
    //     userBaseTokenAccount: userBaseTokenAccount,
    //     userPoolTokenAccount: userPoolTokenAccount,
    //     userQuoteTokenAccount: userQuoteTokenAccount,
    //     maxBaseTokenAmount: maxQuote.mul(new BN(1_000_000)).div(price),
    //     maxQuoteTokenAmount: maxQuote
    // })

    const txId = await pool.withdrawLiquidity({
        pool: poolAccount,
        userBaseTokenAccount,
        userPoolTokenAccount,
        userQuoteTokenAccount,
        wallet,
        poolTokenAmount: new BN(balance.amount.toString(16), "hex")
    })

    console.log("TX Successful: ", txId);
    console.log("Liquidity successfully withdrawn")
})()