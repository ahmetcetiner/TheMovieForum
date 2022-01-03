export class Discussion{
    userPhotoUrl: string;
    userName: string;
    createDate: string;
    discussionTitle: string;
    discussionRate: number;
    constructor(userPhotoUrl: string, userName: string, createDate: string, discussionTitle: string, discussionRate: number){
        this.userPhotoUrl= userPhotoUrl;
        this.userName= userName;
        this.createDate= createDate;
        this.discussionTitle= discussionTitle;
        this.discussionRate= discussionRate;
    }
}