import "dotenv/config";
import express from "express";
import routes from "./routes";
import errorHandler, { defaultRouteHandler } from "./errors/handlers";

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use(defaultRouteHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});
