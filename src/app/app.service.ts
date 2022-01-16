import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon, PokemonListDto } from './_core/models';
import { PokemonListItem } from './_core/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

constructor(
  protected http: HttpClient
  ) { }

  getPokemons(): Observable<Pokemon[]> {
    let listGetPokemons = [];

    for (let index = 1; index <= 150; index++) {
      listGetPokemons.push(this.getPokemon(index));
    }

    return new Observable((observer) => {
      forkJoin(
        listGetPokemons
      ).subscribe(
        (data: Pokemon[]) => {
          observer.next(data);
        }
      );
    });
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return this.http
      .get<Pokemon>(url)
      .pipe(
        catchError(this.responseHandler.bind(this))
      );
  }

  responseHandler(response: any): Observable<any> {

    console.log(
      'capturamos un error en una consulta al backend: ' +
        JSON.stringify(response)
    );

    if (response.status >= 200 && response.status < 300) {
      const res = response.body || {};

      if (res.success) {
        return res.data;
      }

    } else if (response.status === 400) {
      return throwError(response.error);
    } else if (response.status === 401) {
      return throwError(response.error);
    } else if (response.status === 404) {
      return throwError(response.error);
    } else if (response.status === 500) {
      return throwError(response.error);
    } else if (response.message) {
      return throwError(response.error);
    } else {
      return throwError(response.error);
    }
    return throwError(response.error);
  }

}

