const express = require("express");
const log = require("lambda-log");

var app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let verifyBearerTokenKeystore = await jose.JWK.asKeyStore(
      bearerVerifierJwk
    );
    verifyBearerTokenResult = await jose.JWS.createVerify(
      verifyBearerTokenKeystore
    ).verify(bearerToken);
  } catch (e) {
    log.error("Unable to verify Bearer token - " + e);
    return false;
  }

  if (!verifyBearerTokenResult) {
    log.error("Bearer token signature invalid!");
    return false;
  }

  res.send("Hello World!");
});

app.listen(3000);
