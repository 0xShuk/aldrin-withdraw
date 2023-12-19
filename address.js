import {Keypair, PublicKey, Connection} from "@solana/web3.js";
import fs from "fs";
import {dirname} from "path";

const connection = new Connection("rpc_here");
const path =  "./txs.json";
const path2 =  "./reward-txs.json";
const txs = JSON.parse(fs.readFileSync(path2));

(async() => {
    // "9f945bb0c66c1b941900000000000000";

    console.log(txs.length)
    // const timer = ms => new Promise(resolve => setTimeout(resolve, ms));
    // for (let i = 140; i< txs.length; i++) {
    //     const txData = await connection.getParsedTransaction(
    //         txs[i],
    //         {
    //             maxSupportedTransactionVersion: 1,
    //             commitment: "confirmed"
    //         }
    //     );
        
    //     const aldrinSigner = new PublicKey("BqSGA2WdiQXA2cC1EdGDnVD615A4nYEAq49K3fz2hNBo");

    //     const index = txData.transaction.message.accountKeys.findIndex(key => 
    //         key.pubkey.equals(aldrinSigner) && key.signer
    //     );

    //     if (index !== -1) {
    //         const rewardTxs = JSON.parse(fs.readFileSync(path2));
    //         rewardTxs.push(txs[i])
    //         fs.writeFileSync(path2, JSON.stringify(rewardTxs));
    //     }

    //     await timer(20)

    //     if (i%20===0) {
    //         console.log(i)
    //     }
    // }
    
})()