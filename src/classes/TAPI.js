const axios = require('axios');
const Util = require('./Util');
const util = new Util();
const host = 'https://api.miduwu.ga';

class TAPI {
  constructor(client) {
    this.client = client
    if(!this.client) {
      console.log('\x1b[31maoi.t-api Error:\x1b[0m', 'Missing AoiClient, exiting code...');
      process.exit(0);
    }
  }
  connect() {
    const client = this.client;
    /** 
     * @param {Object} client Aoi.js bot definition
     * @param {string} name Function name
    */
    client.functionManager.createCustomFunction({
      name: '$apiImage',
      type: 'djs',
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let [endpoint, parameters] = data.inside.splits;
        let json = JSON.parse(parameters);
        const path = `${host}/image/${endpoint}${util.parseParams(json)}`;
        const res = await axios.get(path, { responseType: 'arraybuffer' }).catch(e => e.response);
        if (res.status === 404) return d.aoiError.fnError(d, 'custom', {}, 'The endpoint provided was not found.')
        if (res.status === 400) return d.aoiError.fnError(d, 'custom', {}, 'Parameter options provided are invalid.')
        if (res.status === 500) return d.aoiError.fnError(d, 'custom', {}, 'Something internal went wrong with the server, try again later.')
        let i = 0;
        if (isNaN(endpoint[0]) || endpoint[0] < 1 || endpoint[0] > 10) i = -1;
        const index = Number(endpoint[i] ?? 1) - 1;
        const url = endpoint[ i + 1 ]?.addBrackets();
        if ( !d.embeds[ index ] ) d.embeds[ index ] = new d.embed();
        d.embeds[index].setImage(path);
        return {
          code: d.util.setCode(data),
          embeds: d.embeds
        }
      }
    });
    client.functionManager.createCustomFunction({
      name: '$jsonAPI',
      type: 'djs',
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        if (data.err) return d.error(data.err);
        let [endpoint, parameters] = data.inside.splits;
        let json = JSON.parse(parameters);
        const path = `${host}/json/${endpoint}${util.parseParams(json)}`;
        const res = await axios.get(path, { responseType: 'arraybuffer' }).catch(e => e.response);
        if (res.status === 404) return d.aoiError.fnError(d, 'custom', {}, 'The endpoint provided was not found.')
        if (res.status === 400) return d.aoiError.fnError(d, 'custom', {}, 'Parameter options provided are invalid.')
        if (res.status === 500) return d.aoiError.fnError(d, 'custom', {}, 'Something internal went wrong with the server, try again later.')
        data.result = res.data;
        return {
          code: d.util.setCode(data)
        }
      }
    });
    //Internal jokes
    client.functionManager.createCustomFunction({
      name: '$aoiIndia',
      type: 'djs',
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        d.message.channel.send({
          embeds: [{
            "title": "Best development team",
            "image": {
              "url": "https://cdn.discordapp.com/attachments/1012499660885213235/1023394783651180606/unknown.png"
            },
            "footer": {
              "text": "Internal joke"
            }
          }]
        })
        return {
          code: d.util.setCode(data)
        }
      }
    });
    client.functionManager.createCustomFunction({
      name: '$andres',
      type: 'djs',
      code: async (d) => {
        d.message.channel.send({
          embeds: [{
            "image": { "url": "https://cdn.discordapp.com/attachments/1012498118136307713/1030704651902922812/unknown.png" }
          },{
            "image": { "url": "https://cdn.discordapp.com/attachments/1012498118136307713/1030702692558975077/unknown.png" }
          },{
            "image": { "url": "https://cdn.discordapp.com/attachments/1036364567388885033/1036364790039318608/unknown.png" }
          },{
            "image": { "url": "https://cdn.discordapp.com/attachments/1036364567388885033/1036365715990663308/Screenshot_20221030-1446172.png" }
          },{
            "image": { "url": "https://cdn.discordapp.com/attachments/1036364567388885033/1036762443046723614/Screenshot_20221031-190254-1.jpg" }, "footer": { "text": "Internal joke" }
          }]
        });
      }
    });
  }
}

module.exports = TAPI;