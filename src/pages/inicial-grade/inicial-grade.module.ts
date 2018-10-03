import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicialGradePage } from './inicial-grade';

@NgModule({
  declarations: [
    InicialGradePage,
  ],
  imports: [
    IonicPageModule.forChild(InicialGradePage),
  ],
})
export class InicialGradePageModule {}
