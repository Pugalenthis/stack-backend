import express from "express";;
import {MongoClient} from "mongodb";
import dotenv from "dotenv";


dotenv.config();

const app = express()

const PORT = process.env.PORT;

// app.use(cors())

app.listen(PORT,()=>{
    console.log("App is running successfully")
})

const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL)
console.log(PORT)

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo is connected")
    return client;
}

export const  client = await createConnection();


app.use(express.json());

app.get("/",  (req,res)=>{
    res.send("Hello Pugalenthi You can do anything in this world")
    
})

  app.get("/questions",async (req,res)=>{  

    const result = await client.db("b30wd").collection("stackoverflow").find({}).toArray();
    res.send(result);
  
  })

  //POST METHOD; - createOne

  app.post("/questions",async (req,res)=>{  

    const data = req.body;
    console.log(data)
    const result = await client.db("b30wd").collection("stackoverflow").insertOne(data);
    res.send(result);
  
  })




  




  






