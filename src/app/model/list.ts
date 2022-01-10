export class List {
    Id: number;
    ListType: number;
    UserId: number;
    MovieId: number;

    constructor( ListType: number, UserId: number, MovieId: number) {
        this.ListType = ListType;
        this.UserId = UserId;
        this.MovieId = MovieId;
    }
}