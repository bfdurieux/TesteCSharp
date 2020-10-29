import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Empresa } from '../shared/empresa';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private _client: HttpClient;
  headers = new HttpHeaders();
  baseURL: string = 'http://localhost:5000/Empresa/';

  constructor(httpclient: HttpClient) {
    this._client = httpclient;
  }

  getAll(): Observable<Empresa[]> {
    return this._client
      .get<Empresa[]>(this.baseURL + 'All')
      .pipe(retry(3), catchError(this.handleError));
  }

  getById(id: number): Observable<Empresa> {
    return this._client.get<Empresa>(this.baseURL + id);
  }

  post(empresa: Empresa): Observable<Empresa> {
    this.headers.set('Content-Type', 'application/json');
    return this._client.post<Empresa>(this.baseURL, empresa, {headers: this.headers});
  }

  update(empresaToUpdate: Empresa): Observable<Empresa> {
    this.headers.set('Content-Type', 'application/json');
    return this._client.put<Empresa>(this.baseURL, empresaToUpdate, {headers: this.headers});
  }

  delete(id): Observable<{}> {
    this.headers.set('Content-Type', 'application/json');
    return this._client.delete(this.baseURL + id, {headers: this.headers});
  }

  handleError(error: HttpErrorResponse) {
    var errorMsg: string;
    if (error instanceof ErrorEvent) {
      errorMsg = 'Client side error';
      window.alert(errorMsg);
    } else {
      errorMsg = 'Server side error: ';
      window.alert(errorMsg + error.message);
    }
    console.error(error.message);
    return throwError(error.message);
  }
}
