import { QueryOptions, UpdateQuery } from "mongoose";
import { IItem } from "../interface/item.interface";
import ItemModel from "../model/item.model";

export async function getAll() {
  return await ItemModel.find();
}

export async function geById(id: string) {
  return await ItemModel.findById(id);
}

export async function create(itemData: Partial<IItem>) {
  const newItem = new ItemModel(itemData);
  return await newItem.save()
}

export async function update(id: string, itemData: UpdateQuery<Partial<IItem>>, options: QueryOptions = { new: true }) {
  return await ItemModel.findByIdAndUpdate(id, itemData, options);
}

export async function deleteById(id: string) {
  return await ItemModel.deleteOne({ _id: id });
}