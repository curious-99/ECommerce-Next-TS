import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { SearchRequestQuery } from "../types/types.js";
// import { faker } from "@faker-js/faker";

export const newProduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const {name, category, price, stock} = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400));

  await Product.create({
      name,
      category: category.toLowerCase(),
      price,
      stock,
      photo: photo?.path
    })
  
    return res.status(201).json({
      status: "success",
      message: "Product created successfully"
    });
});

export const getLatestProducts = TryCatch(async (req,res,next) => {
  const products = await Product.find().sort({createdAt: -1}).limit(5);
  return res.status(200).json({
    status: "success",
    message: "Latest products",
    products
  });
});

export const getAllCategories = TryCatch(async (req,res,next) => {
  const categories = await Product.distinct("category");
  return res.status(200).json({
    status: "success",
    message: "All categories",
    categories
  });
});

export const getAdminProducts = TryCatch(async (req,res,next) => {
  const products = await Product.find();
  return res.status(200).json({
    status: "success",
    message: "All products",
    products
  });
});

export const getSingleProducts = TryCatch(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product) return next(new ErrorHandler("Product not found", 404));
  return res.status(200).json({
    status: "success",
    message: "Product found",
    product
  });
})

export const updateProduct = TryCatch( async (req,res,next) => {
  const {id} = req.params;
  const {name, category, price, stock} = req.body;
  const photo = req.file;

  const product= await Product.findById(id);
  if(!product) return next(new ErrorHandler("Product not found", 404));

  if(photo){
    rm(product.photo, (err) => {
      console.log("Deleted old photo");
      // if(err) return next(new ErrorHandler("Something went wrong", 500));
    });
    product.photo = photo.path;
  }

  if(name) product.name = name;
  if(category) product.category = category.toLowerCase();
  if(price) product.price = price;
  if(stock) product.stock = stock;

  await product.save();

  return res.status(200).json({
    status: "success",
    message: "Product updated successfully"
  });
});

export const deleteProducts = TryCatch(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product) return next(new ErrorHandler("Product not found", 404));

  rm(product.photo, () => {
    console.log("Deleted photo");
  });
  await Product.deleteOne();
  return res.status(200).json({
    status: "success",
    message: "Product deleted successfully"
  });
})

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);

// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads/27696450-c5fe-4085-8e25-573db5895140.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };

// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(4);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };

// generateRandomProducts(40);