// models/Decision.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Category } from "./Category";

@Table({ tableName: "decisions", timestamps: false })
export class Decision extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

    @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  outcome!: string;

    @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  confidence!: string;

    @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  importance!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id!: string;

  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  category_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Category)
  category!: Category;
}