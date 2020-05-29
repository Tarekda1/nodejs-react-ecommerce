import express from "express";
import data from "./data/data";
import cors from "cors";
import qs from "qs";
import config from "./config";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PORT = 5000;

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fillCartDetails = (cartItems) => {
  return cartItems.map((item) => {
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
};

//define apis
app.get("/api/cart", (req, res) => {
  const cartItems = data.cartDetails;
  const fullDataCartItem = fillCartDetails(cartItems);
  //console.log(JSON.stringify(fullDataCartItem));
  res.status(200).json({ cartItems: fullDataCartItem, itemId: 0 });
});

//add a cart
app.post("/api/cart", async (req, res) => {
  console.log(req.body);
  const { productId, qty } = req.body;
  const productIdIndex = data.cartDetails.findIndex(
    (c) => c.productId == productId
  );
  let cartItems;
  if (productIdIndex > -1) {
    //update already existing product id
    cartItems = data.cartDetails.map((c) =>
      c.productId == productId ? { productId, qty } : c
    );
  } else {
    cartItems = [...data.cartDetails, { productId, qty }];
  }
  await sleep(3000);
  const fullDataCartItem = fillCartDetails(data.cartDetails);
  res.status(200).json({ cartItems: fullDataCartItem, itemId: productId });
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

app.delete("/api/cart/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(JSON.stringify(req.params));
  const filtered = data.cartDetails.filter(
    (c) => Number(c.productId) !== Number(productId)
  );
  const fullDataCartItem = fillCartDetails(filtered);
  await sleep(3000);
  res.status(200).json({ cartItems: fullDataCartItem, itemId: productId });
});

app.get("/api/products", (req, res) => {
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
