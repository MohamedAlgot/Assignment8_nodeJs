import { db } from "../../db/connection.js";



export const cappedCollection=async(name)=>{
    const collections=await db.listCollections({name}).toArray();
    if (collections.length===0) {
        await db.createCollection(name,{capped:true,size:1048576 });
    }
    return collections;
}