import { MongoClient } from "mongodb";


const client = new MongoClient("mongodb://127.0.0.1:27017");

export function connectDB() {
  client
    .connect()
    .then(() => {
      console.log("db connected successfully");
    })
    .catch((err) => {
      console.log("fail connected successfully", err.message);
    });
}

export const db= client.db("library");