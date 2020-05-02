import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolamundoPage } from './holamundo.page';

const routes: Routes = [
  {
    path: '',
    component: HolamundoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolamundoPageRoutingModule {}
