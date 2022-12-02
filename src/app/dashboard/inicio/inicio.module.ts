import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, InicioRoutingModule, NgApexchartsModule],
})
export class InicioModule {}
