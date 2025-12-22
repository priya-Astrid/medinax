import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../src/models/auth.model';
import { Role } from '../src/models/role.model';
dotenv.config();
const createSuperAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing ');
    }
    if (!process.env.SUPERADMIN_EMAIL || !process.env.SUPERADMIN_PASSWORD) {
      throw new Error('SuperAdmin credentials are missing in env');
    }

    await mongoose.connect(process.env.MONGO_URI);

    let role = await Role.findOne({ role: 'superadmin' });
    if (!role) {
      role = await Role.create({ role: 'superadmin' });
      console.log('Role created: superadmin');
    }
    const existing = await User.findOne({
      email: process.env.SUPERADMIN_EMAIL,
    });
    if (!existing) {
      const hashedPassword= await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 12);
      await User.create({
        firstname: 'Super',
        lastname: 'Admin',
        email: process.env.SUPERADMIN_EMAIL,
        password: hashedPassword,
        role: role._id,
      });
      console.log('Superadmin created successfully');
    } else {
      console.log('superadmin already exists');
    }

    process.exit(0);
  } catch (error) {
    console.log('Error create super Admin', error);
    process.exit(1);
  }
};
createSuperAdmin();
