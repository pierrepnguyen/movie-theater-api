const express = require("express");
const usersRouter = require("./routes/users");
const showsRouter = require("./routes/shows");
const seed = require("./seed");

const app = new express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/shows", showsRouter);

const port = 3000;

app.listen(port, () => {
    seed();
    console.log("Server listening to port: " + port);
});