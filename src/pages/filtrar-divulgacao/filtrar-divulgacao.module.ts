import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltrarDivulgacaoPage } from './filtrar-divulgacao';

@NgModule({
  declarations: [
    FiltrarDivulgacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltrarDivulgacaoPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FiltrarDivulgacaoPageModule {}
