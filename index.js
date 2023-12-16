import {AUTHORIZED_POOLS, TokenSwap, PoolClient, TokenClient, DTwapClient} from "@aldrin_exchange/sdk";
import {Keypair, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import {Wallet} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import base58 from "bs58";
import { BN } from "bn.js";
import * as token from "@solana/spl-token";

(async() => {
    // const tokenSwap = await TokenSwap.initialize(connection, wallet);
    const pool = new PoolClient(connection);
    const tokenClient = new TokenClient(connection);
    const farmClient = new FarmingClient(connection);
    const aldrinClient = new DTwapClient(connection);

    const poolMint = new PublicKey("9bCjWxNQ2WQFuQzsV7g5S3m8qCQ8ub6pd13nWUoXz2eh");

    const maxQuote = new BN(500_000);
    const usdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const stSol = new PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj");
    const aldrin = new PublicKey("9bCjWxNQ2WQFuQzsV7g5S3m8qCQ8ub6pd13nWUoXz2eh");

    const userBaseTokenAccount = anchor.utils.token.associatedAddress({mint: stSol, owner: keypair.publicKey});
    const userQuoteTokenAccount = anchor.utils.token.associatedAddress({mint: usdc, owner: keypair.publicKey});

    const userPoolTokenAccount = anchor.utils.token.associatedAddress({mint: aldrin, owner: keypair.publicKey});

    const baseTokenVault = new PublicKey("4MT4B4UxfAYPmrpKvmPczBLDPBzTBApaX5qQqyUk5n9K");
    const quoteTokenVault = new PublicKey("7xi4XDMRaj5JxtjA8kWmdAbfsYymsQvzsHLj2wMkzwwn");

    const baseVaultAccount = await tokenClient.getTokenAccount(baseTokenVault);
    const quoteVaultAccount = await tokenClient.getTokenAccount(quoteTokenVault);

    const price = quoteVaultAccount.amount.mul(new BN(1_000_000)).div(baseVaultAccount.amount)

    // const pools = await pool.getV2Pools();
    // const poolAccount = pools.find((p) => p.poolMint.equals(poolMint))

    // const balance = await token.getAccount(connection, userPoolTokenAccount);

    const bal = new BN("c6ff", "hex");

    const txId = await farmClient.startFarming({
        farm: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
        wallet,
        tokenAmount: bal,
    })

    console.log(txId)
})()