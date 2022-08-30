const { join } = require('path');
const { writeFile } = require("fs").promises;
/**
 * generate image url of Cat as a Service (https://cataas.com)
 */
const generateCataasImageUrl = (text, width, height, color, size) => {
    return 'https://cataas.com/cat/says/' + text + '?width=' + width + '&height=' + height + '&color=' + color + '&s=' + size;
}



/**
 * write files into image folder
 */
const writefile = async (content, fileName, encoding) => {
    try{

        if (encoding === 'base64') {
            content = content.replace(/^data:image\/\w+;base64,/, "");
            content = Buffer.from(content, 'base64');
        }

        const fileOut = join(process.cwd(), '/images/', fileName);
        await writeFile(fileOut, content, {encoding: encoding});

        return true;

    } catch(e) {
        throw new Error("Error while writing img file.");
    }

    
}



module.exports = {
    generateCataasImageUrl,
    writefile
}