import { db } from "@/db/db";
import { Request, Response } from "express";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    const exisitingSlug = await db.brand.findUnique({
        where: {
            slug
        }
    })

    if (exisitingSlug) {
        res.status(409).json({
            error: `Brand ${name} already exist`,
            data: null
        })
    }

    const newBrand = await db.brand.create({
        data: {
            name,
            slug
        }
    })

    res.status(201).json({
        data: newBrand,
        error: null
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: brands,
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

export const getSingleBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brand = await db.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      res.status(404).json({
        error: "Brand does not exist.",
        data: null,
      });
    }

    res.status(200).json({
      data: brand,
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

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const brand = await db.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      res.status(404).json({
        error: "Brand not found",
        data: null,
      });
    }

    const exisitingSlug = await db.brand.findUnique({
      where: {
        slug,
      },
    });

    if (exisitingSlug) {
      res.status(409).json({
        error: `Brand ${name} already taken`,
        data: null,
      });
    }

    const updatedBrand = await db.brand.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    });

    res.status(200).json({
      data: updatedBrand,
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

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brand = await db.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      res.status(404).json({
        error: "Brand does not exist",
        data: null,
      });
    }

    await db.brand.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `Brand with ID ${id} has been deleted successfully`,
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
