import { db } from "../../db/connection.js";
export const modelbooks = async () => {
  return db.createCollection("books", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title"],
        properties: {
          title: {
            bsonType: "string",
            minLength: 1,
            description: "title must be non-empty string  ",
          },
        },
      },
    },
  });
};

export const creatBooks=async(data)=>{
    const book=await db.collection("books").insertOne(data);
    return book;
}

export const createTitleIndex=async ()=>{
    const result= await db.collection("books").createIndex({title:1});
    return result;
}

export const inserManybooks= async(books)=>{
    const result= await db.collection("books").insertMany(books);
    return result;
}

export const updatBooks=async (filter,newdata)=>{
  const update=db.collection("books").updateOne(filter,{$set:newdata})
  return update;
}
export const findbooks=async (title)=>{
  return db.collection("books").findOne({title});
}

export const getBooks=async (filter)=>{
  return db.collection("books").findOne(filter);
}
export const findBooksByYearRange =async(from,to)=>{
  return await db.collection("books").find({year:{$gte:from,$lte:to}}).toArray()
}

export const findGenres=async (filter)=>{
  return db.collection("books").find(filter).toArray();
}

export const findYearIntger=async ()=>{
  return db.collection("books").find({year:{$type:"int"}}).toArray();
}

export const getBooksExcludeGenres = async () => {
  return await db.collection("books").find({
    genres: { $nin: ["Horror", "Science Fiction"] }
  }).toArray();
};

export const deleteBooksBeforeYear =async (year)=>{
  const del=await db.collection("books").deleteMany({year:{$lt:year}})
  return del;
}

export const aggregateBooksAfterYear =async (year)=>{
  return await db.collection("books").aggregate([
   {$match:{year:{$gt:year}}},
   {$sort:{year:-1}}
  ]).toArray();
}

export const aggregateBooksAfterYear2 =async (year)=>{
  return await db.collection("books").aggregate([
   {$match:{year:{$gt:year}}},
   {$sort:{year:-1}},
   {$project:{
    _id:0,
    title:1,
    author:1,
    year:1
   }}
  ]).toArray();
}

export const aggregateGenres = async () => {
  return await db.collection("books").aggregate([
    { $unwind: "$genres" },
    {
      $project: {
        _id: 0,
        title: 1,
        genre: "$genres"
      }
    }
  ]).toArray();
};


export const aggregateJoinBooksWithLogs = async () => {
  return await db.collection("books").aggregate([
    {
      $lookup: {
        from: "logs",         
        localField: "_id",     
        foreignField: "bookId",
        as: "logs"             
      }
    }
  ]).toArray();
};
