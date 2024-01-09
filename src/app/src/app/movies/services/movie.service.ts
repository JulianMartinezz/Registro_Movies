import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://nodejs-sls-movies-api.vercel.app/api/';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}movies`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<any>(`${this.apiUrl}movies`, movie);
  }


  getMovieByTitle(title: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}movies?title=${encodeURIComponent(title)}`);
  }
}