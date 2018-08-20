const Url = require('./model.js');

let findOriginalUrl = function(shortUrl){
    return new Promise((resolve)=>{
        Url.findOne({"short_url": shortUrl}, function(error, data){
            if (error){
                console.log(error);
                return error;
            } 
            resolve(data);
        });
    });
};

module.exports = findOriginalUrl;