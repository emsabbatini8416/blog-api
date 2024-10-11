import { Schema, model } from "mongoose";
import type { IReport } from "../interface/report.interface";

const reportSchema = new Schema<IReport>({
  itemId: { type: Schema.Types.ObjectId, ref: "Item" },
  quantity: { type: Number },
});

export default model<IReport>("Report", reportSchema);
