import { db } from "../../db/connection.js"

 export const creatLog=async (data)=>{
return db.collection("logs").insertOne(data);
}