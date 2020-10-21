import express from 'express';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', getAllProducts);

router.get('/:id', getProduct);

router.put('/:id', isAuth, isAdmin, updateProduct);

router.delete('/:id', isAuth, isAdmin, deleteProduct);

router.post('/', isAuth, isAdmin, createProduct);

const getAllProducts = async (req, res) => {
	const category = req.query.category ? { category: req.query.category } : {};
	const searchKeyword = req.query.searchKeyword
		? {
				name: {
					$regex: req.query.searchKeyword,
					$options: 'i'
				}
			}
		: {};
	const sortOrder = req.query.sortOrder
		? req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 }
		: { _id: -1 };
	const products = await Product.find({ ...category, ...searchKeyword }).sort(sortOrder);
	res.send(products);
};

const getProduct = async (req, res) => {
	const product = await Product.findOne({ _id: req.params.id });
	product ? res.send(product) : res.status(404).send({ message: 'Product Not Found.' });
};

const createProduct = async (req, res) => {
	const { productData } = req.body;
	const product = new Product(productData);
	const newProduct = await product.save();
	newProduct
		? res.status(201).send({ message: 'New Product Created', data: newProduct })
		: res.status(500).send({ message: ' Error in Creating Product.' });
};

const deleteProduct = async (req, res) => {
	const deletedProduct = await Product.findById(req.params.id);
	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({ message: 'Product Deleted' });
	} else {
		res.send('Error in Deletion.');
	}
};

const updateProduct = async (req, res) => {
	const { id: productId } = req.params;
	const product = await Product.findById(productId);
	if (product) {
		product.name = req.body.name;
		product.price = req.body.price;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.countInStock = req.body.countInStock;
		product.description = req.body.description;
		const updatedProduct = await product.save();
		if (updatedProduct) {
			return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
		}
	}
	return res.status(500).send({ message: ' Error in Updating Product.' });
};

export default router;
