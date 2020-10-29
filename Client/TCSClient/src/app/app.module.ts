import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { EmpresaFormComponent } from './empresa/empresa-form/empresa-form.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component';
import { HomeComponent } from './home/home.component';
import { EmpresaListService } from './empresa/empresa-list.service';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { FornecedorListService } from './fornecedor/fornecedor-list.service';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpresaComponent,
    FornecedorComponent,
    EmpresaFormComponent,
    FornecedorFormComponent,
    HomeComponent,
    PaginationComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [EmpresaListService, FornecedorListService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
