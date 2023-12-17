import {Keypair, PublicKey, Connection, clusterApiUrl, SYSVAR_RENT_PUBKEY, SYSVAR_CLOCK_PUBKEY, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet, Program, AnchorProvider} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl.json" assert { type: "json" };
import base58 from "bs58";
import { BN } from "bn.js";
import * as token from "@solana/spl-token";

const keypair = Keypair.fromSecretKey(
    Uint8Array.from(base58.decode("pvt_key_here"))
);

const wallet = new Wallet(keypair);
const connection = new Connection("rpc_here");

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
        pool: new PublicKey("2BNq1R3wyjHj6BkgDKewW7F4BsAgJoLm2yWUD6tmHq9U"),
        farmingState: new PublicKey("74St5heGJyruSoWKGBPTr7bbKLkuVNAuQxS6QZqfu1Nk"),
        farmingSnapshots: new PublicKey("BBytfx5hN1vT99mffTk9uxUq5zmDFtdowxtS5EzLAZnb"),
        farmingTicket: new PublicKey("AY7D2271zvjmxDhNChBpuo1iTvATp7uYGGojDt1q6zwo"),
        lpTokenFreezeVault: new PublicKey("GGwD7VN4ZingVCwJwy7L68Y2mR485FzqprAqsxVngBQx"),
        poolSigner: new PublicKey("2oRtLButwSW3cLNdF8Lha7vZ7jkPjAW2Tioqp9nVMA2b"),
        userPoolTokenAccount: new PublicKey("GweUxxpcyb1TYZqk74VYAUpxUPn6tugD3yb2bN3VBZFZ"),
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