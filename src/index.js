//setTimeout(function (){location.reload()},5000)
const nj = require("nunjucks");
const njenv = nj.configure();
njenv.addFilter("encodeURI", function (str) {
  return encodeURI(str);
});

const uri = window.location.pathname.split("/").map(decodeURI);

uri.shift();
let action = uri.shift();
if (action === "search") {
  require("./search.js")(uri, nj);
} else if (action === "") {
  require("./ui.js")(uri, nj);
} else {
  alert("unknown action: " + JSON.stringify(action));
}
