import { Empresa } from '../shared/empresa';
import { Injectable, Output } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EmpresaListService {
  defaultEmpresa: Empresa = {
    nomeFantasia: null,
    uf: 'UF',
    cnpj: null,
  };

  empresas: Empresa[] = [this.defaultEmpresa];
  private _service: EmpresaService;
  observableSubject = new BehaviorSubject<Empresa[]>(this.empresas);
  empresaSubject = new BehaviorSubject<Empresa>(this.defaultEmpresa);
  currentEmpresa = this.empresaSubject.asObservable();
  disablePageNextButton = new BehaviorSubject<boolean>(false);
  disablePagePrevButton = new BehaviorSubject<boolean>(false);
  observableUpdateFlag = new BehaviorSubject<Boolean>(false);
  isUpdate = this.observableUpdateFlag.asObservable();
  // currentNextBtnStatus = this.disablePageNextButton.asObservable();
  // currentPrevBtnStatus = this.disablePagePrevButton.asObservable();

  constructor(empresaService: EmpresaService) {
    this._service = empresaService;
    this._service.getAll().subscribe((f) => (this.empresas = f));
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }

  getEmpresaById(id: number): Empresa{
    this._service.getById(id).subscribe((f) =>{ console.log(f); return f;});
    return this.defaultEmpresa;
  }

  addEmpresa(empresa: Empresa) {
    this.empresas.push(empresa);
    this.observableSubject.next(this.empresas);
    console.log('add empresa:' + this.observableSubject);
  }

  updatedEmpresas = this.observableSubject.asObservable();

  updateEmpresa() {
    this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  }

  setEmpresa(empresa: Empresa) {
    this.empresaSubject.next(empresa);
    this.empresaSubject.subscribe((f) => console.log(f));
  }

  deleteEmpresa() {
    var id;
    this.currentEmpresa.subscribe((f) => {
      id = f.id;
      console.log('deleting:' + f.nomeFantasia + f.id);
    });
    this._service.delete(id).subscribe((f) => console.log(f));
    this.empresas.splice(
      this.empresas.findIndex((f) => f.id == id),
      1
    );
    this.observableSubject.next(this.empresas);
    this.updatedEmpresas = this.observableSubject.asObservable(); //observable has to be updated cause thats where the table array gets its data from
  } //also cause not an observable subject so it doesnt update on .next()

  disablePageBtnNext(status: boolean) {
    this.disablePageNextButton.next(status);
    this.disablePageNextButton.subscribe((f) => console.log(f));
  }
  disablePageBtnPrev(status: boolean) {
    this.disablePagePrevButton.next(status);
    this.disablePagePrevButton.subscribe((f) => console.log(f));
  }

  setIsUpdate(state: boolean) {
    this.observableUpdateFlag.next(state);
  }

  // getEmpresaIdByName(name: string): number {
  //   var id: number;
  //   var emp: Empresa;
  //   this._service.getAll().subscribe(
  //     (f) =>
  //       (emp = f.find((q) => {
  //         q.nomeFantasia == name;
  //         id = q.id;
  //       }))
  //   );
  //   this._service.getAll().subscribe((f) => this.observableSubject.next(f));
  //   id = emp.id;
  //   console.log(
  //     'hey buddy, getempresaidbyname here to show you this cool id: ' + id
  //   );
  //   return 0;
  // }
}
