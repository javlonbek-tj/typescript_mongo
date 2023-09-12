import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new Schema(
  {
    email: { type: String, reuqired: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', function (next) {
  const user = this as UserDocument;
  if (!user.isModified) {
    return next();
  }
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  user.password = hashedPassword;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
