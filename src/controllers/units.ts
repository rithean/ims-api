import { db } from "@/db/db";
import { Request, Response } from "express";

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { name, abbreviation, slug } = req.body;

    const existingUnit = await db.unit.findUnique({
      where: {
        slug,
      },
    });

    if (existingUnit) {
      res.status(409).json({
        error: `Unit ${name} is already existing`,
        data: null,
      });
    }

    const newUnit = await db.unit.create({
      data: {
        name,
        abbreviation,
        slug,
      },
    });

    res.status(201).json({
      data: newUnit,
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

export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await db.unit.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: units,
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

export const getSingleUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });

    if (!unit) {
      res.status(404).json({
        error: "Unit does not exist.",
        data: null,
      });
    }

    res.status(200).json({
      data: unit,
      error: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Smething went wrong",
      data: null,
    });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, abbreviation, slug } = req.body;

    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });

    if (!unit) {
      res.status(404).json({
        error: "Unit not found",
        data: null,
      });
    }

    const exisitingSlug = await db.unit.findUnique({
      where: {
        slug,
      },
    });

    if (exisitingSlug) {
      res.status(409).json({
        error: `Unit ${name} already exist`,
        data: null,
      });
    }

    const updatedUnit = await db.unit.update({
      where: {
        id,
      },
      data: {
        name,
        abbreviation,
        slug,
      },
    });

    res.status(200).json({
      data: updatedUnit,
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

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const unit = await db.unit.findUnique({
      where: {
        id,
      },
    });

    if (!unit) {
      res.status(404).json({
        error: "Unit does not exist",
        data: null,
      });
    }

    await db.unit.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `Unit with ID ${id} has been deleted successfully`,
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
