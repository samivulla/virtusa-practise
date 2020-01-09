import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustoRoutingModule } from './custo-routing.module';
import { CustoComponent } from './custo.component';


@NgModule({
  declarations: [CustoComponent],
  imports: [
    CommonModule,
    CustoRoutingModule
  ]
})
export class CustoModule { }
