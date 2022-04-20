require("mini.css");
module.exports = function (uri, nj) {
  const t = require("./ui.pug");
  const userVars = require("./data.json").userVars;
  for (let key in userVars) {
    userVars[key].desc = userVars[key].desc || key;
    userVars[key].placeholder =
      userVars[key].placeholder || userVars[key].default || key;
    userVars[key].type = userVars[key].type || "text";
    userVars[key].value =
      localStorage.getItem("userVar_" + key) || userVars[key].default;
  }
  document.querySelector("body").innerHTML = t({
    userVars,
    buildtime: require("./buildtime.json"),
  });

  document.getElementById("save").addEventListener("click", (event) => {
    for (let key in userVars) {
      localStorage.setItem(
        "userVar_" + key,
        document.getElementById(key).value
      );
    }
    window.location.reload();
  });
};
