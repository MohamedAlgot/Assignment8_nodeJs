import express from "express";
import { connectDB } from "./db/connection.js";
import { authorsRouter, bookRouter, collectionRouter, logRouter}  from "./module/index.js";

const app =  express();
const port=3000;
connectDB();

app.use(express.json());
app.use("/",bookRouter);
app.use("/",authorsRouter);
app.use("/",collectionRouter);
app.use("/",logRouter);

app.listen(port,()=>{
    console.log("the port >>",port);
})