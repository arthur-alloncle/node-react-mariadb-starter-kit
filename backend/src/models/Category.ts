// models/Category.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Decision } from "./Decision";

@Table({ tableName: "categories", timestamps: false })
export class Category extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  display_name!: string;

  @HasMany(() => Decision)
  decisions!: Decision[];
}
