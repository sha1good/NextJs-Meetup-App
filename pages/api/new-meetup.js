import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://sha1dev1:Badmanthings567@sha1devcluster.kduyysl.mongodb.net/meetups?retryWrites=true&w=majority"
    );

   // console.log(client.isConnected());
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    //const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "MeetUps Inserted Successfully!" });
  }
}

export default handler;
