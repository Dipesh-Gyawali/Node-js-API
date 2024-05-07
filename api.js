const dbConnect = require("./mongodb");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, resp) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  console.log(data);
  console.log("first");

  resp.send(data);
});

app.listen(5173);
