import {Keypair, PublicKey, Connection, clusterApiUrl, SYSVAR_RENT_PUBKEY, SYSVAR_CLOCK_PUBKEY, SystemProgram, LAMPORTS_PER_SOL, sendAndConfirmTransaction, Transaction} from "@solana/web3.js";
import {Wallet, Program, AnchorProvider} from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import idl from "./idl.json" assert { type: "json" };
import base58 from "bs58";
import { BN } from "bn.js";
import {TokenClient} from "@aldrin_exchange/sdk";

const keypair = Keypair.fromSecretKey(
    Uint8Array.from(base58.decode("pvt_key"))
);

const wallet = new Wallet(keypair);
const connection = new Connection("rpc_here");

const provider = new AnchorProvider(connection, wallet, {commitment: "confirmed"});
const programId = new PublicKey("CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4");
const program = new Program(idl, programId, provider);

const rinAccount = new PublicKey("E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp");
const lidoAccount = new PublicKey("HZRCwxP2Vq9PCpPXooayhJ2bxTpo5xfpQrwB1svh332p");

(async() => {
    const data = [
        {
          state: '8fEodAk3kY98Tgtk4cGRMtAbJrsuQ1DWmEcHRvwGj9Re',
          vault: '3z7aKYrHyqvmcXGic5fgYDzYYFPpFqbvZpBvfapBNTSa'
        },
        {
          state: 'DwUvKrgUktfXQbsbtXuY9b5aBkqPUoaScDHttLtZnhja',
          calc: 'ty5NJbwb4VEFxMuy8zEWFQuMud4xjZ5CaA7kTgXmoQD',
          vault: 'BLqQeS2cvqdEDcH7ws4fGjfztAcQvjbz8x92ykSVSmzS'
        },
        {
          state: '3qTPeNBSWFUpUKFJ73Xf3zhPDd5zcWhMX7pDL8BuhKBm',
          calc: 'CXUCQ9WjhHZFrrxS7EfW8LRSybHmGpUEcV2U8uhaMyJT',
          vault: '879VaaP7L34Z48t6XRFeasVpthpdjxmA7gSsEsZegpNv'
        },
        {
          state: 'CUx1WNutujhVMHwVFJeYiJmhakXsy4F5H81R367LZY5r',
          calc: 'D8wHoEj1gVcgUqUjx6R3XW7NRkviFwRaLc2Vyf8hqWkh',
          vault: '4WqrEVepd3rwrhWKQ1DVkzizTTT5iyhUoWkfZFQjySNg'
        },
        {
          state: 'BbG68ZYw1CkssaAzk5zt7tjEjRbsNqiaho3kN7bLJS5W',
          calc: 'EH46SpoyyJ85XV7JZPefCBEzCq1NHa5Um3gidzMpvTww',
          vault: 'EHXQx43o6Vq4GqujpPupBFv7AVxtnH6pjTgS9T1inJty'
        },
        {
          state: '75c1QdiTXe8EMNUtvQgJ8hVB2sxRoX7MAHsRxecmxzHH',
          calc: 'GCf6RkYxyHJbqsCYizDgeoikCKKb82veEovMAVA27Sqz',
          vault: '9PTMdoD6eLBRqvSzaAb7MGLVSozv7UaNeNBRjTTiPJ6b'
        },
        {
          state: '9G6tz3sv5Qqm7PWvMALVbdwNKwGhRgt5h5rznXiHtPYY',
          calc: 'EEiJvxBMXE6LxFmm1byfBt4n15XdT8LkvA6zzHQk7uMw',
          vault: 'F2bdNAhYp3B2kCPiX7xknjmfv9AWwPMgLPdjk9c5KfLV'
        },
        {
          state: '2tytKi6yZTLmmzMZ6taodCjrz6AZYV263Y6vMfQAban4',
          calc: '9dsXzo24CGMgPpJoH6Ls68iox9gs1DRXjTiQqeuhbGmp',
          vault: 'DBQhf46iGLMebVyjXEBXvtYTd6vx2Z93GGye8XTFA1Qf'
        },
        {
          state: 'CxQnmGhriswhPGYzCVDkhACVT7REXkx9oiABEBaHw8si',
          calc: '7AuMZavjiJx7VY65GVd4JrowQL1R4bya2cJCPyg5QygX',
          vault: 'EyyPNzuLgQUL1nyVTUnaUBJuWEYXwhworFMe7rSbce3c'
        },
        {
          state: 'GojAGKNpP9tKN5KVsh8Tr2JcVRLmWUf6DbhpoBGWmyZb',
          calc: 'AuLCH4QeGBc1qR8eL3je3VmS6TNyhMU5DYx2irDPYq61',
          vault: 'GMXpGXgWvgedFL95FdcQ7WxFZdiZd5rGs9daLFGQa82o'
        },
        {
          state: '3R9NoTW2DL5cQhFdM59Fjs8L5TvyJdMnYgyLwfwk8PiQ',
          vault: 'G6XqLWxqzcvyZoDMuzocDHNrukTk5bKDDGo3CgbFou5x'
        },
        {
          state: '2xmNhygagjWQf9En3uQAqMiv24QvUfYYbcHVgrCnEDAs',
          vault: '7HAeQgEg6Qhqs1Z4ZncFyHbDm3ebRsKs2iMiw3xsmNXP'
        },
        {
          state: '5MjyXpuA8ix31kENp7NehDt4hXUgWrreLDewisU7Ynm',
          vault: 'GRfM1C6yxKwA8HFpx1rCgSqeQwqEEFZ8D3C1bpgAqhLm'
        }
    ];

    const token = new TokenClient(connection);

    const userRinAccount = anchor.utils.token.associatedAddress({
      mint: rinAccount, 
      owner: keypair.publicKey
    });

    const userLidoAccount = anchor.utils.token.associatedAddress({
      mint: lidoAccount, 
      owner: keypair.publicKey
    });

    const tx = new Transaction();
    
    for (let i = 0; i < 6; i++) {
      if (data[i].calc) {
        const type = await token.getTokenAccount(new PublicKey(data[i].vault));
        const userFarmingTokenAccount = type.mint.equals(rinAccount) ? userRinAccount : userLidoAccount;

        const ix = await program.methods.withdrawFarmed()
        .accounts({
          pool: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
          farmingState: new PublicKey(data[i].state),
          farmingCalc: new PublicKey(data[i].calc),
          farmingTokenVault: new PublicKey(data[i].vault),
          poolSigner: new PublicKey("AHg3tWsG997RtJo49sv4oUH6sTmmhgvBVzhthxX49DtX"),
          userFarmingTokenAccount,
          userKey: keypair.publicKey,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY
        })
        .instruction();

        tx.add(ix);
      }    
    }  
    
    console.log(tx.instructions[0])
    const sig = await sendAndConfirmTransaction(connection, tx, [keypair]);
    console.log("TX successful: ", sig);
    console.log("First Reward Claimed for USDC");

    const tx2 = new Transaction();
    
    for (let i = 6; i < data.length; i++) {
      if (data[i].calc) {
        const type = await token.getTokenAccount(new PublicKey(data[i].vault));
        const userFarmingTokenAccount = type.mint.equals(rinAccount) ? userRinAccount : userLidoAccount;

        const ix = await program.methods.withdrawFarmed()
        .accounts({
          pool: new PublicKey("5T5T3WHmXDZqM7E1Hi9PNCBFN33Baxvd64jdEPidmYPr"),
          farmingState: new PublicKey(data[i].state),
          farmingCalc: new PublicKey(data[i].calc),
          farmingTokenVault: new PublicKey(data[i].vault),
          poolSigner: new PublicKey("AHg3tWsG997RtJo49sv4oUH6sTmmhgvBVzhthxX49DtX"),
          userFarmingTokenAccount,
          userKey: keypair.publicKey,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          clock: SYSVAR_CLOCK_PUBKEY
        })
        .instruction();

        tx2.add(ix);
      }    
    }  
    
    const sig2 = await sendAndConfirmTransaction(connection, tx2, [keypair]);
    console.log("TX successful: ", sig2);
    console.log("Second Reward Claimed for USDC");

})()