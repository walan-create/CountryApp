import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from './interfaces/rest-countries.interface';
import { map, Observable,catchError, throwError, delay, of, tap } from 'rxjs';
import { Country } from './interfaces/country.interface';
import { CountryMapper } from './mappers/country.mapper';
import { Region } from './interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); //Inicializa como {}
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital( query: string ): Observable<Country[]>{
    query = query.toLowerCase();

    //Verificamos si la query ya existe en el cache para tomar los datos sin hacer la petición
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
    //map(CountryMapper.mapRestCountryArrayToCountryArray)
    map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
    tap( countries => this.queryCacheCapital.set(query, countries)), //Almacenamos la busqueda en caché
    catchError(error => {
      console.log('Error fetching ', error)

      return throwError(
        () => new Error(`No se pudo obtener países con esa query: ${query}`)
      )
    })
    );
  }

  searchByCountry( query: string ): Observable<Country[]>{
    query = query.toLowerCase();
    //Verificamos si la query ya existe en el cache para tomar los datos sin hacer la petición
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
    //delay(3000),
    map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
    tap( countries => this.queryCacheCountry.set(query, countries)),
    catchError(error => {
      console.log('Error fetching ', error)

      return throwError(
        () => new Error(`No se pudo obtener países con esa query: ${query}`)
      )
    })
    );
  }

  searchCountryByAlphaCode( code: string ){
    const url= `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url)
      .pipe(
      map((restCountry) => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
      map((countries) => countries.at(0)),
      catchError(error => {
        console.log('Error fetching ', error)

        return throwError(
          () => new Error(`No se pudo obtener países con ese codigo: ${code}  `)
        )
      })
    );
  }

  searchByRegion( region: Region ): Observable<Country[]>{
    //Verificamos si la query ya existe en el cache para tomar los datos sin hacer la petición
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
    //delay(3000),
    map(restCountry => CountryMapper.mapRestCountryArrayToCountryArray(restCountry)),
    tap( countries => this.queryCacheRegion.set(region, countries)),
    catchError(error => {
      console.log('Error fetching ', error)

      return throwError(
        () => new Error(`No se pudo obtener países con esa query: ${region}`)
      )
    })
    );
  }


}
