import { Crew } from './crew';
import { Actor } from './actor';

export class Credits {
  id: number;
  cast: Actor[];
  crew: Crew[];
}
