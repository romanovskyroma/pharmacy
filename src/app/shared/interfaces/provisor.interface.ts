import { IUser } from './users.interface';

export interface IProvisor extends IUser {
  firstName?: string;
  secondName?: string;
  lastName?: string;
  phone?: string;
  education?: {
    university?: string;
    faculty?: string;
    specialty?: string;
    startYear?: string;
    endYear?: string;
  };
  pharmacyWork?: string;
  townWork?: string;
  photoProfilePath?: string;
}
