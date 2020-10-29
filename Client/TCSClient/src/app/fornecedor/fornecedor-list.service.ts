import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../shared/empresa';
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
  defaultEmpresa: Empresa = {
    nomeFantasia: null,
    uf: 'UF',
    cnpj: null,
  };

  fornecedores: Fornecedor[] = [this.defaultFornecedor];
  fornecedorSubject = new BehaviorSubject<Fornecedor>(this.defaultFornecedor);
  private _service: FornecedorService;
  observableSubject = new BehaviorSubject<Fornecedor[]>(this.fornecedores);
  currentFornecedor = this.fornecedorSubject.asObservable();
  observableUpdateFlag = new BehaviorSubject<boolean>(false);
  isUpdate = this.observableUpdateFlag.asObservable();
  empresaSubject = new BehaviorSubject<Empresa>(this.defaultEmpresa);
  currentEmpresa = this.empresaSubject.asObservable();
  disablePageNextButton = new BehaviorSubject<boolean>(false);
  disablePagePrevButton = new BehaviorSubject<boolean>(false);
  


  constructor(
    fornecedorService: FornecedorService,
    public datePipe: DatePipe,
    private _parserFormatter: NgbDateParserFormatter
  ) {
    this._service = fornecedorService;
    this._service.getAll().subscribe((f) => (this.fornecedores = f));
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }
  updatedFornecedores = this.observableSubject.asObservable();

  getFornecedorById(id: number) {
    this._service.getById(id).subscribe((f) => console.log(f));
  }

  addFornecedor(fornecedor: Fornecedor) {
    this.fornecedores.push(fornecedor);
    this.observableSubject.next(this.fornecedores);
    console.log('add fornecedor: ' + this.observableSubject);
  }

  deleteFornecedor() {
    var id;
    this.currentFornecedor.subscribe((f) => {
      id = f.id;
      console.log('deleting: ' + f.nome + f.id);
    });
    this._service.delete(id).subscribe((f) => console.log(f));
    this.fornecedores.splice(
      this.fornecedores.findIndex((f) => f.id == id),
      1
    );
    this.observableSubject.next(this.fornecedores);
    this.updatedFornecedores = this.observableSubject.asObservable();
  }

  setFornecedor(fornecedor: Fornecedor) {
    this.fornecedorSubject.next(fornecedor);
    this.fornecedorSubject.subscribe((f) => console.log(f));
    this.empresaSubject.next(fornecedor.empresa);
    this.empresaSubject.subscribe((f) => console.log(f.nomeFantasia));
  }

  setIsUpdate(state: boolean) {
    this.observableUpdateFlag.next(state);
  }

  disablePageBtnNext(status: boolean) {
    this.disablePageNextButton.next(status);
    this.disablePageNextButton.subscribe((f) => console.log(f));
  }
  disablePageBtnPrev(status: boolean) {
    this.disablePagePrevButton.next(status);
    this.disablePagePrevButton.subscribe((f) => console.log(f));
  }

}
