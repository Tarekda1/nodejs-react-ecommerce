import express from "express";
import data from "./data/data";
import qs from "qs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//define apis
app.get("/api/cart", (req, res) => {
  const cartItems = data.cartDetails;
  const fullDataCartItem = cartItems.map((item) => {
    const product = data.products.find((p) => p._id == item.productId);
    const cartItem = {
      productId: item.productId,
      name: product.name,
      price: product.price,
      qty: item.qty,
      countInStock: product.countInStock,
      image: product.image,
    };
    return cartItem;
  });
  //console.log(JSON.stringify(fullDataCartItem));
  res.status(200).json(fullDataCartItem);
});

//add a cart
app.post("/api/cart", async (req, res) => {
  console.log(req.body);
  const { productId, qty } = req.body;
  const productIdIndex = data.cartDetails.findIndex(
    (c) => c.productId == productId
  );
  if (productIdIndex > -1) {
    //update already existing product id
    data.cartDetails.map((c) =>
      c.productId == productId ? { productId, qty } : c
    );
  } else {
    const cartItems = [...data.cartDetails, { productId, qty }];
  }
  await sleep(5000);
  res.status(200).json({ response: 1 });
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p._id == req.params.id);
  const query = qs.parse(req.query);
  console.log(req.query);
  if (product) {
    if (data.cartDetails.findIndex((c) => c.productId == product._id) > -1) {
      product.itemInCart = true;
    } else {
      product.itemInCart =
        query.itemInCart &&
        query.itemInCart != undefined &&
        query.itemInCart != "undefined";
    }
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
