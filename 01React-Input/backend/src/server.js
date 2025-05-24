import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4001;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  method: ["POST", "GET", "PUT", "DELETE"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));

export const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Welcome to my mern-app");
});

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fileds are required" });
      return;
    }

    console.log(req.body);

    const newUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });

    res.status(200).json({
      success: true,
      message: "Register Successfully",
      user: {
        userId: newUser.id,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.log("Error in user register controller");
    res.status(500).json({ message: "imternal server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
