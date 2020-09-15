import { Component, OnInit, Input } from '@angular/core';
import { Empresa } from '../shared/empresa';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpresaListService } from './empresa-list.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [],
})
export class EmpresaComponent implements OnInit {
  private _listService: EmpresaListService;
  empresa: Empresa;
  message: string;
  empresas: Empresa[];
  allEmpresas: Empresa[];
  countEmpresas: number;
  perPage = 10;
  page = 1;
  countPages: number;
  isLoading: boolean;
  //observableEmpresas: BehaviorSubject<Empresa[]>;
  error: any;

  constructor(private modalService: NgbModal, listService: EmpresaListService) {
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.updatedEmpresas.subscribe((f) => {
      this.countEmpresas = f.length;
      this.page = 1;
      this._listService.disablePageBtnPrev(true);
      this._listService.disablePageBtnNext(this.countEmpresas <= 10);
      this.allEmpresas = f;
      this.arraySlicer(f);
      this.countPages = Math.ceil(this.countEmpresas / this.perPage);
    });
  }

  openFormCard() {
    this.empresa = this._listService.defaultEmpresa;
    this._listService.empresaSubject.next(this.empresa);
    this._listService.empresaSubject.subscribe((f) => console.log(f));
    this._listService.observableUpdateFlag.next(false);
    this.modalService.open(EmpresaFormComponent, { centered: true });
  }

  openEditCard(empresa: Empresa) {
    this._listService.observableUpdateFlag.next(true);
    if (empresa != null) {
      this._listService.setEmpresa(empresa);
    }
    this.modalService.open(EmpresaFormComponent, { centered: true });
  }

  goToPrevious() {
    this._listService.disablePageBtnNext(this.arraySlicer(this.allEmpresas));
    this.page = this.page-- <= 1 ? 1 : this.page--;
    this.arraySlicer(this.allEmpresas);
    this._listService.disablePageBtnPrev(this.page == 1);
  }

  goToNext() {
    if (this.empresas.length == 10) {
      this._listService.disablePageBtnPrev(false);
      this.page++;
    }
    this._listService.disablePageBtnNext(this.arraySlicer(this.allEmpresas));
  }

  arraySlicer(empresas: Empresa[]): boolean {
    var head = this.page == 1 ? 0 : this.page * this.perPage - this.perPage;
    var tail =
      this.page * this.perPage <= this.countEmpresas
        ? head + this.perPage
        : this.countEmpresas;
    console.log('head:' + head + 'tail: ' + tail);
    console.log(empresas);
    this.empresas = empresas.slice(head, tail);
    console.log(this.empresas);
    return tail == this.countEmpresas;
  }
}
