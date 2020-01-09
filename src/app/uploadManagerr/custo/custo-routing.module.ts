import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustoComponent } from './custo.component';

const routes: Routes = [{ path: '', component: CustoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustoRoutingModule { }
