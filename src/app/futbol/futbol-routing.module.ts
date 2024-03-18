import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FutbolPage } from './futbol.page';

const routes: Routes = [
  {
    path: '',
    component: FutbolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FutbolPageRoutingModule {}
