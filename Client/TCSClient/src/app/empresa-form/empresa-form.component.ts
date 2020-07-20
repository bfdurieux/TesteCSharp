import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../shared/empresa';
import { UFService } from '../shared/combo-options.service';
import { FormsModule } from '@angular/forms';
import { EmpresaService, ListService } from '../empresa/empresa.service';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css'],
  providers: [UFService, ListService],
})
export class EmpresaFormComponent implements OnInit {
  public ufList: string[];
  private _empresaService: EmpresaService;
  private _empresaComponent: EmpresaComponent;
  private _listService: ListService;
  message: string;
  empresas: Empresa[] = [];
  public empresa: Empresa = {
    nomeFantasia: null,
    uf: 'UF',
    cnpj: null,
  }; //set it to selected on edit;

  constructor(
    public activeModal: NgbActiveModal,
    public ufs: UFService,
    empresaService: EmpresaService,
    listService: ListService
  ) {
    this._empresaService = empresaService;
    this.ufList = ufs.getValue();
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.updatedEmpresas.subscribe(
      (list) => (this.empresas = list)
    );
  }

  //if find() != null {update()} else {post()}
  saveNew() {
    this._empresaService.post(this.empresa).subscribe((f) => {
      this.empresa.uf = f.uf;
      this.empresa.cnpj = f.cnpj;
      this.empresa.nomeFantasia = f.nomeFantasia;
      console.log(
        'save new: updated empresas -' +
          this._listService.updatedEmpresas +
          ' listtosync- ' +
          this._listService.listToSync.length
      );
      this._listService.addEmpresa(this.empresa);
      this._listService.observableSubject.next(this._listService.listToSync);
    });
    //this.activeModal.close();
  }
}

// export class EmpresaEditComponent {
//   ngOnInit(): void {}
//   update() {
//     var msg = this._empresaService.update(this._empresa).subscribe((f) => {
//       console.log(f);
//     });
//     this.activeModal.close();
//   }
// }
