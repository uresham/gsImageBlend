const {greeting, who, width, height, color, size} = require('./config/configuration');
const { generateCataasImageUrl, writefile } = require('./libs/utill');
const { sendRequest } = require('./libs/request');
const { blendTwoImages } = require('./libs/image');

const imageBlendNew = async () =>{
    try {
        //start 
        console.time('refactored code');
        
        // generate urls of two images
        const firstUrl = generateCataasImageUrl(greeting, width, height, color, size);
        const secondUrl = generateCataasImageUrl(who, width, height, color, size);
        
        // fetche two images
        const firstImg = sendRequest(firstUrl, {encoding: 'binary'});
        const secondImg = sendRequest(secondUrl, {encoding: 'binary'});

        const [firstImgBody, secondImgBody] = await Promise.all([firstImg, secondImg]);

        if(firstImgBody, secondImgBody) {
            // Bind two images together into one image
            const blendedImage = await blendTwoImages(firstImgBody, secondImgBody);

            // save the resulting image as a file
            writefile(blendedImage, '/cat-card-new.jpg', 'binary');

            console.log("The file was saved!");
        }

        //End
        console.timeEnd('refactored code');

    } catch (error) {
        console.error('Error in imageBlendNew :- ', error);
        return;
    }
}

imageBlendNew();