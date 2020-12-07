const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'))

app.get("/", async (req, res)=>{  
    fs.readFileSync('./public/index.html', function(err, data) {
        if (err) {
            trhow(err)
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
      }); 
});


app.listen(4400, 'localhost', ()=>{console.log("levantó Front!")})