import express from "express";
import { UserRouter } from "./routers/UserRouter";

// let isConnect = false;
const app = express();
const port = 3000;
app.use(express.json());
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log("server start at: localhost/3000");
});
