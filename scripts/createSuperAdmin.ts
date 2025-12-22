import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../src/models/auth.model';
import { Role } from '../src/models/role.model';
dotenv.config();
const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');

    let role = await Role.findOne({ role: 'superadmin' });
    if(!role) {
      role = await Role.create({ role: 'superadmin' });
      console.log('Role created: superadmin');
    }
    const existing = await User.findOne({ email: 'superadmin@hospital.com' });
    if (!existing) {
      const hashed = await bcrypt.hash('Super@123', 10);
      await User.create({
        firstname: 'Super',
        lastname: 'Admin',
        email: 'superadmin@hospital.com',
        password: hashed,
        role: role._id,
      });
      console.log("Superadmin created successfully")
    }
    else{
      console.log('superadmin already exists');
    }

    process.exit(0);
  } catch (error) {
    console.log('Error create super Admin', error);
    process.exit(1);
  }
};
createSuperAdmin();
