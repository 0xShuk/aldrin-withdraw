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
        state: '3QFsTMHLu5TPktqN2KL71dgnS5zVc3Fs7QpD7Do4jTBF',
        calc: 'HTeNsdQHzBmiZWmk6qXgossewa3jQFmrmaZ7vcGE8PWd',
        vault: 'DpYP7r9P37qwzh9bJzubhvx3YhETWwhdS74WUtAPjFw6'
      },
      {
        state: 'HsgrKYtUJKLFm25sZMmWE9amCfyVifv4xt7wfxevx59b',
        calc: 'BfiWzTsZACFaPoXDuo1UBzwehUQ5zF947fuA4TjmLjKw',
        vault: 'CTdCjPvEMjKNwawzhwDdN4knUKGPVe7MymEfpzRRMisr'
      },
      {
        state: '39Z6EAP6AeMfRkk7xwvgcmXH1FkwCmQDUCT3rYCqeBCU',
        calc: '2Ymi4bLiV5ke93WN1kkUEWKe6Yi88MgjCdoLHmDtcA9D',
        vault: 'EcUzGrxfrAktvLNQJzqepDXVnRR7UgHPq5NW3JiTp32r'
      },
      {
        state: '3wg52jzC5FZZtRxWizPr6yAQNR1yBchN81cPFMu4FdGg',
        calc: '5v8kv3KeqB54332Ucuq6cdsDmo9BSKTmALLmG3QJ9DP7',
        vault: 'Bygz6pMBm7n1emJ2jrWHwW5ZobfQRoazogeWoAnovidp'
      },
      {
        state: 'DqDACzKLat6c9ci52WweJNTbDoqnB1UmTRFfJkH4VJJt',
        calc: '5AR2KE7aP5KVjWBpDWThHPFjMJYVd2edjwq8mipp4488',
        vault: '4rVJsXgomXk3rVmwT9ALemi6yZ3UejQNx9JgLoHE1eRd'
      },
      {
        state: '3Au4LPWFzQPtikQtaNPUhkXMgz38ycPcYH6uVA8XS2hG',
        calc: '2BdxqfhENP2BWYQWK28v5FvRGdYiiKzam7ZjtWmzMDr8',
        vault: '4WjRETVXGR3bGTLiCsdSHUjA4rXXVBzBsRqqGqUUjM8e'
      },
      {
        state: '4zpKE45V23hNbHa6suEn5tMK3cN4zP8AmBFkYgM1WRcC',
        calc: '8utz6bfBXPgXm9x1Pvo6BAi3aWmLn3dfT7nfkcDXvoYD',
        vault: 'AS7nHQG8ChMqocQUHzPdhSmPRrGdeEGmgrTxKhyMrwhf'
      },
      {
        state: '9FFRniTjA4BmzFAUx7Uqg4DigEZ7c1aVTgwqcinf3737',
        calc: 'MHchCLiiuwDUo8g31uHRSzhsTCChoe7fXyKAvXR8nDH',
        vault: '7DJHAoVfMXmwuqMZexEdPvB8UPaG3131mBdLz3pmzubP'
      },
      {
        state: 'CMbnKtRAWskB8LL6D3my2MqRTLYC1o8UVNkQujqf7qET',
        calc: 'D1ACFPYuR5ypGujTHDE4N7AsrhU77amK5KTWKeYhUJbf',
        vault: 'DMwYsAhHrJi9xDSb66dPdMUD4i644FBM1dnLfZYsUdrF'
      },
      {
        state: '5p1hCdXbwJWM1XYdhryaFzfDHo22MPGAqyKwxaWZexNb',
        calc: 'HdFVp8vM9qGCHsPm3SyjQ7UodSHQtTpBVsunZ2X81SnT',
        vault: '8y9qp9e4oFxny8j1AccLsvuWEJ1G6m4ETpNedqXyFeFc'
      },
      {
        state: 'iBVJWX9y8whidbWYSLbLit5DEADkeEwJ8j7DZvCzVcF',
        vault: 'EWhTT1fKq4PW9i7E64F2xDmJhPUwERApWpS1CDfYz9eq'
      },
      {
        state: 'Ed97U8PG5qHapfgQ6AhZtgYpS2tgN12uHiSYes42WmG3',
        vault: 'GB47ZdmZdNZmkTa7GQJwD8oUAYBWZVXsMwdHoMwayDZF'
      },
      {
        state: '6WNtsQ9JRnrmbDmT9icxQW1VeLCD6SJmZ9t1izkd8Mhg',
        vault: 'HUsub2neUrB3gxcFZFnmVMJkQHxmMutjmsAFnbEZvsCS'
      },
      {
        state: 'GtsK2GeYeZGzBN9sK4k4Wf4YP62XtwuvpGhJCcxsrGNg',
        vault: '5VdQBiTY4XNDuzAMri3epTiApidMNaSpu1jk8sNLbFPi'
      }
    ]

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
          pool: new PublicKey("2BNq1R3wyjHj6BkgDKewW7F4BsAgJoLm2yWUD6tmHq9U"),
          farmingState: new PublicKey(data[i].state),
          farmingCalc: new PublicKey(data[i].calc),
          farmingTokenVault: new PublicKey(data[i].vault),
          poolSigner: new PublicKey("2oRtLButwSW3cLNdF8Lha7vZ7jkPjAW2Tioqp9nVMA2b"),
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
          pool: new PublicKey("2BNq1R3wyjHj6BkgDKewW7F4BsAgJoLm2yWUD6tmHq9U"),
          farmingState: new PublicKey(data[i].state),
          farmingCalc: new PublicKey(data[i].calc),
          farmingTokenVault: new PublicKey(data[i].vault),
          poolSigner: new PublicKey("2oRtLButwSW3cLNdF8Lha7vZ7jkPjAW2Tioqp9nVMA2b"),
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