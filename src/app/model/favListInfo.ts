export class FavListInfo {
    imageUrl: string;
    movieName: string;
    movieRate: number;
    movieId: number;

    constructor(imageUrl: string, movieName: string, movieRate: number, movieId: number) {
        this.imageUrl = imageUrl;
        this.movieName = movieName;
        this.movieRate = movieRate;
        this.movieId = movieId;
    }
}