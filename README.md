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

## Using dotenv.config() while debugging in VS Code ##

To debug your server with VS Code:
1. Open the main file for your server in the code editore
2. Select the menu item Run > Add Configuration
3. Select Node in the contextual menu that opens from the
   Command Palette at the top of the window.
   This should create a file at `.vscode/launch.json` that might look something like this:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/index.js"
    }
  ]
}
```
4. You can now select the menu item Run > Start Debugging, or simply press the `F5` key at the top of your keyboard.

If you want to read in any `process.env` variables before the debugging session starts, you can add this line at the end of the configuration that you just created:


> `  ...],`  
> `      "program": "${workspaceFolder}/index.js",`   
> **`      "envFile": "${workspaceFolder}/debug/debug.env"`**  
> `    }`  
> `  ]`  
> `}`  


You would, of course, use your own path and file name for the file to read.

### Example:

Suppose your project has the following directory hierarchy:
```
├── README.md
├── client
│   └── ...
└── server
    ├── app.js
    ├── .env
    └── ...
```

Suppose also that your `.env` file contains this line...

```
PORT=5555
```

... and that `app.js` file starts with:

```javascript
require('dotenv').config()
console.log("PORT:", process.env.PORT)
```

When you run your server using `cd server; node app.js`, you should see this in the Terminal:
```
PORT: 5555
```

However, when debugging, your `.vscode` file will launch the `app.js` file from the ***root*** of your project.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/server/app.js"
    }
  ]
}
```

As a result, `require('dotenv').config()` will read values from a `.env` file in the ***root folder***... if such a file exists. When you try to debug `app.js`, you will see something like this:

```
/.../bin/node ./server/app.js
PORT: undefined
```

To solve this, you can edit the `.vscode` file, to tell it which file to read the environment variables from:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/server/app.js",
      "envFile": "${workspaceFolder}/server/.env"
    }
  ]
}
```