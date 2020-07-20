import { Component, OnInit, Input } from '@angular/core';
import { EmpresaService } from './empresa.service';
import { Empresa } from '../shared/empresa';
import { EmpresaFormComponent } from '../empresa-form/empresa-form.component';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ListService } from './empresa.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [ListService],
})
export class EmpresaComponent implements OnInit {
  private _empresaService: EmpresaService;
  private _listService: ListService;
  empresa: Empresa;
  message: string;
  empresas: Empresa[];
  observableEmpresas: BehaviorSubject<Empresa[]>;

  constructor(
    empresaService: EmpresaService,
    private modalService: NgbModal,
    listService: ListService
  ) {
    this._empresaService = empresaService;
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.updatedEmpresas.subscribe((data) => {
      this.empresas = data;
      console.log(data);
    });
    //this._empresaService.getAll().subscribe((f) => (this.empresas = f));
    //this._listService.updateEmpresa();
    // this._listService.currentMessage.subscribe(
    //   (message) => (this.message = message)
    // );
  }

  openFormCard() {
    var modalRef: NgbModalRef;
    modalRef = this.modalService.open(EmpresaFormComponent, {
      centered: true,
    });
    //this._listService.updateEmpresa();
  }

  openEditCard(empresa: Empresa) {
    var modalRef: NgbModalRef;
    //this.empresa = empresa;
    modalRef = this.modalService.open(EmpresaFormComponent, { centered: true });
  }
}
