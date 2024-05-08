import { Competition } from './Competition';
import { Badge } from './Badge';
import { Prize } from './Prize';

export interface User {
  idU: number;
  username: string;
  email: string;
  firstName: string;
 lastName: string;
  emailAddress: string;
  compets: Competition[];
  badges: Badge[];
  prizes: Prize[];
}
