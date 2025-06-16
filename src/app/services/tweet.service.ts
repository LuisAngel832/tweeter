import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { Tweet } from '../models/tweets/Tweet'; 

@Injectable({
  providedIn: 'root',
})
export class TweetService {

  private apiURL = 'http://localhost:8080/api/tweets';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // ✅ Generar cabecera con el token actualizado
  private getHttpOptions() {
    const token = this.storageService.getSession("token");
    console.log('Usando token:', token);

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + (token ?? '')
      })
    };
  }

  // ✅ Obtener tweets (GET)
  getTweets(): Observable<Tweet[]> {
    console.log('GET:', `${this.apiURL}/all`);
    return this.http.get<Tweet[]>(`${this.apiURL}/all`, this.getHttpOptions())
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // ✅ Crear tweet (POST con objeto)
  createTweet(tweet: Tweet): Observable<Tweet> {
    console.log('POST:', `${this.apiURL}/create`, tweet);
    return this.http.post<Tweet>(`${this.apiURL}/create`, tweet, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // ✅ Crear tweet (POST con texto plano)
  postTweet(myTweet: string): Observable<any> {
    const body = { tweet: myTweet };
    console.log('POST body:', body);

    return this.http.post(`${this.apiURL}/create`, body, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  // ✅ Manejo de errores
  private handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }

    console.error(errorMessage);
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
