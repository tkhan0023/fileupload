const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const createProduct = async(req,res)=>{
//    res.send('create Product') 
const product = await Product.create(req.body);
res.status(StatusCodes.CREATED).json( {product} )

};
const getAllProducts = async(req,res) =>{
    res.send('List of products')
};
module.exports ={
    createProduct,
    getAllProducts
}