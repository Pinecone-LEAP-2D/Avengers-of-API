import express from "express";
import { UserRouter } from "./routers/UserRouter";
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log("server start at: localhost/3000");
});
