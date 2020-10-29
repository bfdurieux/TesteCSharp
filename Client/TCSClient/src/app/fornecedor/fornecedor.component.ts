import { Component, OnInit } from '@angular/core';
import { FornecedorListService } from './fornecedor-list.service';
import { Fornecedor } from '../shared/fornecedor';
import { Empresa } from '../shared/empresa';
import { Telefone } from '../shared/telefone';
import { stringify } from 'querystring';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
})
export class FornecedorComponent implements OnInit {
  private _listService: FornecedorListService;
  fornecedores: Fornecedor[];
  allFornecedores: Fornecedor[];
  emptyTelefones: Telefone[] = [{ numeroTelefone: '' }];
  emptyEmpresa: Empresa = { nomeFantasia: '', uf: '', cnpj: '' };
  dateBD: NgbDate;
  perPage = 10;
  page = 1;
  countPages: number;
  countFornecedores: number;



  constructor(
    listService: FornecedorListService,
    private _modalService: NgbModal
  ) {
    this._listService = listService;
    //this.dateBD = this._listService.parseDate(null);
  }

  ngOnInit(): void {
    this._listService.updatedFornecedores.subscribe((f) => {
      this.fornecedores = f;
      this.countFornecedores = f.length;
      this.page = 1;
      this._listService.disablePageBtnPrev(true);
      this._listService.disablePageBtnNext(this.countFornecedores <= 10);
      this.allFornecedores = f;
      this.arraySlicer(f);
      this.countPages = Math.ceil(this.countFornecedores / this.perPage);
    });
  }

  openFormCard() {
    let defaultFornecedor = this._listService.defaultFornecedor;
    this._listService.fornecedorSubject.next(defaultFornecedor);
    this._listService.setIsUpdate(false);
    this._modalService.open(FornecedorFormComponent, { centered: true });
  }

  openEditCard(fornecedor: Fornecedor, empresa: Empresa, telefone: Telefone[]) {
    this._listService.setIsUpdate(true);
    //this.dateBD = this._listService.parseDate(fornecedor.dataNascimento);

    this._listService.fornecedorSubject.next(fornecedor);
    this._listService.fornecedorSubject.subscribe((f) => console.log(f));
    this._listService.empresaSubject.next(empresa);
    this._listService.empresaSubject.subscribe((f) =>
      console.log('open edit: ' + f.nomeFantasia)
    );
    this.setFornecedor(fornecedor);
    this._modalService.open(FornecedorFormComponent, { centered: true });
  }

  getEmpresaName(empresa: Empresa): Empresa {
    if (empresa) {
      //GAMBI
      return empresa;
    } else {
      return this.emptyEmpresa;
    }
  }

  getTelefoneNumber(telefone: Telefone[]): string {
    var number: string = '';
    if (telefone != null) {
      telefone.find((element) => {
        if (element.numeroTelefone) {
          number = element.numeroTelefone;
          //return element.numeroTelefone;
        }
      });
      return number;
    }
  }

  getTelefone(telefone: Telefone[]): Telefone[] {
    if (telefone) {
      return telefone;
    } else {
      return this.emptyTelefones;
    }
  }

  setFornecedor(fornecedor: Fornecedor) {
    this._listService.setFornecedor(fornecedor);
  }

  goToPrevious() {
    this._listService.disablePageBtnNext(this.arraySlicer(this.allFornecedores));
    this.page = this.page-- <= 1 ? 1 : this.page--;
    this.arraySlicer(this.allFornecedores);
    this._listService.disablePageBtnPrev(this.page == 1);
  }

  goToNext() {
    if (this.fornecedores.length == 10) {
      this._listService.disablePageBtnPrev(false);
      this.page++;
    }
    this._listService.disablePageBtnNext(this.arraySlicer(this.allFornecedores));
  }

  arraySlicer(fornecedores: Fornecedor[]): boolean {
    var head = this.page == 1 ? 0 : this.page * this.perPage - this.perPage;
    var tail =
      this.page * this.perPage <= this.countFornecedores
        ? head + this.perPage
        : this.countFornecedores;
    console.log('head:' + head + 'tail: ' + tail);
    console.log(fornecedores);
    this.fornecedores = fornecedores.slice(head, tail);
    console.log(this.fornecedores);
    return tail == this.countFornecedores;
  }

}
