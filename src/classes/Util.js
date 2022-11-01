class Util {
    constructor() {}
    parseParams(object) {
      if (!object) return '';
      let res = new URLSearchParams(object);
      return '?' + res.toString();
    }
  }
  
  module.exports = Util;