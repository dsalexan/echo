import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GradeCadastroEventoPage } from './grade-cadastro-evento';

@NgModule({
  declarations: [
    GradeCadastroEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(GradeCadastroEventoPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GradeCadastroEventoPageModule {}
