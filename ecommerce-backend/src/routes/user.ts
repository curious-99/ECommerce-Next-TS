import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user.js';

const app = express();

// Using Routes - api/v1/user/new
app.post('/new', newUser);

// Using Routes - api/v1/user/all
app.get('/all', getAllUsers);

// Using Routes - api/v1/user/dynamicID
app.route('/:id').get(getUser).delete(deleteUser);

export default app;