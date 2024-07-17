import { Schema, model } from 'mongoose';
import { IItem } from '../interface/item.interface';

const itemSchema = new Schema<IItem>({
  name: { 
    type: String,
  },
  description: { 
    type: String,
  },
  quantity: { 
    type: Number,
    min: [0, 'Age cannot be negative'],
  },
  purchased: { 
    type: Boolean,
  }
}, { timestamps: true });
export default model<IItem>('Item', itemSchema);