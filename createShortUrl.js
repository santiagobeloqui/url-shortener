const Url = require('./model.js');

let createShortUrl = function(original){
        return new Promise((resolve)=>{
            let url = new Url({"original_url":original});
            url.save(function(error,data){
            if (error){
                console.log(error);
                return error;
            } 
            resolve(data);
        }); 

    });
};

module.exports = createShortUrl;