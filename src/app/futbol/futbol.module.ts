import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FutbolPageRoutingModule } from './futbol-routing.module';

import { FutbolPage } from './futbol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FutbolPageRoutingModule
  ],
  declarations: [FutbolPage]
})
export class FutbolPageModule {}
