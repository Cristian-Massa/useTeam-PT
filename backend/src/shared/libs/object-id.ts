import mongoose from 'mongoose';

export const objectId = (value: string) => {
  return new mongoose.Types.ObjectId(value);
};
