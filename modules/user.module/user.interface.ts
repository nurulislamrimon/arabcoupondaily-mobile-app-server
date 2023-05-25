export default interface IUser {
  name: string;
  email: string;
  country: string;
  isVerified: boolean;
  phoneNumber?: string;
  password?: string;
  retypePassword?: string;
  provider?: object;
}
