export type UserType = {
  id: number;
  name: string;
  email: string;
  city: string;
  password?: string;
};

export type UsersType = UserType[];

const users: UsersType = [
  { id: 1, name: "firoj", email: "firoj@gmail.com", city: "Kathmandu", password: "firoj1234" },
  {
    id: 2,
    name: "saharoj",
    email: "saharoj@gmail.com",
    city: "Nepalganj",
    password: "saharoj1234",
  },
  { id: 3, name: "sakina", email: "sakina@gmail.com", city: "Butwal", password: "sakina1234" },
  { id: 4, name: "afroj", email: "afroj@gmail.com", city: "Parasi", password: "afroj1234" },
];
export default users;
