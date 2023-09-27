var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const translate = require("../helpers/translate");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: "Express" });
});
router.get("/car", function (req, res, next) {
  res.render("car", { title: "Express" });
});
router.get("/blog", function (req, res, next) {
  res.render("blog", { title: "Express" });
});
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Express" });
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;

    if (email == "santosh@gmail.com" && password == "password") {
      var token = jwt.sign({ role: "admin", user: "santosh" }, "shhhhh");
      return res.json({ status: "success", token });
    } else {
      return res.json("invalid credential");
    }
  } catch (err) {
    return res.json("internal error");
  }
});

router.get("/test", async (req, res) => {
  res.end("test route");
});

/**
 * @description POC on translation API with AWS
 */
router.post("/translate", async (req, res) => {
  const { text, targetLang } = req.body;

  const translatedText = await translate.translateText(text, targetLang);

  return res.json({ translatedText });
});

module.exports = router;
