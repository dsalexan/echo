import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OferecerCaronaPage } from './oferecer-carona';

@NgModule({
  declarations: [
    OferecerCaronaPage,
  ],
  imports: [
    IonicPageModule.forChild(OferecerCaronaPage),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OferecerCaronaPageModule {}
