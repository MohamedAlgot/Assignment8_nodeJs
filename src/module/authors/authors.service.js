import { db } from "../../db/connection.js";


export const creatauthors=async(data)=>{
    const book=await db.collection("authors").insertOne(data);
    return book;
}