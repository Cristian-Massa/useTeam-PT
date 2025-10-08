export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface SignUpUser extends User {
  password: string;
}

export interface SignInUser extends Omit<User, "name" | "_id"> {
  password: string;
}
