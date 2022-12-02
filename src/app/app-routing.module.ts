import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/inicio/inicio.module').then(
            (m) => m.InicioModule
          ),
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('./dashboard/inventario/inventario.module').then(
            (m) => m.InventarioModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
