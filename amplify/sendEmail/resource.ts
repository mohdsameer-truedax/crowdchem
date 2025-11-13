import { defineFunction } from "@aws-amplify/backend";

export const sendEmail = defineFunction({
  name: "sendEmail",
  entry: "./handler.ts"
});