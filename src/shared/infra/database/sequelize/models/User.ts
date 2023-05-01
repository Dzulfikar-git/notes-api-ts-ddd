import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'users',
  indexes: [
    {
      unique: true,
      fields: ['username'],
    },
  ],
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: String;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: String;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;
}

export default User;
