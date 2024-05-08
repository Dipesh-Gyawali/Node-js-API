const dbConnect = require("./mongodb");
const mongodb = require("mongodb");
const express = require("express");
const app = express();

app.use(express.json());
app.get("/", async (res, resp) => {
  let data = await dbConnect();
  data = await data.find().toArray();
  resp.send(data);
});

app.post("/", async (req, resp) => {
  let data = await dbConnect();
  let result = await data.insertOne(req.body);
  resp.send(result);
});

app.put("/:name", async (req, resp) => {
  console.warn(req.body);
  let data = await dbConnect();
  let result = await data.updateOne(
    { name: req.params.name },
    { $set: req.body }
  );
  resp.send({ status: "updated" });
});

app.delete("/:id", async (req, resp) => {
  console.log(req.params.id);
  const data = await dbConnect();
  const result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  resp.send({ result: "delete vo" });
});

app.listen(5173);
