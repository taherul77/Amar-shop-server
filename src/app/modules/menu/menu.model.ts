import { Schema, model } from "mongoose";
import IMenu from "./menu.interface";

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    description: { type: String },
    rate: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount_price:{ type:Number,required: true},
  }
)

export const Menu = model<IMenu>('Menu', menuSchema)
