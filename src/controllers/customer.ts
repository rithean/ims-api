import { db } from "@/db/db";
import { Request, Response } from "express";

export const createCustomer = async (req: Request, res: Response) => {
  const {
    customerType,
    firstName,
    lastName,
    phone,
    gender,
    maxCreditLimit,
    maxCreditDays,
    taxPin,
    dob,
    email,
    nationalId,
    country,
    location,
  } = req.body;
  try {
    const existingEmail = await db.customer.findUnique({
      where: {
        email,
      },
    });
    const existingPhone = await db.customer.findUnique({
      where: {
        phone,
      },
    });
    const existingNid = await db.customer.findUnique({
      where: {
        nationalId,
      },
    });

    if (existingEmail) {
      res.status(409).json({
        error: "Email already taken",
        data: null,
      });
    }

    if (existingPhone) {
      res.status(409).json({
        error: "Phone already taken",
        data: null,
      });
    }

    if (existingNid) {
      res.status(409).json({
        error: "National ID already taken",
        data: null,
      });
    }

    const newCustomer = await db.customer.create({
      data: {
        customerType,
        firstName,
        lastName,
        phone,
        gender,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dob,
        email,
        nationalId,
        country,
        location,
      },
    });

    res.status(200).json({
      data: newCustomer,
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

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!customers) {
      res.status(404).json({
        error: "Customer does not exist",
        data: null,
      });
    }

    res.status(200).json({
      data: customers,
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

export const getSingleCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      res.status(404).json({
        error: "Customer not found",
        data: null,
      });
    }

    res.status(200).json({
      data: customer,
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
