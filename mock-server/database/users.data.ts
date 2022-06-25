export type UserType = {
  id: number;
  name: string;
  email: string;
  city: string;
  password?: string;
};

export type UsersType = UserType[];

const users: UsersType = [
  { id: 1, name: "firoj", email: "firoj@gmail.com", city: "Kathmandu", password: "firoj123" },
  { id: 2, name: "saharoj", email: "saharoj@gmail.com", city: "Nepalganj", password: "saharoj123" },
  { id: 3, name: "sakina", email: "sakina@gmail.com", city: "Butwal", password: "sakina123" },
  { id: 4, name: "afroj", email: "afroj@gmail.com", city: "Parasi", password: "afroj123" },
];
export default users;
