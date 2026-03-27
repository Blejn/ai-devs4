import { sendResult } from "../../common/send-result";

export const submitAnswer = async (result: {
  name: string;
  surname: string;
  accessLevel: string;
  powerPlant: string;
}) => {
  const response = await sendResult("findhim", result);
  console.log(response);
  return response;
};
