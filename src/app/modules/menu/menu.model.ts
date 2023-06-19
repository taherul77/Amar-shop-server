import { Schema, model } from "mongoose";
import IMenu from "./menu.interface";

const menuSchema = new Schema<IMenu>(
  {
    name: { type: String, required: true },
    recipe: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
  }
)

export const Menu = model<IMenu>('Menu', menuSchema)
