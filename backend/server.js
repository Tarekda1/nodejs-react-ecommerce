import express from "express";
import data from "./data/data";

const PORT = 5000;

const app = express();

//define apis
app.get("/api/products", (req, res) => {
  res.status(200).json(data);
});

app.get("/api/products/:id", (req, res) => {
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
