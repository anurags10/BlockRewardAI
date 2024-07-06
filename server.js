const express = require('express');
const axios = require('axios');
const ethers = require('ethers');
const createCsvWriter=require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const app = express();
const apiKey = process.env.API_KEY;
class Block{
    constructor(timeStamp,blockReward){
        this.timeStamp = timeStamp;
        this.blockReward = blockReward;
    }

    
}

const fetchData = async () => {
    try {
        const listOfBlock = [];
        for (let blockN = 17423345;blockN < 17423400;blockN++){
            const apiURL = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockN}&apikey=${apiKey}`
            const response = await axios.get(apiURL);
            const rewardValue = ethers.formatEther(response.data.result.blockReward);
            const timeStamp = response.data.result.timeStamp
            // console.log(response.data.result.blockReward);
            const block = new Block(timeStamp,rewardValue)
            // console.log(block);
            listOfBlock.push(block);
        }
        // console.log(listOfBlock);
        exportToCsv(listOfBlock);
    } catch (error) {
        console.log(error);
    }


}

const exportToCsv = (data) => {
    console.log("Hello")
    const csvWriter = createCsvWriter({
      path: 'block_data.csv',
      header: [
        { id: 'timeStamp', title: 'timestamp' },
        { id: 'blockReward', title: 'blockReward' }
      ]
    });
  
    csvWriter
      .writeRecords(data)
      .then(() => {
        console.log('CSV file created successfully!');
      })
      .catch((error) => {
        console.error(error);
      });
  };


    

(async () => {
    try {
        await fetchData();

        app.listen(3000,()=>{
            console.log('server is running on port 3000');
        }) 
    } catch (error) {
        console.log(error);
    }
})()