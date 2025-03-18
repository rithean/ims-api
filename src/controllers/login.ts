import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from "@/utils/generateJWT";

export const authorizeUser = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    let existingUser = null;
    if (email) {
      existingUser = await db.user.findUnique({
        where: {
          email,
        },
      });
    }

    if (username) {
      existingUser = await db.user.findUnique({
        where: {
          username,
        },
      });
    }

    if (!existingUser) {
      res.status(404).json({
        error: "User not found",
        data: null,
      });

      return;
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      res.status(403).json({
        error: "Wrong Crendentials",
        data: null,
      });
    }

    // Destructure out the password from the existing user

    const { password: userPass, ... userWithoutPassword } = existingUser;

    const accessToken = generateAccessToken(userWithoutPassword);

    const result = {
      ...userWithoutPassword,
      accessToken
    }
  
    res.status(200).json({
      data: result,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
};
