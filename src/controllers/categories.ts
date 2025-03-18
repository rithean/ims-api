import { db } from "@/db/db";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug } = req.body;

    const exisitingSlug = await db.category.findUnique({
        where: {
            slug
        }
    })

    if (exisitingSlug) {
        res.status(409).json({
            error: `Category ${name} already exist`,
            data: null
        })
    }

    const newCategory = await db.category.create({
        data: {
            name,
            slug
        }
    })

    res.status(201).json({
        data: newCategory,
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

export const getCategories = async (req: Request, res: Response) => {
  try {
    const category = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: category,
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

export const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      res.status(404).json({
        error: "Category does not exist.",
        data: null,
      });
    }

    res.status(200).json({
      data: category,
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      res.status(404).json({
        error: "Category not found",
        data: null,
      });
    }

    const exisitingSlug = await db.category.findUnique({
      where: {
        slug,
      },
    });

    if (exisitingSlug) {
      res.status(409).json({
        error: `Category ${name} already taken`,
        data: null,
      });
    }

    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data: {
        name,
        slug,
      },
    });

    res.status(200).json({
      data: updatedCategory,
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await db.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      res.status(404).json({
        error: "Category does not exist",
        data: null,
      });
    }

    await db.category.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `Category with ID ${id} has been deleted successfully`,
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
