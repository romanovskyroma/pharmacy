import { IProvisor } from '../interfaces/provisor.interface';
import { User } from './user.model';

export class Provisor implements IProvisor {
  constructor(
    public name?: string,
    public secondName?: string,
    public pharmacyWork?: string,
    public townWork?: string
  ) {}
  email: string;
  uid?: string;
  role?: string; 
  password?: string;
}
