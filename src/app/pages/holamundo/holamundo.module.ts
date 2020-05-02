import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolamundoPageRoutingModule } from './holamundo-routing.module';

import { HolamundoPage } from './holamundo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HolamundoPageRoutingModule
  ],
  declarations: [HolamundoPage]
})
export class HolamundoPageModule {}
