import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigPage } from './configuracoes';

@NgModule({
  declarations: [
    ConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigPage),
  ],
})
export class ConfiguracoesPageModule {}
