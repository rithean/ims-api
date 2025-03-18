import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import userRoute from "./routes/user";
import shopRoute from "./routes/shop";
import customerRoute from "./routes/customer";
import supplierRoute from "./routes/supplier";
import authRoute from "./routes/login";
import unitRoute from "./routes/units";
import brandRoute from "./routes/brand";
import categoryRoute from "./routes/categories";
import productRoute from "./routes/product";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", userRoute);
app.use("/api/v1", shopRoute);
app.use("/api/v1", customerRoute);
app.use("/api/v1", supplierRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", unitRoute);
app.use("/api/v1", brandRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", productRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
