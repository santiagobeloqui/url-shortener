const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const createShortUrl = require('./createShortUrl.js');
const findOriginalUrl = require('./findOriginalUrl.js');
const swig = require('swig');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    // res.sendFile(__dirname + "/index.html");
    res.render('index');
});

// app.get('/', (req, res)=>{
//     res.redirect('/api/shorturl');
// });

app.post('/new', (req,res)=>{
    let checkUrl = /https?:\/\/(\w+\.)+\w+((\/S+)*)?/;
    if(checkUrl.test(req.body.originalUrl) == true){
        createShortUrl(req.body.originalUrl).then((data)=>{
            // res.json({"original_url": data['original_url'], "short_url": data['short_url']});
            res.render('short', {short: data['short_url']});
            
        });
    } else{
        res.render('invalid');
    }
        
});

app.get('/:short', (req,res)=>{
    findOriginalUrl(req.params.short).then((data)=>{
        res.redirect(data['original_url']);
    });
});

let port = process.env.PORT || 3000;
app.listen(port);