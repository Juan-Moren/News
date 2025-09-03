import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

export interface Country {
  name: string;
  flag?: string;
  iso2?: string;
}

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';
  private cache$!: Observable<Country[]>;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    if (!this.cache$) {
      this.cache$ = this.http.get<any>(this.url).pipe(
        map(resp => {
          const list = resp?.data ?? resp?.countries ?? resp;
          if (!Array.isArray(list)) return [];
          return list
            .map((it: any) => ({
              name: it.name ?? it.country ?? it.countryName ?? '',
              flag: it.unicodeFlag ?? it.flag ?? it.emoji ?? '',
              iso2: it.iso2 ?? it.countryCode ?? ''
            }))

            .filter((c: Country) => !!c.name)
            .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        }),
        catchError(err => {
          console.error('CountriesService.getCountries error', err);
          return of([]);
        }),
        shareReplay(1)
      );
    }
    return this.cache$;
  }
}
