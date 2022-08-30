const request = require('request');


/**
 * make http calls
 */
const sendRequest =  (url, otherOptions) => {
    return new Promise( (resolve, reject) => {
        const options = {
            url: url,
            ...otherOptions
        };

        request(options, (error, response) => {
            if (error) {
                reject(error);
            }
            console.log('Received firstReq response with status:' + response.statusCode);
            resolve(response.body);
        });
    });
        
}


module.exports = {
    sendRequest
}