export type Admin = {
  _id: string;
  adminId: string;
  email: string;
  password: string;
  role: "admin";
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
