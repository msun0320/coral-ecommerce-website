class UserModel {
  id: number;
  username: string;
  password: string;
  email: string;

  constructor(id: number, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

export default UserModel;
