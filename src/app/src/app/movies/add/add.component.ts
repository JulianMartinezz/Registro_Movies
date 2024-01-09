import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
@Component({
  selector: 'ma-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  movieForm: FormGroup = new FormGroup({});
  editing = false;
  title = 'Agregar Pelicula';
  get cast(): FormArray {
    return this.movieForm.get('cast') as FormArray;
  }

  constructor(private fb: FormBuilder, private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }
  removeCast(index: number): void {
    this.cast.removeAt(index);
    this.movieForm.get('cast')?.value.reset();
  }


  addCast(): void {
    this.cast.push(this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]]
    }));
  }

  initForm() {
    this.movieForm = this.fb.group({
      href: ['', [this.hrefValidator.bind(this)]],
      title: ['', {
        validators: [Validators.required],
        asyncValidators: [this.validatorTitle.bind(this)],
        updateOn: 'change'
      }],
      year: ['', [Validators.min(1900), Validators.max(2023)]],
      cast: this.fb.array([], Validators.required),
      extract: ['', [Validators.required, Validators.minLength(15)]],

    });


  }

  hrefValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    const valid = value === value.toUpperCase().split(' ').join('__');
    return valid ? null : { invalidHref: true };
  }

  validatorTitle(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.movieService.getMovieByTitle(control.value).pipe(
      tap(response => console.log(response)),
      map(movie => movie ? { movieNameRepeat: true } : null),
      catchError(() => of(null))
    );
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const castControlValue = this.movieForm.get('cast')?.value;
      const movie: Movie = {
        href: this.movieForm.value.href,
        title: this.movieForm.value.title,
        year: this.movieForm.value.year,
        cast: castControlValue ? castControlValue.map((castMember: any) => `${castMember.firstName} ${castMember.lastName}`) : [],
        extract: this.movieForm.value.extract,
      }

      this.movieService.addMovie(movie).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['list']);
          alert('Pelicula agregada con exito');
        },
        error: error => {
          console.log(error);
          this.movieForm.reset();
          alert('Error al agregar pelicula');
        }
      });
    } else {
      this.movieForm.markAllAsTouched();
    }
  }
};




