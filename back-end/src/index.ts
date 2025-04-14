import express from "express";
import { UserRouter } from "./routers/UserRouter";
const cors = require("cors");
import { LoginUserRouter } from "./routers/LoginUserRouter";
import { ProfileRouter } from "./routers/ProfileRouter";
import dotenv from "dotenv";
import { BankRouter } from "./routers/BankCardRouter";
import { DonationRouter } from "./routers/DonationRouter";
import { EditProfileRouter } from "./routers/EditProfileRouter";
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
app.use("/bank", BankRouter);
app.use("/donation", DonationRouter);
app.use("/profile", EditProfileRouter);

app.listen(port, () => {
  console.log("server start at: http://localhost/3000");
});
