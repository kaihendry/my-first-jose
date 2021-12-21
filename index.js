var express = require("express");

var app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", function (request, response) {
  // age in ten years
  //  try {
  console.log(request.body);
  older = request.body.human.age + 10;
  console.log(older);
  // response with 200 and older result
  response.status(200).json({ older });
  // } catch (error) {
  // respond with error description
  //   response.status(400).send(error.message);
  // }
});

app.listen(3000);
