const { config } = require('dotenv')
// By default, config will look for a file called .env in the current working directory.
config()

/* The first value set for a variable will win,
 * unless the options.override flag is set,
 * in which case the last value set will win.
 * */

config({ path: './config.env', override: true })

// Pass in multiple files as an array, and they will be parsed in order and combined with process.env (or option.processEnv, if set).

// If a value already exists in process.env and the options.override flag is NOT set, no changes will be made to that value.
config({ path: ['./environment/.env', './environment/stuff']})

// You can read the values into your own object by setting
// the option.processEnv to that object
const envStore = {}
config({ processEnv: envStore })


const {
  WONT_CHANGE,
  WONT_BE_OVERWRITTEN,
  ONLY_IN_ENV,
  ONLY_IN_CONFIG,
  ONLY_IN_FOLDER,
  COMMENT,
  ONLY_IN_STUFF
} = process.env

console.log({ 
  WONT_CHANGE,
  WONT_BE_OVERWRITTEN,
  ONLY_IN_ENV,
  ONLY_IN_CONFIG,
  ONLY_IN_FOLDER,
  COMMENT,
  ONLY_IN_STUFF
});


console.log("envStore:", envStore);
