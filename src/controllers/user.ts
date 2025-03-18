import { db } from "../db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const {
    email,
    username,
    password,
    firstName,
    lastName,
    phone,
    dob,
    gender,
    image,
  } = req.body;
  try {
    // Check if the User already exists (email, username, phoone)
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });
    const existingUserByPhone = await db.user.findUnique({
      where: {
        phone,
      },
    });
    if (existingUserByEmail) {
      res.status(409).json({
        error: `Email already taken`,
        data: null,
      });
    }
    if (existingUserByUsername) {
      res.status(409).json({
        error: `username already taken`,
        data: null,
      });
    }
    if (existingUserByPhone) {
      res.status(409).json({
        error: "Phone already taken",
        data: null,
      });
    }

    // Hashed Password
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image: image
          ? image
          : "https://utfs.io/f/c61ec63c-42b1-4939-a7fb-ed04d43e23ee-2558r.png",
      },
    });

    const { password: savedPassword, ...others } = newUser;

    res.status(201).json({
      data: others,
      error: null,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Internal Server Error",
      data: null,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, role, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong.",
      data: null,
    });
  }
};

export const getAttendants = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        role: "ATTENDANT",
      },
    });
    const filteredUsers = users.map((user) => {
      const { password, ...others } = user;
      return others;
    });
    res.status(200).json({
      data: filteredUsers,
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

export const getSignleUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const users = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!users) {
      res.status(404).json({ error: "User not found", data: null });
      return;
    }

    const { password, ...result } = users;

    res.status(200).json({
      data: result,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: null,
    });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username, firstName, lastName, phone, dob, gender, image } =
    req.body;

  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      res.status(404).json({
        data: null,
        error: "User not found",
      });
    }

    const existingEmail = await db.user.findUnique({
      where: { email },
    });
    const existingUsername = await db.user.findUnique({
      where: { username },
    });
    const existingPhone = await db.user.findUnique({
      where: { phone },
    });

    if (existingEmail && existingEmail.id !== id) {
      res.status(409).json({ error: "Email already taken", data: null });
    }
    if (existingUsername && existingUsername.id !== id) {
      res.status(409).json({ error: "Username already taken", data: null });
    }
    if (existingPhone && existingPhone.id !== id) {
      res.status(409).json({ error: "Phone number already taken", data: null });
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        email,
        username,
        firstName,
        lastName,
        phone,
        dob,
        gender,
        image,
      },
    });

    const { password, ...others } = updatedUser;
    res.status(200).json({
      data: others,
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

export const updateUserPasswordById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      res.status(400).json({
        data: null,
        error: "Password is required",
      });
      return;
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user || !user.password) {
      res.status(404).json({
        data: null,
        error: "User not found",
      });
      return;
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      res.status(400).json({
        data: null,
        error: "New password must be different from the old password",
      });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const updatedUser = await db.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    const { password: _, ...others } = updatedUser;

    res.status(200).json({
      data: others,
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

export const updateUserRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const users = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!users) {
      res.status(404).json({
        error: "User not found",
        data: null,
      });
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    res.status(200).json({
      data: updatedUser,
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
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).json({
        data: null,
        error: "User not found",
      });
    }
    await db.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      data: `User with ID ${id} has been deleted successfully.`,
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
