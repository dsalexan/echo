import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditaProdutoPage } from './edita-produto';

@NgModule({
  declarations: [
    EditaProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditaProdutoPage),
  ],
})
export class EditaProdutoPageModule {}
