

export default {
  install (Vue, options) {
    Vue.prototype.xmlToJson = function (xmlData){
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlData,'text/xml');
      var contents = xmlDoc.getElementsByTagName('return');
      return contents;
    };
  }
}
