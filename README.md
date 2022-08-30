
------

## Setup

In order to run this simple node app follow these steps.

**npm install** - (Install npm packages).
**node old.js Hi Me 400 500 Purple 100** - (run old code).
**node new.js Hi Me 400 500 Green 100** - (run newly refactored code).






-------

## Rationalization for the changes
 
1. **console.time()** and **console.timeEnd()** methods that help with analyzing performance of the code, are placed in both old and refactored code to track how long an operation takes.

2. **async/await** :- Javascript is quite known for its callback functions (functions that can be passed as an argument to other functions). They also allow to define asynchronous behavior in Javascript. The problem with callbacks is that - as the number of chained operations increase, the code gets clunkier and unwieldy, resulting in what is infamously known as **callback hell**. To solve this, ES 6 (ECMASCRIPT 2015) came out with the **Promises** API that made it much easier to write asynchronous code in Javascript. On top of this, with ES 8 (2017), the **async/await** syntax was introduced to further simplify things and make the API even more intuitive and natural. Async/await and promises based syntax allows for cleaner code, better readability, easier error handling and testing; all of this while maintaining a clear control flow and a more coherent functional programming setup.

3. **Promise.all()** :- This method can be useful for aggregating the results of multiple promises. It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully — all of whom we want to fulfill before the code execution continues.

4. **Catching Errors** :- Instead of letting Node.js throw errors, interrupt code execution, even fail at times, we’d rather take charge of our application’s control flow by handling these error conditions. This is what we can achieve through exception handling using try/catch blocks. By empowering developers to programmatically manage such exceptions, it keeps things stable,  facilitates easier debugging, and also prevents a poor end-user experience.

5. **Folder structure** :- clean code and easy readability.

            ├── old.js     		entry point of the old code
            ├── new.js			entry point of the refactored code
            ├── .env                    env variables
            ├── /config                 config settings
                ├── configuration.js
            ├── /images                 store generated images from both old and refactored code
            ├── /libs 
                ├── image.js            process images
                ├── request.js          handle http requests
                ├── utill.js            common functions
            ├── /test 
                ├── /coverage           unit test coverage
                ├── /unit          	unit tests
                
