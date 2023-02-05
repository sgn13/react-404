export type UserType = {
  id: string;
  fullName?: string;
  email: string;
  city: string;
  password?: string;
  profilePic?: string;
  profileVideo?: string;
  branchName?: string;
  branchCode?: string;
  department?: string;
  functionalTitle?: string;
  isSuperuser?: boolean;
  isActive?: boolean;
  isStaff?: boolean;
  isAdmin?: boolean;
};

export type UsersType = UserType[];

const users: UsersType = [
  {
    id: "1",
    fullName: "firoj",
    email: "firoj@gmail.com",
    city: "Kathmandu",
    password: "firoj1234",
    profilePic:
      "https://api.vkyc.prabhu.mangosoftsolution.dev/media/profile/pics/after_date_lN5LuIg.PNG",
    profileVideo: undefined,
    branchName: "Babarmahal",
    branchCode: "0200",
    department: "fghj",
    functionalTitle: "aaku1234",
    isSuperuser: true,
    isActive: true,
    isStaff: false,
    isAdmin: false,
  },

  {
    id: "2",
    fullName: "saharoj",
    email: "saharoj@gmail.com",
    city: "Nepalganj",
    password: "saharoj1234",
    profilePic:
      "https://api.vkyc.prabhu.mangosoftsolution.dev/media/profile/pics/971_Firoj_gJgsuQZ.JPG",
    profileVideo: undefined,
    branchName: "Hanumansthan",
    branchCode: "003",
    department: "IT",
    functionalTitle: "Developer",
    isSuperuser: true,
    isActive: true,
    isStaff: false,
    isAdmin: true,
  },
  {
    id: "3",
    fullName: "sakina",
    email: "sakina@gmail.com",
    city: "Butwal",
    password: "sakina1234",
    profilePic: "https://api.vkyc.prabhu.mangosoftsolution.dev/media/profile/pics/screenshot_2.png",
    profileVideo: undefined,
    branchName: "Anamnagar",
    branchCode: "004",
    department: "Central Operations",
    functionalTitle: "Junior Assistant",
    isSuperuser: false,
    isActive: true,
    isStaff: false,
    isAdmin: false,
  },
  {
    id: "4",
    fullName: "afroj",
    email: "afroj@gmail.com",
    city: "Parasi",
    password: "afroj1234",
    profilePic: undefined,
    profileVideo: undefined,
    branchName: "gthyj",
    branchCode: "yhujk",
    department: "ghj",
    functionalTitle: "fghj",
    isSuperuser: false,
    isActive: true,
    isStaff: false,
    isAdmin: false,
  },
];
export default users;
