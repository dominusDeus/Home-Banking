const connection = require ('../Connection/connection');

function getCurrentBalance (res){
    return new Promise((resolve, reject)=>{
        connection.query('SELECT saldo FROM saldo_actual where saldo_actual.id = 1', (err, resultsQuery)=> {
            if (err) {
                reject(res.status(500).json(`there was an error: ${err}`))
            } else {
                resolve(JSON.stringify(resultsQuery));
            } 
        });

    })
}


async function modifyBalance (res, operation, number) {
    let userNumber = JSON.parse(number);
    let newNumber = 0;
    try{
        let currentBalance = await getCurrentBalance(res);
        let parsedCurrentBalance = JSON.parse(currentBalance)[0].saldo;
        if (operation == 'extract') {
            newNumber = parsedCurrentBalance - userNumber;
        } else if (operation == 'deposit') {
            newNumber = parsedCurrentBalance + userNumber    
        }
        console.log(newNumber);
        return new Promise ((resolve, reject)=>{
            let sql = `UPDATE saldo_actual SET saldo_actual.saldo=${newNumber} where saldo_actual.id = 1`
            connection.query(sql, (err, results)=>{
            if (err) {
                reject(res.status(500).json(`there was an error: ${err}`));
            } else {
                resolve(JSON.stringify(results));
            }
            })    
    
        })
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    getCurrentBalance : getCurrentBalance,
    modifyBalance : modifyBalance
}