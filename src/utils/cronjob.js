const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModal = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

cron.schedule("0 0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModal.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      const res = await sendEmail.run(
        "New Friend Requests pending for" +
          email +
          "There are so many Friend Requests pending, please login to GitTogether."
      );
    }
  } catch (err) {
    console.log(err);
  }
});
