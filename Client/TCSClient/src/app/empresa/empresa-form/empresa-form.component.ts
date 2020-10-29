import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../shared/empresa';
import { UFService } from '../../shared/combo-options.service';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from '../empresa.service';
import { EmpresaComponent } from '../empresa.component';
import { EmpresaListService } from '../empresa-list.service';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  providers: [UFService],
})
export class EmpresaFormComponent implements OnInit {
  public ufList: string[];
  private _empresaService: EmpresaService;
  private _empresaComponent: EmpresaComponent;
  private _listService: EmpresaListService;
  message: string;
  empresas: Empresa[] = [];
  isUpdate: Boolean;
  public empresa: Empresa = {
    nomeFantasia: null,
    uf: 'UF',
    cnpj: null,
  }; //set it to selected on edit;

  constructor(
    public activeModal: NgbActiveModal,
    public ufs: UFService,
    empresaService: EmpresaService,
    listService: EmpresaListService
  ) {
    this._empresaService = empresaService;
    this.ufList = ufs.getValue();
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.updatedEmpresas.subscribe(
      (list) => (this.empresas = list)
    );
    this._listService.currentEmpresa.subscribe((f) => {
      this.empresa = f;
    });
    this._listService.observableUpdateFlag.subscribe(
      (f) => (this.isUpdate = f)
    );
  }

  //if find() != null {update()} else {post()}
  saveNew() {
    console.log(this.empresa.id);
    this._listService.observableUpdateFlag.subscribe(
      (f) => (this.isUpdate = f)
    );
    if (!this.isUpdate) {
      this._empresaService.post(this.empresa).subscribe((f) => {
        console.log('save new:' + this._listService.observableSubject);
      });
    } else {
      this._empresaService.update(this.empresa).subscribe((f) => {
        this.empresa.uf = f.uf;
        this.empresa.cnpj = f.cnpj;
        this.empresa.nomeFantasia = f.nomeFantasia;
        console.log('save new:' + this._listService.observableSubject);
      });
    }
    this.activeModal.close();
  }

  deleteEntry() {
    this._listService.deleteEmpresa();
    this.activeModal.close();
  }
}
