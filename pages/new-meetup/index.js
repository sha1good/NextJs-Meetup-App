import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";

function NewMeetUpPage() {
  const router = useRouter();
  async function addNewMeetupHandler(expectedMeetupData) {
    //console.log(expectedMeetupData);
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(expectedMeetupData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      response.status === 201 && router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return <NewMeetUpForm onAddMeetup={addNewMeetupHandler} />;
}

export default NewMeetUpPage;
