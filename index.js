const express = require("express");
const PORT = 8000;

const app = express();
app.use(express.json());

const eventRouter = require("./routes/event")
const transactionRouter = require("./routes/transaction")
require("dotenv").config({
  path: __dirname + "/.env",
});
const authRouter = require("./routes/auth")
const myTicketRouter = require("./routes/myticket")


// Routing
app.use("/event", eventRouter )
app.use("/purchase", transactionRouter)
app.use("/auth", authRouter)
app.use("/myticket", myTicketRouter)


// 404 middleware
app.use((req, res) => {
  console.log(`404: ${req.url}`);
  res.status(404).json({
    msg: "NOT FOUND",
  });
});

// Error middleware handler
app.use((err, req, res) => {
  console.log(`500: ${res.url}`);
  console.log(err);
  res.status(500).json({
    msg: "FATAL ERROR",
    err,
  });
});

app.listen(PORT, () => {
  console.log(`application start on port ${PORT}`);
});
