import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { AppError } from '../middleware/error.middleware';
import { RegisterBody, LoginBody, JwtPayload } from '../types';

const signToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined in environment');

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '7d') as `${number}${'s' | 'm' | 'h' | 'd'}`;
  return jwt.sign(payload, secret, { expiresIn });
};

export const registerUser = async (body: RegisterBody) => {
  const exists = await User.findOne({ email: body.email });
  if (exists) throw new AppError('Email already in use', 409);

  const user = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role ?? 'sales',
  });

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

export const loginUser = async (body: LoginBody) => {
  const user = await User.findOne({ email: body.email }).select('+password');
  if (!user) throw new AppError('Invalid email or password', 401);

  const valid = await user.comparePassword(body.password);
  if (!valid) throw new AppError('Invalid email or password', 401);

  const token = signToken({ id: user._id.toString(), role: user.role });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
