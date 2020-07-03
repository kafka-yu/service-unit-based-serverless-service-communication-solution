import { ServiceUnits } from ".";

async () => {
  const { isSuccess, data, error } = await ServiceUnits.meeting.schedule({
    title: "hello",
    date: new Date(),
  });

  if (!isSuccess || !data) {
    console.log("error", error);
  }

  console.log(data.url);
};
