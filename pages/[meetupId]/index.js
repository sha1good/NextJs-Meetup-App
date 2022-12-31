import { MongoClient, ObjectId } from "mongodb";

import MeetUpDetail from "../../components/meetups/MeetUpDetail";

function MeeetUpDetails(props) {
  return (
    <MeetUpDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://sha1dev1:Badmanthings567@sha1devcluster.kduyysl.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    
  };
}

export async function getStaticProps(context) {
  // fetch a request  for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://sha1dev1:Badmanthings567@sha1devcluster.kduyysl.mongodb.net/meetups?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetUps = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  //console.log(context.params);
  //console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: selectedMeetUps._id.toString(),
        title: selectedMeetUps.title,
        image: selectedMeetUps.image,
        address: selectedMeetUps.address,
        description: selectedMeetUps.description,
      },
    },
  };
}

export default MeeetUpDetails;
