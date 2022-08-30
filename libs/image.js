const blend = require('@mapbox/blend');
const {width, height} = require('../config/configuration');

/**
 * stiching two images together into a single image
 */
const blendTwoImages = async (firstImg, secondImg) => {
    return new Promise(async(resolve, reject) => {
        await blend(
            [ 
                {
                    buffer: Buffer.from(firstImg, 'binary'),
                    x: 0,
                    y:0,
                }, 
                {
                    buffer: Buffer.from(secondImg, 'binary'),
                    x: width,
                    y: 0,
                }
            ],
            {
                width: width * 2,
                height: height,
                format: 'jpeg',
            
            }, 
            (err, data) => {
                if(err) {
                    console.log(err);
                    reject({error:'Error blending image'});
                }
                resolve(data);
            }   
        );
    });
}


module.exports = {
    blendTwoImages
}