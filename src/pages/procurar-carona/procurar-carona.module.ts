import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProcurarCaronaPage } from './procurar-carona';

@NgModule({
  declarations: [
    ProcurarCaronaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProcurarCaronaPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProcurarCaronaPageModule {}
