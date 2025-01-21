import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private apiUrl = 'https://es.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  consiguePaisInfo(country: string): Observable<any> {
    const params = {
      action: 'query',
      format: 'json',
      origin: '*',
      prop: 'extracts',
      exintro: 'true',
      explaintext: 'true',
      titles: country,
    };

    return this.http.get<any>(this.apiUrl, { params });
  }
}
