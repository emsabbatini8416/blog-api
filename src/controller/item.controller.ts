import { Request, Response } from "express";
import NotFoundError from "../errors/notFound.errors";
import InternalServerError from "../errors/internalServer.errors";
import { ErrorCode } from "../errors/custom.errors";
import { create, deleteById, geById, getAll, update } from "../service/item.service";
import { IItem } from "../interface/item.interface";

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await getAll();
    res.status(200).json({ items, success: true });
  } catch (error) {
    throw new InternalServerError("Failed to fetch items", ErrorCode.INTERNAL_SERVER);
  }
};

export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const item = await geById(id);
    if (!item) {
      throw new NotFoundError('Item not found', ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ item, success: true });
  } catch (error) {
    throw new InternalServerError(`Failed to fetch item with ID: ${id}`, ErrorCode.INTERNAL_SERVER);
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, description , quantity, purchased }: IItem = req.body;
  
  try {
    await create({ name, description, quantity, purchased });

    res.status(201).json({ message: "Item created successfully", success: true });
  } catch (error) {
    console.log(error)
    throw new InternalServerError("Failed to create item", ErrorCode.INTERNAL_SERVER);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { purchased }: Partial<IItem> = req.body;

  try {
    await update(id, { purchased })

    res.status(202).json({ message: "Item updated successfully", success: true });
  } catch (error) {
    throw new InternalServerError("Failed to create item", ErrorCode.INTERNAL_SERVER);
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteById(id);

    res.status(202).json({ success: true });
  } catch (error) {
    throw new InternalServerError(`Failed to delete item with ID: ${id}`, ErrorCode.INTERNAL_SERVER);
  }
};
