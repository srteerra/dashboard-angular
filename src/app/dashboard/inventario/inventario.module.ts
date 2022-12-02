import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './components/inventario/inventario.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [InventarioComponent],
  imports: [CommonModule, InventarioRoutingModule, MatTableModule],
})
export class InventarioModule {}
