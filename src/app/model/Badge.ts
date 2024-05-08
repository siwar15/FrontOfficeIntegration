import { Competition } from './Competition';
import { User } from './User';


export interface Badge {
  idB: number;
  name: string;
  description: string;
  type: 'silver' ;
  competition: Competition;
  user: User;
}


