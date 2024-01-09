import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ma-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  listMovies: Movie[] = []


  constructor(private movieService: MovieService, private router: Router) {

  }
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.listMovies = movies.data;
      console.log(this.listMovies);
    });
  }

  addMovie() {
    this.router.navigate(['add']);
  }
}
