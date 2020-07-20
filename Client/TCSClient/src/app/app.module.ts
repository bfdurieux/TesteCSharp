import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { EmpresaFormComponent } from './empresa-form/empresa-form.component';
import { FornecedorFormComponent } from './fornecedor-form/fornecedor-form.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpresaComponent,
    FornecedorComponent,
    EmpresaFormComponent,
    FornecedorFormComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
