import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViagemPassageiroPage } from './viagem-passageiro';

@NgModule({
  declarations: [
    ViagemPassageiroPage,
  ],
  imports: [
    IonicPageModule.forChild(ViagemPassageiroPage),
  ],
})
export class ViagemPassageiroPageModule {}
