import {AUTHORIZED_POOLS, TokenSwap, PoolClient, TokenClient, DTwapClient, FarmingClient} from "@aldrin_exchange/sdk";
import {Keypair, PublicKey, Connection, clusterApiUrl} from "@solana/web3.js";
import {Wallet} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import base58 from "bs58";
import { BN } from "bn.js";
import * as token from "@solana/spl-token";
import fs from "fs";

const keypair = Keypair.fromSecretKey(
    Uint8Array.from(base58.decode("pvt_key_Here"))
);

const path = "./ticket.json";

const wallet = new Wallet(keypair);
const connection = new Connection("rpc_here");

(async() => {
    // const tokenSwap = await TokenSwap.initialize(connection, wallet);
    const pool = new PoolClient(connection);
    const tokenClient = new TokenClient(connection);

    const poolMint = new PublicKey("2m9ZT6smigrmNKxSRe7to6HnYGMYTztsDiuoJM4k336j");

    // const maxQuote = new BN(500_000);
    // const usdc = new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    // const stSol = new PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj");
    // const aldrin = new PublicKey("2m9ZT6smigrmNKxSRe7to6HnYGMYTztsDiuoJM4k336j");

    // const userBaseTokenAccount = anchor.utils.token.associatedAddress({mint: stSol, owner: keypair.publicKey});
    // const userQuoteTokenAccount = anchor.utils.token.associatedAddress({mint: usdc, owner: keypair.publicKey});

    // const userPoolTokenAccount = anchor.utils.token.associatedAddress({mint: aldrin, owner: keypair.publicKey});

    // const baseTokenVault = new PublicKey("CEKPRyrkVsBvSZB6yG7snybYA86HUMxYhA2SAhnMPYZJ");
    // const quoteTokenVault = new PublicKey("CouyQhExzB5x7UpL5bGCPGTfcbHmx4TfqMBSdcLseacb");

    // const baseVaultAccount = await tokenClient.getTokenAccount(baseTokenVault);
    // const quoteVaultAccount = await tokenClient.getTokenAccount(quoteTokenVault);

    // const price = quoteVaultAccount.amount.mul(new BN(1_000_000)).div(baseVaultAccount.amount)

    // const pools = await pool.getV2Pools();
    // const poolAccount = pools.find((p) => p.poolMint.equals(poolMint))

    // const balance = await token.getAccount(connection, userPoolTokenAccount);

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

    // const txId = await pool.withdrawLiquidity({
    //     pool: poolAccount,
    //     userBaseTokenAccount,
    //     userPoolTokenAccount,
    //     userQuoteTokenAccount,
    //     wallet,
    //     poolTokenAmount: new BN(balance.amount.toString(16), "hex")
    // })

    const farmingClient = new FarmingClient(connection);

    // const farm = await farmingClient.getFarmingTickets({
    //     pool: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
    //     userKey: new PublicKey("7XopJZCEdB1fzDQGCFJ1QC5dv5LC36AEMQkEGfHaMoRj"),
    //     poolVersion: 2
    // });
    // farm.forEach(f => {
    //     console.log("Farm ", f.pool.toBase58());
    //     console.log("Ticket ", f.farmingTicketPublicKey.toBase58());
    //     console.log("States", f.statesAttached.map(s => s.farmingState.toBase58()))
    // })

    // const ss = await farmingClient.getFarmingCalcAccounts({
    //     farmingState: new PublicKey("GojAGKNpP9tKN5KVsh8Tr2JcVRLmWUf6DbhpoBGWmyZb"),
    //     userKey: new PublicKey("7XopJZCEdB1fzDQGCFJ1QC5dv5LC36AEMQkEGfHaMoRj"),
    //     poolVersion: 2
    // });

    // const vv = await farmingClient.getFarmingState({
    //     poolPublicKey: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
    //     poolVersion: 2
    // })
    
    const states = [
        '8fEodAk3kY98Tgtk4cGRMtAbJrsuQ1DWmEcHRvwGj9Re',
        'DwUvKrgUktfXQbsbtXuY9b5aBkqPUoaScDHttLtZnhja',
        '3qTPeNBSWFUpUKFJ73Xf3zhPDd5zcWhMX7pDL8BuhKBm',
        'CUx1WNutujhVMHwVFJeYiJmhakXsy4F5H81R367LZY5r',
        'BbG68ZYw1CkssaAzk5zt7tjEjRbsNqiaho3kN7bLJS5W',
        '75c1QdiTXe8EMNUtvQgJ8hVB2sxRoX7MAHsRxecmxzHH',
        '9G6tz3sv5Qqm7PWvMALVbdwNKwGhRgt5h5rznXiHtPYY',
        '2tytKi6yZTLmmzMZ6taodCjrz6AZYV263Y6vMfQAban4',
        'CxQnmGhriswhPGYzCVDkhACVT7REXkx9oiABEBaHw8si',
        'GojAGKNpP9tKN5KVsh8Tr2JcVRLmWUf6DbhpoBGWmyZb',
        '3R9NoTW2DL5cQhFdM59Fjs8L5TvyJdMnYgyLwfwk8PiQ',
        '2xmNhygagjWQf9En3uQAqMiv24QvUfYYbcHVgrCnEDAs',
        '5MjyXpuA8ix31kENp7NehDt4hXUgWrreLDewisU7Ynm',
    ];

    const usdcAccounts = [];
    const data = JSON.parse(fs.readFileSync(path));

    for (let i = 0; i < states.length; i++) {
        const entry = {state: states[i]};

        const calcData = await farmingClient.getFarmingCalcAccounts({
            poolVersion: 2,
            farmingState: new PublicKey(states[i]),
            userKey: new PublicKey("7XopJZCEdB1fzDQGCFJ1QC5dv5LC36AEMQkEGfHaMoRj")
        });
        
        if (calcData.length > 0) {
            console.log(calcData.length);
            entry.calc = calcData[0].farmingCalcPublicKey.toBase58();
        };

        const xx = data.find(d => d.farmingStatePublicKey === states[i]);
        entry.vault = xx.farmingTokenVault;
        
        usdcAccounts.push(entry);
    };

    console.log(usdcAccounts);
    // console.log("TX Successful: ", txId);
    // console.log("Liquidity successfully withdrawn")
})()