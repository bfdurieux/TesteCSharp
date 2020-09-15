import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Fornecedor } from '../shared/fornecedor';
import { FornecedorService } from './fornecedor.service';

@Injectable()
export class FornecedorListService {
  defaultFornecedor: Fornecedor = {
    nome: null,
    empresaId: null,
    numeroRegistro: null,
    timestampCadastro: null,
    telefone: null,
  };

  fornecedores: Fornecedor[] = [this.defaultFornecedor];
  private _service: FornecedorService;
  observableSubject = new BehaviorSubject<Fornecedor[]>(this.fornecedores);

  constructor(fornecedorService: FornecedorService) {
    this._service = fornecedorService;
    this._service.getAll().subscribe((f) => (this.fornecedores = f));
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }
  updatedFornecedores = this.observableSubject.asObservable();
}
