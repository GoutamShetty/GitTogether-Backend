// snippet-start:[ses.JavaScript.createclientv3]
const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: "AKIA6HNODKGSQNPYI2H2",
    secretAccessKey: "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",
  },
});
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]
