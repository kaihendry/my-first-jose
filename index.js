const express = require("express");
const jose = require("node-jose");
const log = require("lambda-log");
const mypubkey = require("./ks.json");

var app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  var bearerToken = "";
  var verifyBearerTokenResult = null;

  try {
    bearerToken = req.headers.authorization;
    let verifyBearerTokenKeystore = await jose.JWK.asKeyStore(mypubkey);
    verifyBearerTokenResult = await jose.JWS.createVerify(
      verifyBearerTokenKeystore
    ).verify(bearerToken);
  } catch (e) {
    log.error(e);
    return res.status(403).send("invalid bearer token");
  }

  if (!verifyBearerTokenResult) {
    return res.status(403).send("bearer token signature invalid");
  }

  res.send("Hello World!");
});

app.listen(3000);
