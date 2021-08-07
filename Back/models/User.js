import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  banned: {
    type: Boolean,
    required: true,
    default: false
  },
  validated: {
    type: Boolean,
    required: true,
    default: false
  },
  role: {
    type: Number,
    required: true,
    default: 2
  }
})

UserSchema.statics.authenticate = async function (email, password) {
  try {
    const user = await Users.findOne({ email: email })
    if (!user) {
      throw "User not found"
    }
    const comp = await bcrypt.compare(password, user.password)
    if (!comp) {
      throw "Passwords do not match"
    } else {
      return user
    }
  } catch (err) {
    throw err
  }
}


UserSchema.pre('save', async function (next) {
  let user = this;
  try {
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
  } catch (err) {
    return next(err)
  }
})

const Users = mongoose.model('Users', UserSchema)

export default Users
