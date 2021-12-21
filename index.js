const express = require("express");
const jose = require("node-jose");
const mypubkey = require("./ks.json");

function getBearerToken(headers) {
  var authHeader = headers.Authorization || headers.authorization;

  if (!authHeader) {
    return null;
  }

  var authzHeaders = authHeader.split(",");
  var bearer = null;
  for (var i in authzHeaders) {
    if (authzHeaders[i].startsWith("Bearer ")) {
      bearer = authzHeaders[i].substring("Bearer ".length);
    }
  }

  return bearer;
}

var app = express();

app.get("/", async (req, res) => {
  var bearerToken = "";
  var verifyBearerTokenResult = null;

  try {
    bearerToken = getBearerToken(req.headers);
    console.log("token", { bearerToken });

    // if the bearerToken is signed by another kid, how do i know which key to use?

    let verifyBearerTokenKeystore = await jose.JWK.asKeyStore(mypubkey);
    verifyBearerTokenResult = await jose.JWS.createVerify(
      verifyBearerTokenKeystore
    ).verify(bearerToken);
  } catch (e) {
    console.error(e);
    return res.status(403).send("invalid bearer token");
  }

  if (!verifyBearerTokenResult) {
    return res.status(403).send("bearer token signature invalid");
  }

  res.send("Hello World!");
});

app.listen(3000);
