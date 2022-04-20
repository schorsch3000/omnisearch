module.exports = function (uri, nj) {
  const data = require("./data.json");
  let searchInput = uri.map(decodeURIComponent).join("/");
  let searchParts = searchInput.match(/^(!)?([^ ]+) +(.*)$/);
  let providerName, searchString;
  if (searchParts) {
    providerName = searchParts[2];
    searchString = searchParts[3];
  } else {
    providerName = data.default_provider;
    searchString = searchInput;
  }

  let provider;
  if (data.providers.nameLookup[providerName]) {
    provider = data.providers.nameLookup[providerName];
  } else {
    provider = data.default_provider;
    searchString = searchInput;
  }
  let uriTemplate = data.providers.uris[provider];

  let tplData = {
    query: searchString,
  };
  for (let name in data.userVars) {
    tplData[name] = localStorage.getItem("userVar_" + name);
  }

  let targeturi = nj.renderString(uriTemplate, tplData);

  if (!targeturi) {
  } else {
    window.location.href = targeturi;
    //console.log(targeturi);
  }
};
