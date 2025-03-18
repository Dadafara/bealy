
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index';

interface UserAttributes {
  id?: number;
  username: string;
  age?: number;
  email?: string;
  phone?: string;
  description?: string;
  profilePicture?: string;
  password: string;
  isPublic: boolean;
  role: 'user' | 'admin';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public age!: number;
  public email!: string;
  public phone!: string;
  public description!: string;
  public profilePicture!: string;
  public isPublic!: boolean;
  public password!: string; 
  public role!: 'user' | 'admin';



  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model with attributes and options
User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  sequelize,
  modelName: 'User',  // Model name
  timestamps: true,   // Enable timestamps (createdAt, updatedAt)
});

export default User;

