import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicialCaronaPage } from './inicial-carona';

@NgModule({
  declarations: [
    InicialCaronaPage,
  ],
  imports: [
    IonicPageModule.forChild(InicialCaronaPage),
  ],
})
export class InicialCaronaPageModule {}
