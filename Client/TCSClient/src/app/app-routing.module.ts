import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';

const routes: Routes = [
  { path: 'empresa', component: EmpresaComponent },
  { path: 'fornecedor', component: FornecedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
