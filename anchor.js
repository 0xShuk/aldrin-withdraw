import {Keypair, PublicKey, Connection, clusterApiUrl, SYSVAR_RENT_PUBKEY, SYSVAR_CLOCK_PUBKEY, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet, Program, AnchorProvider} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl.json" assert { type: "json" };
import base58 from "bs58";
import { BN } from "bn.js";
import * as token from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(
    Uint8Array.from(base58.decode("ENTER_PRIVATE_KEY_HERE"))
);

const wallet = new Wallet(keypair);
const connection = new Connection(clusterApiUrl("mainnet-beta"));

const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"});
const programId = new PublicKey("CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4");
const program = new Program(idl, programId, provider);

const aldrin = new PublicKey("9bCjWxNQ2WQFuQzsV7g5S3m8qCQ8ub6pd13nWUoXz2eh");
const userPoolTokenAccount = anchor.utils.token.associatedAddress({mint: aldrin, owner: keypair.publicKey});

(async() => {
    const farmingTicket = Keypair.generate();
    const acc = await token.getAccount(connection, userPoolTokenAccount);
    let balance = acc.amount.toString(16)
    balance = new BN(balance, "hex")

    const ix = await program.methods.startFarming(balance)
    .accounts({
        pool: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
        farmingState: new PublicKey("75c1QdiTXe8EMNUtvQgJ8hVB2sxRoX7MAHsRxecmxzHH"),
        farmingTicket: farmingTicket.publicKey,
        lpTokenFreezeVault: new PublicKey("CKhcRq2bQR1ZNPq7nbFdvXRkSqPMWv94PL2Vzn6q7VyQ"),
        userLpTokenAccount: userPoolTokenAccount,
        clock: SYSVAR_CLOCK_PUBKEY,
        rent: SYSVAR_RENT_PUBKEY,
        walletAuthority: keypair.publicKey,
        userKey: keypair.publicKey,
        tokenProgram: token.TOKEN_PROGRAM_ID
    })
    .instruction()

    const createAccountIx = SystemProgram.createAccount({
        fromPubkey: keypair.publicKey,
        newAccountPubkey: farmingTicket.publicKey,
        lamports: 0.00495552 * LAMPORTS_PER_SOL,
        space: 584,
        programId
    });

    const ix2 = await program.methods.endFarming()
    .accounts({
        pool: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
        farmingState: new PublicKey("57hWerzKMZMTWrZJq9JaSfkVy8LJu5otpR9yLj6u9AcB"),
        farmingSnapshots: new PublicKey("8Hf1g9f4crMGZo6n3nVa9tpJHy3YKuKZGJhtqvXsaWEF"),
        farmingTicket: new PublicKey("3BeSU9o1gsrhEqh2ipyuRpXRQVPtoCfEqvCtAQPsi1x8"),
        lpTokenFreezeVault: new PublicKey("CKhcRq2bQR1ZNPq7nbFdvXRkSqPMWv94PL2Vzn6q7VyQ"),
        poolSigner: new PublicKey("AHg3tWsG997RtJo49sv4oUH6sTmmhgvBVzhthxX49DtX"),
        userPoolTokenAccount: userPoolTokenAccount,
        userKey: keypair.publicKey,
        tokenProgram: token.TOKEN_PROGRAM_ID,
        clock: SYSVAR_CLOCK_PUBKEY,
        rent: SYSVAR_RENT_PUBKEY
    })
    .rpc()

    console.log("TX Successful: ", ix2);
    console.log("Farming ended!");

    // const tx = new Transaction();

    // tx.add(...[createAccountIx, ix]);

    // // console.log(tx.instructions[0])
    // const sig = await sendAndConfirmTransaction(connection, tx, [keypair, farmingTicket])
    // console.log(sig)
})()