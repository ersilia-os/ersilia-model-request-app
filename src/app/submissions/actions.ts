"use server";

import { userData } from "./mock-data";

export async function getSubmissionsByUser(sid: string) {
  //mocking the db request
  console.log(sid);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return userData.submissions;
}
