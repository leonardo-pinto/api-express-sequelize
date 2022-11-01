import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class User extends Model {
    public email!: string
    public username!: string
    public password!: string
    public firstName!: string
    public lastName!: string
    public role!: string
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email address'
          }
        }
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [3, 100],
            msg: 'Username must contain between 3 and 100 characters'
          }
        }
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: {
            args: [5, 100],
            msg: 'Password must contain between 5 and 100 characters'
          }
        }
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'First name must contain between 3 and 50 characters'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must contain between 3 and 50 characters'
          }
        }
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Users'
    }
  )
}