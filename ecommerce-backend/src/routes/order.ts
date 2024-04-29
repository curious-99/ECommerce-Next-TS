import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from '../controllers/order.js';

const app = express();

// Using Routes - api/v1/order/
app.post('/new', newOrder);
app.get('/my', myOrders);
app.get('/all',  allOrders);
app
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);


export default app;