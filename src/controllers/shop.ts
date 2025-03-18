import { db } from "@/db/db";
import { log } from "console";
import e, { Request, Response } from "express";

export const createShop = async (req: Request, res: Response) => {
  try {
    const { name, slug, location, adminId, attendantIds } = req.body;
    const existingShop = await db.shop.findUnique({
      where: {
        slug,
      },
    });
    if (existingShop) {
      res.status(409).json({
        error: `Shop (${name}) is already existing.`,
        data: null,
      });
    }
    const newShop = await db.shop.create({
      data: {
        name,
        slug,
        location,
        adminId,
        attendantIds,
      },
    });
    res.status(201).json({
      data: newShop,
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

export const getShops = async (req: Request, res: Response) => {
  const shops = await db.shop.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({
    data: shops,
    error: null,
  });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
      data: null,
    });
  }
};


export const getSinlgeShop = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const shop = await db.shop.findUnique({
      where: {
        id,
      },
    });

    if (!shop) {
      res.status(404).json({
        error: "Shop not found",
        data: null,
      });
    }

    res.status(200).json({
      data: shop,
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

export const getShopAttendants = async (req: Request, res: Response) => {
  const { shopId } = req.params;
  try {
    const existingShop = await db.shop.findUnique({
      where: {
        id: shopId,
      },
    });

    if (!existingShop) {
      res.status(404).json({
        data: null,
        error: "Shop does not exits.",
      });
    }

    const attendants = await db.shop.findMany({
      where: {
        id: {
          in: existingShop?.attendantIds,
        },
      },
    });

    res.status(200).json({
      data: attendants,
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
