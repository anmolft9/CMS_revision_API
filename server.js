import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

const PORT = process.env.PORT || 8000;

///middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "got it",
  });
});

//apis
import adminUserRouter from "./src/routers/adminUserRouter.js";

app.use("/api/v1/admin-user", adminUserRouter);

app.use((error, res, req, next) => {
  console.log(error);
  const statusCode = error.status || 404;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`server running at: http://localhost:${PORT}`);
});
