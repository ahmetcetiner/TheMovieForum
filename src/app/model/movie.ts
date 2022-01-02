import { Genre } from './genre';
export class Movie {
    id :number;
    original_title:string;
    title:string;
    overview:string;
    vote_average:number;
    runtime:number;
    budget:number;
    revenue:number;
    backdrop_path:string;
    poster_path:string;
    release_date:Date;
    genres : Genre[]

}
