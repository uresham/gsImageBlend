const argv = process.argv.slice(2);

 let CONFIG = {};

CONFIG.greeting = argv[0];
CONFIG.who = argv[1];
CONFIG.width = Number(argv[2]);
CONFIG.height = Number(argv[3]);
CONFIG.color = argv[4];
CONFIG.size = Number(argv[5]);


module.exports = CONFIG;