const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const createShortUrl = require('./createShortUrl.js');
const findOriginalUrl = require('./findOriginalUrl.js');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/api/shorturl', (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get('/', (req, res)=>{
    res.redirect('/api/shorturl');
});

app.post('/api/shorturl/new', (req,res)=>{
    let checkUrl = /https?:\/\/(\w+\.)+\w+((\/S+)*)?/;
    if(checkUrl.test(req.body.originalUrl) == true){
        createShortUrl(req.body.originalUrl).then((data)=>{
            res.json({"original_url": data['original_url'], "short_url": data['short_url']});
        });
    } else{
        res.json({"error":"invalid URL"});
    }
        
});

app.get('/api/shorturl/:short', (req,res)=>{
    findOriginalUrl(req.params.short).then((data)=>{
        res.redirect(data['original_url']);
    });
});

let port = process.env.PORT || 3000;
app.listen(port);