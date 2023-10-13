import express from "express";
import UserRoutes from "./routes/User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";








const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use("/", UserRoutes);

app.listen("3000", (req, res) => {
  connect();
  console.log("Server is running on port 3000");
});


 /*MONGO=mongodb+srv://vishwassrivastava1991:APBE4dGX8xgCyagv@cluster0.htq3vjj.mongodb.net/?retryWrites=true&w=majority

JWT="DNFKVEFLVFVD" 

I KNOW ITS DANGEROUS TO  PASS DATABASE KEY IN OPEN (IN PRODUCTION) I HAVE MADE ENV FILE FOR IT BUT FOR YOUR ACCESS & TESTING I HAVE ADDED KEY HERE AS COMMENTS 

*/