import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'bbd112e5a13947c1b3fdcfa075dbb820';
  private baseUrl = 'https://newsapi.org/v2';

  // Categorías válidas según NewsAPI
  private validCategories = [
    'business', 'entertainment', 'general', 'health',
    'science', 'sports', 'technology'
  ];

  // Países válidos según NewsAPI
  private validCountries = [
    'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co',
    'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie',
    'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng',
    'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se',
    'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
  ];

  constructor(private http: HttpClient) { }

  /**
   * Obtiene las noticias principales con filtros opcionales
   * @param category Categoría de noticias (por defecto 'general')
   * @param country Código de país (por defecto 'us')
   * @param pageSize Número de artículos por página (por defecto 20)
   * @param page Número de página (por defecto 1)
   * @returns Observable con la respuesta de la API
   */
  getTopHeadlines(
    category: string = 'general',
    country: string = 'us',
    pageSize: number = 20,
    page: number = 1
  ): Observable<any> {
    // Validar parámetros
    const validatedCategory = this.validateCategory(category);
    const validatedCountry = this.validateCountry(country);

    // Construir parámetros de consulta
    let params = new HttpParams()
      .set('country', validatedCountry)
      .set('category', validatedCategory)
      .set('apiKey', this.apiKey)
      .set('pageSize', pageSize.toString())
      .set('page', page.toString());

    return this.http.get<any>(`${this.baseUrl}/top-headlines`, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener noticias:', error);
          return throwError(() => new Error('Error al cargar las noticias. Inténtalo más tarde.'));
        })
      );
  }

  /**
   * Obtiene noticias específicas por categoría
   * @param category Categoría de noticias deseada
   * @param country Código de país (por defecto 'us')
   * @returns Observable con la respuesta de la API
   */
  getNewsByCategory(
    category: string,
    country: string = 'us'
  ): Observable<any> {
    return this.getTopHeadlines(category, country);
  }

  /**
   * Busca noticias por palabra clave
   * @param query Término de búsqueda
   * @param pageSize Número de artículos por página (por defecto 20)
   * @param page Número de página (por defecto 1)
   * @returns Observable con la respuesta de la API
   */
  searchNews(
    query: string,
    pageSize: number = 20,
    page: number = 1
  ): Observable<any> {
    if (!query || query.trim() === '') {
      return throwError(() => new Error('Debes ingresar un término de búsqueda'));
    }

    let params = new HttpParams()
      .set('q', query)
      .set('apiKey', this.apiKey)
      .set('pageSize', pageSize.toString())
      .set('page', page.toString());

    return this.http.get<any>(`${this.baseUrl}/everything`, { params })
      .pipe(
        catchError(error => {
          console.error('Error en la búsqueda:', error);
          return throwError(() => new Error('Error en la búsqueda. Inténtalo más tarde.'));
        })
      );
  }

  /**
   * Obtiene las categorías de noticias disponibles
   * @returns Array con las categorías válidas
   */
  getValidCategories(): string[] {
    return [...this.validCategories];
  }

  /**
   * Obtiene los países disponibles
   * @returns Array con los códigos de país válidos
   */
  getValidCountries(): string[] {
    return [...this.validCountries];
  }

  /**
   * Valida y normaliza una categoría
   * @param category Categoría a validar
   * @returns Categoría válida
   */
  private validateCategory(category: string): string {
    const normalizedCategory = category.toLowerCase();
    if (!this.validCategories.includes(normalizedCategory)) {
      console.warn(`Categoría inválida: ${category}. Usando 'general' en su lugar.`);
      return 'general';
    }
    return normalizedCategory;
  }

  /**
   * Valida y normaliza un país
   * @param country País a validar
   * @returns País válido
   */
  private validateCountry(country: string): string {
    const normalizedCountry = country.toLowerCase();
    if (!this.validCountries.includes(normalizedCountry)) {
      console.warn(`País inválido: ${country}. Usando 'us' en su lugar.`);
      return 'us';
    }
    return normalizedCountry;
  }
}
