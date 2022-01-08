export class List {
    Id: number;
    ListType: number;
    UserId: number;
    MovieId: Array<number>;

    constructor(){
        this.MovieId = new Array<number>()
    }


}