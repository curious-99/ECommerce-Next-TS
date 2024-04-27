import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { 
  deleteProducts,
  getAdminProducts,
  getAllCategories, 
  getAllProducts, 
  getLatestProducts, 
  getSingleProducts, 
  newProduct, 
  updateProduct
} from '../controllers/product.js';
import { singleUpload } from '../middlewares/multer.js';

const app = express();

//Using route: /api/v1/products
app.post('/new', adminOnly, singleUpload, newProduct);

// To get all products with filters 
app.get('/all', getAllProducts); 

app.get('/latest',getLatestProducts) ;
app.get('/categories',getAllCategories) ;
app.get('/admin-products',adminOnly, getAdminProducts);
app
  .route('/:id')
  .get(getSingleProducts)
  .put( adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProducts);

export default app;