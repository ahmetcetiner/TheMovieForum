import { User } from 'src/app/model/users';
export class Review {
  Id : number;
  UserId : number;
  Title: string;
  MovieId: number;
  MessageText: string;
  ReviewLike: number;
  ReviewDislike: number;
  CreatedDate: string;

  User : User
}
