import { Document, Schema } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
  itemId: Schema.Types.ObjectId;
}