import { IObject } from "../base/i-object.interface";
import { UserProfile } from "./user.profile";

export interface User extends IObject
{
  uid: string;

  email: string;

  displayName?: string;

  profile: UserProfile;
}
