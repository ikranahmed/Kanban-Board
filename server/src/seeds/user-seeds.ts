import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ], { individualHooks: true });
};

// import { User } from '../models/user.js';
// import bcrypt from 'bcrypt';

// export const seedUsers = async () => {
//   const users = [
//     { username: 'JollyGuru', password: 'password' },
//     { username: 'SunnyScribe', password: 'password' },
//     { username: 'RadiantComet', password: 'password' },
//   ];

//   // Hash passwords before bulkCreate
//   const hashedUsers = await Promise.all(
//     users.map(async (user) => ({
//       ...user,
//       password: await bcrypt.hash(user.password, 10), // 10 = salt rounds
//     }))
//   );

//   await User.bulkCreate(hashedUsers, { individualHooks: true });
// };