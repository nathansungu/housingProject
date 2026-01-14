import express from "express";
import router from "./routes/index.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", router);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, (e) => {
  e ? console.log(e) : console.log(`app running on port ${port}`);
});
