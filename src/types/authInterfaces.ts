export type Role = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: Role;
}

// name: String,
//   email: String,
//   password: String,
//   lastName: {
//     type: String,
//     default: 'lastName',
//   },
//   location: {
//     type: String,
//     default: 'my city',
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user',
//   },
// });
