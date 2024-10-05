import Product from '../Models/product.js';

// add product
export const addProduct = async (req, res) => {
    const { title, discription, price, catorgory, qty, imgsrc } = req.body;
    try {
        let product = await Product.create({ title, discription, price,catorgory, qty, imgsrc });
        res.json({ message: "Product added successfully", product });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// get products
export const getProducts = async (req, res) => {
    try {
        let products = await Product.find().sort({ createAt: -1 }); // Use the Product model
        res.json({ message: 'All products', products });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// get product by id
export const getProductsById = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id); // Use the Product model
        if (!product) {
            return res.json({ message: 'Product not found' });
        }
        res.json({ message: 'Product by id is', product }); // Corrected typo
    } catch (error) {
        res.json({ message: error.message });
    }
};

// update product
export const updateProductByid = async (req, res) => {
let product = await Product.findByIdAndUpdate(req.params.id ,req.body,{new:true});
if (!product) {
    return res.json({ message: 'Product not found' });
}
res.json({ message: 'Product updated successfully', product });

}
//delete product
export const deleteProduct = async (req, res) => {
    try{
        let product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.json({ message: 'Product not found' });
    }  
    res.json({ message: 'Product deleted successfully', product });
    } 
    catch(error){
        res.json({ message:"the given id is invalid" });
    }
}