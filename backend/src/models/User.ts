// models/User.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Decision } from "./Decision";

@Table({ tableName: "users", timestamps: false })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date_of_birth!: Date;

    @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: Date;

  @HasMany(() => Decision)
  decisions!: Decision[];
}
