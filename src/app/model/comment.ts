export class Comment {
    userPhotoUrl: string;
    userName: string;
    createDate: string;
    commentTitle: string;
    commentRate: number;
    commentText: string;
    constructor(userPhotoUrl: string, userName: string, createDate: string, commentTitle: string, commentRate: number, commentText: string) {
        this.userPhotoUrl = userPhotoUrl;
        this.userName = userName;
        this.createDate = createDate;
        this.commentTitle = commentTitle;
        this.commentRate = commentRate;
        this.commentText = commentText;
    }
}