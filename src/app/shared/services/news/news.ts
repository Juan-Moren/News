import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'bbd112e5a13947c1b3fdcfa075dbb820';
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) {}

  getTopHeadlines(category: string = 'general'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?country=us&category=${category}&apiKey=${this.apiKey}`);
  }
}
