import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { copyInputAttributes } from 'ionic-angular/umd/util/dom';


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
              public storage: Storage, public alertCtrl: AlertController) {
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
    var categoria;
    var date;
    var desc;
    var hora;

    const newCategoria = this.alertCtrl.create({
      title: 'Adicionar Evento',
      message: "Escolha o tipo de atividade:",
      inputs: [
        {
          type: 'radio',
          label: 'Prova',
          checked: true,
          value: '0'
        },
        {
          type: 'radio',
          label: 'Atividade',
          value: '1'
        },
        {
          type: 'radio',
          label: 'Trabalho',
          value: '2'
        },
        {
          type: 'radio',
          label: 'Cancelamento',
          value: '3'
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: values => {
            console.log('Cancelado!');
          }
        },
        {
          text: 'Adicionar',
          handler: (values: string) => {
            console.log('Salvo! Valor: ' + values);
            categoria = values;
            newData.present();
          }
        }
      ]
    });

    const newData = this.alertCtrl.create({
      title: 'Adicionar Evento',
      inputs: [
        {
          name: 'data',
          placeholder: 'dd/mm',
          type: 'date'
        },
        {
          name: 'horario',
          placeholder: 'hh:mm',
          type: 'time'
        },
        {
          name: 'descricao',
          placeholder: 'Descrição'
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          handler: values => {
            console.log('Cancelado!');
          }
        },
        {
          text: 'Adicionar',
          handler: values => {
            console.log('Salvo! Valor: ' + values);
            date = values.data;
            hora = values.horario;
            desc = values.descricao;
  
            console.log('Cat: ' + categoria +
            '\nData: ' + date +
            '\nHora: ' + hora +
            '\nDesc: ' + desc);

            this.upToBD(categoria,date,hora,desc);
          }
        }
      ]
    });


    newCategoria.present();
  }

  upToBD(categoria,date,hora,desc){
    /*this.storage.get('aluno_ra').then((usu)=>{
      // não sei fazer isso ainda
    });*/
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('ionViewDidLoad TurmaPage');
  }

}
