# hacklahoma-nsegf

# Hacklahoma React set up guides

## Node.js

### Installing

#### On mac

1. Open terminal and type `brew search version`
2. Install desired version
   1. for hacklahoma please run `brew install node@12`
3. Link brew to version `brew link node@12 --force`
4. confirm version `node --version`
   1. desired version `12.14.1`
5. confirm npm version `npm -v`
   1. desired version `6.13.4`
6. for possible error go here https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew
   
#### windows

#### linux

## Express.js and Concurrently

1. Install Express.js by running `npm install express --save`
2. Install Concurrently by running `npm install concurrently --save`
3. Install nodemon by running `npm install nodemon --save-dev`
4. Install express generator by running `npm install -g express-generator`
5. Test express generator by typeing `express -h`
   1. you should see a listing of express options

## Setting up

1. Create your workspace directory `express --view=pug hacklahoma-btg`
2. Navigate into workspace `cd hacklahoma-btg`
3. Create react client
   1.  run `npx create-react-app client`
4. Open `bin/www` file and change port to 5000 instead of 3000
   1. Ex: `var port = normalizePort(process.env.PORT || '5000')`
   2. notice `5000` replaced `3000`
5. Next open client `package.json` file `client/package.json`
   1. add `"proxy": "http://localhost:5000/"` to the bottom of the file. Make sure it is inside main json bracket.
   2. EX 
   ```json
   {
       ...
       ...
        },
        "proxy": "http://localhost:5000/"
    }
   ```
6. Ensure that you download client dependencies
   1. Navigate to client `cd client`
   2. Add UI Framwork `npm install --save semantic-ui-react`
   3. Add UI Framework css `npm install --save semantic-ui-css`
   4. Then `npm install`
   5. Finaly open client `app.js` file and import `import 'semantic-ui-css/semantic.min.css'` to top of file.
7. Go back to express directory `cd ..`
8. Open express.js `package.json` file
   1. add two new scripts to file under `"start":`
      1. add `"client": "cd client && npm start",` 
      2. add `"dev": "concurrently \"npm run start\" \"npm run client\""`
9.  Install express dependencies `npm install`
   2.  You might get warnnings, just ignore them
10. Test project `npm run dev`
    1.  ensure you can navigate to `http://localhost:5000/` for express and `http://localhost:3000/` for client
11. Install https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi to google chrome extension for easy debugging

## Data Base
