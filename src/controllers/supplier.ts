import { db } from "@/db/db";
import { Request, Response } from "express";

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const {
      supplierType,
      name,
      contactPerson,
      phone,
      email,
      location,
      country,
      website,
      taxPin,
      registrationNumber,
      bankAccountNumber,
      paymentTerms,
      logo,
      rating,
      notes,
    } = req.body;

    const existingSupplierByPhone = await db.supplier.findUnique({
      where: {
        phone,
      },
    });

    const existingSupplierByEmail = await db.supplier.findUnique({
      where: {
        email,
      },
    });

    const existingSupplierByRnb = await db.supplier.findUnique({
      where: {
        registrationNumber,
      },
    });

    if (existingSupplierByPhone) {
      res.status(409).json({
        error: "Phone already taken",
        data: null,
      });
    }

    if (existingSupplierByEmail) {
      res.status(409).json({
        error: "Email already taken",
        data: null,
      });
    }

    if (existingSupplierByRnb) {
      res.status(409).json({
        error: "Registration Number already taken",
        data: null,
      });
    }

    const newSupplier = await db.supplier.create({
      data: {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        taxPin,
        registrationNumber,
        bankAccountNumber,
        paymentTerms,
        logo,
        rating,
        notes,
      },
    });

    res.status(201).json({
      data: newSupplier,
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

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const suppliers = await db.supplier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: suppliers,
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

export const getSingleSupplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const supplier = await db.supplier.findUnique({
      where: {
        id: id,
      },
    });

    if (!supplier) {
      res.status(404).json({
        error: "Supplier not found",
        data: null,
      });
    }

    res.status(200).json({
      data: supplier,
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
