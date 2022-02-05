const express = require("express");
const app = express();

// Utils
const checkPoll = require("./utils/novosibirsk");

// Check Poll
app.get("/checkpoll", async (req, res) => {
    const { pollNumber } = req.query;
    await checkPoll(pollNumber);
    return true;
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Started Server on port ${process.env.PORT || 3000}`);
});