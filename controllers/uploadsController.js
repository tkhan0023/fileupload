const {StatusCodes} = require('http-status-codes')
const path = require('path')
const CustomError = require('../errors');
const { STATUS_CODES } = require('http');
const cloudinary  = require('cloudinary').v2
const fs  = require('fs')

const uploadProductImagelocal = async (req,res)=>{
   // console.log(req.files)
   //check if file exists , check format , check size
//   console.log(req.files)
   if(!req.files){
      throw new CustomError.BadRequestError('No file uploaded ')
   }
   const  productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')){
      throw new CustomError.BadRequestError('please upload image')
    }

    const maxSize =1000
    if(productImage.size>maxSize){
      throw new CustomError.BadRequestError('Please upload image smaller than 1 kB')
    }




   const imagePath = path.join(__dirname,
      '../public/uploads/'+`${productImage.name}`);
      await productImage.mv(imagePath);
   // res.send('upload product image') 
   return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
};
const uploadProductImage = async (req,res) =>{
//console.log(req.files.image)

const result = await cloudinary.uploader.upload(
   req.files.image.tempFilePath,{
   use_filename: true,
   folder: 'file-upload',
}
);
//console.log(result)
fs.unlinkSync(req.files.image.tempFilePath)
return res.status(StatusCodes.OK).json({image: {src: result.secure_url } });


}


module.exports ={
   uploadProductImage,
}