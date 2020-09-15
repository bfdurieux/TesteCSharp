import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fornecedor } from '../shared/fornecedor';
import { Telefone } from '../shared/telefone';

@Injectable({ providedIn: 'root' })
export class FornecedorService {
  private _client: HttpClient;
  baseURL = 'http://localhost:5000/Fornecedor/';
  constructor(httpclient: HttpClient) {
    this._client = httpclient;
  }

  getAll(): Observable<Fornecedor[]> {
    return this._client
      .get<Fornecedor[]>(this.baseURL + 'All')
      .pipe(catchError(this.handleError));
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
