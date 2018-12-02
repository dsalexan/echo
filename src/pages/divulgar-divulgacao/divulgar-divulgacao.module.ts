import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DivulgarDivulgacaoPage } from './divulgar-divulgacao';

@NgModule({
  declarations: [
    DivulgarDivulgacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DivulgarDivulgacaoPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DivulgarDivulgacaoPageModule {}
