import express  from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorHandler } from "./middlewares/error.js";

const port = 4000;
connectDB();

const app = express();
//Middlewares
app.use(express.json());   

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);


app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})