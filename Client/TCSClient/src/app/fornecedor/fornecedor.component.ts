import { Component, OnInit } from '@angular/core';
import { FornecedorListService } from './fornecedor-list.service';
import { Fornecedor } from '../shared/fornecedor';
import { Empresa } from '../shared/empresa';
import { Telefone } from '../shared/telefone';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
})
export class FornecedorComponent implements OnInit {
  private _listService: FornecedorListService;
  fornecedores: Fornecedor[];

  constructor(listService: FornecedorListService) {
    this._listService = listService;
  }

  ngOnInit(): void {
    this._listService.updatedFornecedores.subscribe((f) => {
      this.fornecedores = f;
    });
  }

  getEmpresaName(empresa: Empresa) {
    if (empresa) {
      //GAMBI
      return empresa.nomeFantasia;
    } else {
      return '';
    }
  }

  getTelefone(telefone: Telefone[]): string {
    if (telefone != null) {
      telefone.forEach((element) => {
        if (element) {
          console.log(element.numeroTelefone);
          return element.numeroTelefone;
        }
      });
    } else {
      return '000';
    }
  }
}
