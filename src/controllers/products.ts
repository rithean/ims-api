import { db } from "@/db/db";
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      batchNumber,
      barCode,
      image,
      tax,
      alertQty,
      stockQty,
      price,
      buyingPrice,
      sku,
      productCode,
      slug,
      supplierId,
      unitId,
      brandId,
      categoryId,
      expiryDate,
    } = req.body;

    const exisitingProductByBarCode = await db.product.findUnique({
      where: {
        barCode,
      },
    });

    const exisitingProductBySku = await db.product.findUnique({
      where: {
        sku,
      },
    });

    const exisitingProductByProductCode = await db.product.findUnique({
      where: {
        productCode,
      },
    });

    const exisitingProductBySlug = await db.product.findUnique({
      where: {
        slug,
      },
    });

    if (exisitingProductByBarCode) {
      res.status(409).json({
        error: `Product Barcode ${barCode} already exist`,
        data: null,
      });
    }

    if (exisitingProductBySku) {
      res.status(409).json({
        error: `Product SKU ${sku} already exist`,
        data: null,
      });
    }

    if (exisitingProductByProductCode) {
      res.status(409).json({
        error: `Produc Product Code ${productCode} already exist`,
        data: null,
      });
    }

    if (exisitingProductBySlug) {
      res.status(409).json({
        error: `Product Slug ${slug} already exist`,
        data: null,
      });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description,
        batchNumber,
        barCode,
        image,
        tax,
        alertQty,
        stockQty,
        price,
        buyingPrice,
        sku,
        productCode,
        slug,
        supplierId,
        unitId,
        brandId,
        categoryId,
        expiryDate,
      },
    });

    res.status(201).json({
      data: newProduct,
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

export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: product,
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

export const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).json({
        error: "Product does not exist.",
        data: null,
      });
    }

    res.status(200).json({
      data: product,
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      batchNumber,
      barCode,
      image,
      tax,
      alertQty,
      stockQty,
      price,
      buyingPrice,
      sku,
      productCode,
      slug,
      supplierId,
      unitId,
      brandId,
      categoryId,
      expiryDate,
    } = req.body;

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).json({
        error: "Product not found",
        data: null,
      });
    }

    const exisitingBarcode = await db.product.findUnique({
      where: {
        barCode,
      },
    });

    const exisitingSku = await db.product.findUnique({
      where: {
        sku,
      },
    });

    const exisitingProductCode = await db.product.findUnique({
      where: {
        productCode,
      },
    });

    const exisitingSlug = await db.product.findUnique({
      where: {
        slug,
      },
    });

    if (exisitingBarcode) {
      res.status(409).json({
        error: `Product Barcode ${barCode} already taken`,
        data: null,
      });
    }

    if (exisitingSku) {
      res.status(409).json({
        error: `Product Sku ${sku} already taken`,
        data: null,
      });
    }

    if (exisitingProductCode) {
      res.status(409).json({
        error: `Product ProductCode ${productCode} already taken`,
        data: null,
      });
    }

    if (exisitingSlug) {
      res.status(409).json({
        error: `Product Slug ${slug} already taken`,
        data: null,
      });
    }

    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        batchNumber,
        barCode,
        image,
        tax,
        alertQty,
        stockQty,
        price,
        buyingPrice,
        sku,
        productCode,
        slug,
        supplierId,
        unitId,
        brandId,
        categoryId,
        expiryDate,
      },
    });

    res.status(200).json({
      data: updatedProduct,
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      res.status(404).json({
        error: "Product does not exist",
        data: null,
      });
    }

    await db.product.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: `Product with ID ${id} has been deleted successfully`,
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
