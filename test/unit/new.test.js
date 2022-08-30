const { generateCataasImageUrl, writefile } = require('../../libs/utill');
const { sendRequest } = require('../../libs/request');
const { blendTwoImages } = require('../../libs/image');


describe('test new.js', ()=>{
    describe('imageBlendNew function', ()=>{

        it("check generate url function", () => {
            expect(generateCataasImageUrl('Hi', 200, 250, 'Red', 50)).toBe('https://cataas.com/cat/says/Hi?width=200&height=250&color=Red&s=50');
            expect(generateCataasImageUrl('Hello', 250, 350, 'Green', 50)).not.toBe('test');
        });


        it("check send request promise", async () => {
           await expect(sendRequest()).rejects.toThrow()
           await expect(sendRequest('test', {encoding: 'binary'})).rejects.toThrow()
           await expect(sendRequest('test', {encoding: 'binary'})).rejects.toThrow()

           await sendRequest('https://cataas.com/cat/says/Hi?width=200&height=250&color=Red&s=50', {encoding: 'binary'}).then(a=> {
             expect(Buffer.from(a, 'binary')).toStrictEqual(expect.any(Buffer));
           })
        });

        describe('imageBlendNew function tests promise all with async/await', ()=>{

            let responses;

            beforeEach(async() => {
                const firstImg = sendRequest('https://cataas.com/cat/says/Hello?width=200&height=250&color=Red&s=50', {encoding: 'binary'});
                const secondImg = sendRequest('https://cataas.com/cat/says/you?width=200&height=250&color=Green&s=50', {encoding: 'binary'});

                responses = await Promise.all([firstImg, secondImg]);
            })


            it('tests promise all with async/await', async () => {
                expect(Buffer.from(responses, 'binary')).toStrictEqual(expect.any(Buffer));
            });

            it('tests blend image function with success', async () => {
                const [firstImgBody, secondImgBody] = responses;

                return await blendTwoImages(firstImgBody, secondImgBody).then(async blendedImage => {
                    expect(Buffer.from(blendedImage, 'binary')).toStrictEqual(expect.any(Buffer));

                });
            });

            it('tests blend image function with error', async () => {
                    return await blendTwoImages('test1', 'test2').catch(e =>
                        expect(e).toEqual({error: "Error blending image"}),
                      );
            });

        });


        describe('imageBlendNew function tests write img', ()=>{

            let blendedImage;

            beforeEach(async() => {
                const firstImg = sendRequest('https://cataas.com/cat/says/Hello?width=200&height=250&color=Red&s=50', {encoding: 'binary'});
                const secondImg = sendRequest('https://cataas.com/cat/says/you?width=200&height=250&color=Green&s=50', {encoding: 'binary'});
    
                const [firstImgBody, secondImgBody] = await Promise.all([firstImg, secondImg]);
    
                blendedImage = await blendTwoImages(firstImgBody, secondImgBody);
            })

            it('tests write img function with success', async () => {
                expect(await writefile(blendedImage, '/cat-card-new.jpg', 'binary')).toBe(true);
                expect(await writefile("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
                                         '/cat-card-new.jpg', 'base64')).toBe(true);
            });


            it('tests write img function with fail', async () => {
                try {
                    await writefile(null, '/cat-card-new.jpg', 'binary');
                } catch (error) {
                    expect(error.message).toBe("Error while writing img file.");
                }
            });
        });


    })
})