import { Routes } from '@angular/router';
import { EmpresaComponent } from './app/empresa/empresa.component';
import { FornecedorComponent } from './app/fornecedor/fornecedor.component';

export const appRoutes: Routes = [
  { path: 'empresa', component: 'EmpresaComponent' },
  { path: 'fornecedor', component: 'FornecedorComponent' },
  { path: '', redirectTo: '/empresa', pathMatch: 'full' }
];
