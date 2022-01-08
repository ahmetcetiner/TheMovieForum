import { Message } from "@angular/compiler/src/i18n/i18n_ast";

export class Discussion{
    Id: number;
    UserId: number;
    Name: string;
    MovieId: number;
    CreatedDate: string;
    FirstName !: string;
    LastName !: string;  
    UserName!: string;
    AvatarUrl !: string;
    Messages : Message[]
}