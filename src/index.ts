import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Hello World",
  });
});

app.get("/customers", (req: Request, res: Response) => {
  const customers = [
    { name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
    {
      name: "Joel Smith",
      email: "joel.smith@example.com",
      phone: "+0987654321",
    },
  ];

  return res.status(200).json(customers);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
