const express = require('express');
const route = express.Router();
// const connection = require('../Connection/connection');
const saldoService = require('../services/saldoService');



route.get("/", async (req, res)=>{
    try{
        let resultsCurrentBalance = await saldoService.getCurrentBalance(res);
        res.send(resultsCurrentBalance);
    }
    catch (error) {
        throw error;
    }
})

route.put("/", async (req, res)=>{
    console.log(req.body);
    let userNumber = req.body.userInput;
    let operation = req.body.operation;
    try {
        let results = await saldoService.modifyBalance(res, operation, userNumber); 
        res.send(results);
    }
    catch (error) {
        throw error;
    }
})

module.exports = route;