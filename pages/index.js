import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First MeetUp",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "New Road, Lekki, Lagos",
//     description: "The First Meet up",
//   },
//   {
//     id: "m2",
//     title: "A second MeetUp",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Palmgrove, Lekki, Lagos",
//     description: "The Second Meet up",
//   },
//   {
//     id: "m3",
//     title: "A Third MeetUp",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "New Road, Lekki, Lagos",
//     description: "The Third Meet up",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React MeetUps</title>
        <meta
          name="description"
          content="Browse a huge list of highly React Meetups !"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

//For Next Js to return a page without returning an empty page, getServerSideProps will do, however,
// it is will only run when the app is built for production use only.

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// For  Next Js to return a page without returning an empty page when the user visit the app for the first, we need a
//getStaticProps

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sha1dev1:Badmanthings567@sha1devcluster.kduyysl.mongodb.net/meetups?retryWrites=true&w=majority"
    );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // This is use update  the previous data set on the server should your data change
    revalidate: 10,
  };
}

export default HomePage;
