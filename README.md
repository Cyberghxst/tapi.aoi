# aoi.t-api
This package is the easiest way to interact with the T-API using AOI.js

## Features
- 🚀 Easy to use!
- 🎓 From a professional API!

## Install
```
npm i aoi.t-api
```
All endpoints are from: [T-API](https://api.miduwu.ga)

## Setup
```js
// Starting AOI classes
const { AoiClient, LoadCommands } = require('aoi.js');
// Starting TAPI class
const TAPI = require('aoi.t-api');
// AOI Client
const client = new AoiClient({...});
// Client callbacks
client.onMessage()
// Connecting T-API with AOI.js
const api = new TAPI(client);
api.connect();
```

## Usages
### Embed images
> `$imageTAPI[endpoint name;params]`
<br> Params must be in JSON
#### Supreme command
```js
module.exports = {
    name: 'supreme',
    code: `
        $imageTAPI[supreme;{ "text": "Best package!" }]
    `
}
```
### Getting a JSON body
> `$jsonTAPI[endpoint name;params]`
<br> Params must be in JSON
```js
module.exports = {
    name: 'owoify',
    code: `
        $sendMessage[$getObjectProperty[data]]
        $createObject[$jsonTAPI[owoify;{ "text": "hamburguesa" }]]
    `
}
```

## Made with love by a Moonlight Group member.
### Credits
> Mid#1044 (for some code "inspiration")
> <br> Cyberghxst#2683 (Package developer)