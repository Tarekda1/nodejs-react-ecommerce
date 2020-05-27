import express from "express";
import data from "./data/data";

const PORT = 5000;

const app = express();

//define apis
app.get("/api/cart", (req, res) => {
  res.status(200).json(data);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p._id == req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: "no product found" });
  }
});

app.get("/api/products", (req, res) => {
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
