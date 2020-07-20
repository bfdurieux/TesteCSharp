import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { Empresa } from '../shared/empresa';

@Injectable({ providedIn: 'root' })
export class EmpresaService {
  private _client: HttpClient;
  baseURL: string = 'http://localhost:5000/Empresa/';

  constructor(httpclient: HttpClient) {
    this._client = httpclient;
  }

  getAll(): Observable<Empresa[]> {
    return this._client.get<Empresa[]>(this.baseURL + 'All');
  }

  getById(id: number): Observable<Empresa> {
    return this._client.get<Empresa>(this.baseURL + id);
  }

  post(empresa: Empresa): Observable<Empresa> {
    return this._client.post<Empresa>(this.baseURL, empresa);
  }

  update(empresaToUpdate: Empresa): Observable<Empresa> {
    return this._client.put<Empresa>(this.baseURL, empresaToUpdate);
  }

  delete(id): Observable<{}> {
    return this._client.delete(this.baseURL + id);
  }
}

@Injectable()
export class ListService {
  defaultEmpresa: Empresa = {
    nomeFantasia: null,
    uf: 'UF',
    cnpj: null,
  };
  listToSync: Empresa[] = [this.defaultEmpresa];

  private _service: EmpresaService;
  observableSubject = new BehaviorSubject<Empresa[]>(this.listToSync);

  constructor(empresaService: EmpresaService) {
    this._service = empresaService;
    this._service.getAll().subscribe((f) => (this.listToSync = f));
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }

  addEmpresa(empresa: Empresa) {
    this.listToSync.push(empresa);
    this.observableSubject.next(this.listToSync);
    console.log('add empresa:' + this.listToSync.length);
  }

  //private _message = new BehaviorSubject<string>('default');
  //currentMessage = this._message.asObservable();
  updatedEmpresas = this.observableSubject.asObservable();

  updateEmpresa() {
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }

  // changeMessage(message: string) {
  //   this._message.next(message);
  // }
}
/*save new: updated empresas -[object Object] listtosync- 40
empresa.service.ts:57 add empresa:41 */
