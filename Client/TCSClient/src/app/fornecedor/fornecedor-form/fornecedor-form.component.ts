import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDatepicker,
} from '@ng-bootstrap/ng-bootstrap';
import { EmpresaListService } from '../../empresa/empresa-list.service';
import { Empresa } from '../../shared/empresa';
import { Fornecedor } from '../../shared/fornecedor';
import { Telefone } from '../../shared/telefone';
import { FornecedorListService } from '../fornecedor-list.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { FornecedorService } from '../fornecedor.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css'],
})
export class FornecedorFormComponent implements OnInit {
  public fornecedor: Fornecedor = {
    nome: null,
    empresa: { nomeFantasia: 'Empresa', uf: 'UF', cnpj: null },
    empresaId: null,
    numeroRegistro: null,
    timestampCadastro: null,
    telefone: [],
  };
  public empresa: Empresa = {
    nomeFantasia: 'Empresa',
    uf: 'UF',
    cnpj: null,
  };

  public isUpdate : boolean = false;

  public fornecedorForm: FormGroup;
  public registroIsValid: boolean;
  public nameIsValid : boolean = true;
  public empresaIsValid : boolean = true;
  public dataNascimentoIsValid : boolean = true;
  public dataNascimentoMessage:string ="";

  public telephone: Telefone = { numeroTelefone: 'testphone' };
  public modelTel: string;
  model: NgbDateStruct;
  date: { year: number; month: number; day: number };
  public minDateStruct: NgbDateStruct;
  public maxDateStruct: NgbDateStruct;

  public listService: FornecedorListService;
  private _empresaListService: EmpresaListService;
  public empresas: Empresa[];
  public telephones: Telefone[];
  public telephonesSubject = new BehaviorSubject<Telefone[]>(
    this.fornecedor.telefone
  );
  public telephoneList: Telefone[];
  private _fornecedorService: FornecedorService;
  empresaName = new FormControl('Empresa');
  public today: NgbDate;

  constructor(
    public activeModal: NgbActiveModal,
    listService: FornecedorListService,
    empresaListService: EmpresaListService,
    fornecedorService: FornecedorService,
    private calendar: NgbCalendar,
     public formatter: NgbDateParserFormatter
  ) {
    this.listService = listService;
    this._empresaListService = empresaListService;
    this.telephonesSubject.subscribe((f) => (this.telephoneList = f));
    this._fornecedorService = fornecedorService;
    this.today = calendar.getToday();
    this.minDateStruct = calendar.getNext(this.today, 'y', -110);
    this.maxDateStruct = calendar.getNext(this.today, 'y', -28);
    this.date = this.maxDateStruct;
  }

  ngOnInit(): void {
    this.telephones = this.telephoneList;
    this._empresaListService.updatedEmpresas.subscribe((f) => {
      this.empresas = f;
    });
    this.listService.fornecedorSubject.subscribe((f) => {
      this.fornecedor = f;
      if (f.empresa) {
        this.empresa = f.empresa;
        this.fornecedor.empresaId = this.empresa.id;
        this.empresaName.setValue(this.empresa.nomeFantasia);
      }
    });
    this.listService.observableUpdateFlag.subscribe(f=> this.isUpdate = f)

    if (this.fornecedor.dataNascimento) {
      var date = new Date(this.fornecedor.dataNascimento);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var ngbDate: NgbDateStruct = { year: year, month: month, day: day };
      this.model = ngbDate;
    }
    if (this.fornecedor.telefone) {
      this.telephoneList = this.fornecedor.telefone;
    }
  }
  
  

  saveNew() {
    
    if(this.isValid()){
      this.listService.observableUpdateFlag.subscribe(f => this.isUpdate = f);
      if(!this.isUpdate){
        this.fornecedor.timestampCadastro = new Date().toISOString();
       this._fornecedorService.post(this.fornecedor).subscribe((f) => {
         console.log(f
          );
          this.activeModal.close();
        });
      }
      else{
        //console.log(this.fornecedor.dataNascimento + this.fornecedor.empresaId + this.fornecedor.numeroRegistro + this.fornecedor.rg)
        this._fornecedorService.update(this.fornecedor).subscribe(f=>{
          console.log("update: " + this.listService.observableSubject + f.nome)
        }); 
        this.activeModal.close();
      }
    }  
  }


  deleteEntry() {
    this.listService.deleteFornecedor();
    this.activeModal.close();
  }


  addPhone() {
    console.log('the hell man' + this.modelTel);
    this.telephone.numeroTelefone = this.modelTel;
    
    this.fornecedor.telefone.forEach(tel => this.telephones.push(tel));
    this.telephones.push(this.telephone);
    this.fornecedor.telefone = this.telephones;
    this.telephonesSubject.next(this.telephones);
    this.modelTel = "";
  }

  @ViewChild('bdInput') birthdayInput;
  switchToDatePicker() {
    this.birthdayInput.nativeElement.value;
  }

  getEmpresaName(empresa: Empresa) {
    if (empresa) {
      return empresa.nomeFantasia; //GAMBI
    } else {
      return null;
    }
  }

  isValid(): boolean{
    
    this.registroIsValid = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(this.fornecedor.numeroRegistro);
    this.fornecedor.numeroRegistro.replace("/\D+/g", "");
    if(this.registroIsValid && this.fornecedor.numeroRegistro.length < 14){//is person
      if(this.fornecedor.dataNascimento != null){
        this.dataNascimentoIsValid = false;
        this.dataNascimentoMessage = "Data nascimento is an obligatory field for Persons";
      }else{
        var day = this.model.day;
        var month = this.model.month;
        var year = this.model.year;
        var structDate = new Date(year, month, day);
        this.fornecedor.dataNascimento = structDate.toISOString();
      }  
    }

    if(this.empresaName.value == 'Empresa'){
      this.empresaIsValid = false;
      console.log(this.nameIsValid);
    }
    if(!this.fornecedor.nome){
      this.nameIsValid = false;
    }else{
      var empresa = this._empresaListService.getEmpresaById(this.fornecedor.empresaId);
      if(empresa.uf == "PR"){
        if(year > this.calendar.getToday().year - 18){
          this.dataNascimentoIsValid = false;
          this.dataNascimentoMessage = "Fornecedores of empresas from PR must be over 18 years of age.";
        }
      }
    } 
    if(!this.registroIsValid || !this.dataNascimentoIsValid || !this.empresaIsValid || !this.nameIsValid){
      return false;
    }
    return true;
  }
}
