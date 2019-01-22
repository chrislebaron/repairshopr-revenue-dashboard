# gb-stats

A simple Vue.js app for viewing business statistics from the RepairShopr API.

Note -- Don't ever deploy this to an internet based server. This would expose your API key and business statistics to anyone who knows how to view the source of the page.

## Project setup
Make sure you have Node and NPM installed.

Linux:
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

Mac:
https://blog.teamtreehouse.com/install-node-js-npm-mac

Windows:
https://blog.teamtreehouse.com/install-node-js-npm-windows

Once you have that installed, open the project directory in your terminal and follow these instructions:

Create a file named  `.env.local` in the root of the project. The contents of the file should be:
```
VUE_APP_API_KEY=abc123
```
`VUE_APP_API_KEY` should be your RepairShopr API Key.


Install npm packages used in this project
```
npm install
```

### Run the development server
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

###Run your optimised, compiled version:
```
npm install -g serve
serve -s dist
```

