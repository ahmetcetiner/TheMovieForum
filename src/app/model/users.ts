import { Message } from 'src/app/model/message';
import { Discussion } from "./discussion";
import { Review } from "./review";

export class User {
    Id !: number;
    FirstName !: string;
    LastName !: string;
    Email !: string;    
    UserName!: string;
    Password!: string;
    AvatarUrl !: string;

    Reviews !: Review[]
    Discussion !: Discussion[]
    Message !: Message[]
}