# DEMO OF HOW DOTENV CAN BE USED MULTIPLE TIMES #

[dotenv home page](https://www.npmjs.com/package/dotenv)


index.js reads in the `config` method from the 'dotenv' Node module. It then shows how data can be read in from different files in different ways:

* Retaining only the first value for a given key
* Overwriting previous values for a given key
* Reading from multiple files with one command
* Reading to a custom object instead of process.env

## WARNING // WARNING // WARNING // WARNING // WARNING ##
Be sure to create a `.gitignore` file and include in it references to all the files that may be read in by 'dotenv'.
These are files where you store secrets. You ***do not*** want to share you secrets with other users of GitHub.

Make sure that the `.gitignore` file also includes `node_modules`, so that you do not spam GitHub with a huge number of files that can be downloaded using `npm i`.

In this case, the `.gitignore` file should look like this:

```
node_modules/
*.env
environment/
```

**Note** that `*.env` will exclude both `.env` and `config.env` files, while `.env` on its own is not enough.