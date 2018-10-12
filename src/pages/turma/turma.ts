import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-turma',
  templateUrl: 'turma.html',
})
export class TurmaPage {

  form: FormGroup;
  turma: string;
  nomeProf: string;
  sala: string;
  horario1: string;
  horario2: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
              public storage: Storage) {
    this.getInformations();
  }

  back(){
    this.navCtrl.push(HomePage);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  getInformations(){ // busca informacoes da turma no banco
    this.turma = 'Engenharia de Software';
    this.nomeProf = 'Fábio';
    this.sala = '404';
    this.horario1 = 'Segunda 13:30';
    this.horario2 = 'Quarta 13:30';
  }

  novaAtiv(){

}

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad TurmaPage');
  }

}
