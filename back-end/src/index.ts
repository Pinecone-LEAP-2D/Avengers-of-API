import express from "express";
import { UserRouter } from "./routers/UserRouter";
import { LoginUserRouter } from "./routers/LoginUserRouter";
import { ProfileRouter } from "./routers/ProfileRouter";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use("/user", UserRouter);
app.use("/user", LoginUserRouter);
app.use("/profile", ProfileRouter);

app.listen(port, () => {
  console.log("server start at: localhost/3000");
});
