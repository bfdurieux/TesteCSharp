import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
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
  headers =  new HttpHeaders(); 



  constructor(httpclient: HttpClient) {
    this._client = httpclient;
  }

  getAll(): Observable<Fornecedor[]> {
    return this._client
      .get<Fornecedor[]>(this.baseURL + 'All')
      .pipe(catchError(this.handleError));
  }
  getById(id: number): Observable<Fornecedor> {
    return this._client.get<Fornecedor>(this.baseURL + id);
  }

  post(fornecedor: Fornecedor): Observable<Fornecedor> {
    this.headers.set('Content-Type', 'application/json');
    //var data = "\"Nome\":\""+ fornecedor.nome +"\",\"EmpresaID\":\""+ fornecedor.empresaId +"\",\"NumeroRegistro\":\""+fornecedor.numeroRegistro+"\",\"TimestampCadastro\":\""+fornecedor.timestampCadastro+"\"";
    //console.log(data);

    return this._client.post<Fornecedor>(this.baseURL, fornecedor, {headers: this.headers});  
  }

  update(fornecedorToUpdate): Observable<Fornecedor> {
    this.headers.set('Content-Type', 'application/json');
  //   var data = "\"Nome\":\""+ fornecedorToUpdate.nome +"\",\"EmpresaID\":\""+ fornecedorToUpdate.empresaId +"\",\"NumeroRegistro\":\""+fornecedorToUpdate.numeroRegistro+"\",";
  //   if(fornecedorToUpdate.rg) {data += "\"RG\":\""+ fornecedorToUpdate.rg+"\","}
  //   if(fornecedorToUpdate.dataNascimento){data += "\"DataNascimento\":\""+ fornecedorToUpdate.dataNascimento+"\","}
  //   data +="\"TimestampCadastro\":\""+fornecedorToUpdate.timestampCadastro+"\",";
  //   if(fornecedorToUpdate.telefone){data += "\"Telefone\":\"[";
  //   for(let i = 0; i < fornecedorToUpdate.telefone.length; i++){
  //     data += "{\"fornecedorID\":"+fornecedorToUpdate.id + "\", \"numeroTelefone\":" + fornecedorToUpdate.telefone[i] +"\"}";
  //     if(i < fornecedorToUpdate.telefone.length-1){
  //       data +=","
  //     }
  //   }
  //   data+="]";
  // }
  //   console.log(data);
 
    return this._client.put<Fornecedor>(this.baseURL, fornecedorToUpdate, {headers: this.headers});
  }

  delete(id: number): Observable<{}> {
    return this._client.delete(this.baseURL + id);
  }

  handleError(error: HttpErrorResponse) {
    var errorMsg: string;
    if (error instanceof ErrorEvent) {
      errorMsg = 'Client side error';
      //window.alert(errorMsg);
    } else {
      errorMsg = 'Server side error: ';
      //window.alert(errorMsg + error.message);
    }
    console.error(error.message);
    return throwError(error.message);
  }
}
