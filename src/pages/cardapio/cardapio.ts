import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login';

/**
 * Generated class for the CardapioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  almoco_prato_base = [];
  almoco_prato_principal = [];
  almoco_opcao_vegetariana = [];
  almoco_guarnicao = [];
  almoco_sobremesa = [];
  
  janta_prato_base = [];
  janta_prato_principal = [];
  janta_opcao_vegetariana = [];
  janta_guarnicao = [];
  janta_sobremesa = [];
  semana = "oi";

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.checkSession();
  }

  clickBack() {
    this.navCtrl.pop()
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      } else {
        this.checkCardapio();
      }
    })
  }

  checkCardapio() {
    this.storage.get("cardapio_atual").then((cardapio) => {
      console.log(JSON.parse(cardapio))
      if(cardapio == null) {

        let loading = this.loadingCtrl.create({
          content: 'Carregando...'
        });
        loading.present();
    
        var path = 'http://localhost:3000/api/ru/cardapio'

        this.http.get(path).map(res => res.json()).subscribe(data => {
          loading.dismiss();
          if (data.success) {
            this.storage.set("cardapio_atual", data.cardapio_json.json_cardapio)
            this.storage.set("cardapio_data_atualizacao", data.cardapio_json.data.data_solicitacao)

            this.semana = JSON.parse(data.cardapio_json.json_cardapio)["semana"]
            
            var cardapio = JSON.parse(data.cardapio_json.json_cardapio)["cardapio"]
            
            this.almoco_prato_base = [cardapio.almoco.segunda.prato_base, cardapio.almoco.terca.prato_base, cardapio.almoco.quarta.prato_base, cardapio.almoco.quinta.prato_base, cardapio.almoco.sexta.prato_base];
            this.almoco_prato_principal = [cardapio.almoco.segunda.prato_principal, cardapio.almoco.terca.prato_principal, cardapio.almoco.quarta.prato_principal, cardapio.almoco.quinta.prato_principal, cardapio.almoco.sexta.prato_principal];
            this.almoco_opcao_vegetariana = [cardapio.almoco.segunda.opcao_vegetariana, cardapio.almoco.terca.opcao_vegetariana, cardapio.almoco.quarta.opcao_vegetariana, cardapio.almoco.quinta.opcao_vegetariana, cardapio.almoco.sexta.opcao_vegetariana];
            this.almoco_guarnicao = [cardapio.almoco.segunda.guarnicao, cardapio.almoco.terca.guarnicao, cardapio.almoco.quarta.guarnicao, cardapio.almoco.quinta.guarnicao, cardapio.almoco.sexta.guarnicao];
            this.almoco_sobremesa = [cardapio.almoco.segunda.sobremesa, cardapio.almoco.terca.sobremesa, cardapio.almoco.quarta.sobremesa, cardapio.almoco.quinta.sobremesa, cardapio.almoco.sexta.sobremesa];
            
            this.janta_prato_base = [cardapio.janta.segunda.prato_base, cardapio.janta.terca.prato_base, cardapio.janta.quarta.prato_base, cardapio.janta.quinta.prato_base, cardapio.janta.sexta.prato_base];
            this.janta_prato_principal = [cardapio.janta.segunda.prato_principal, cardapio.janta.terca.prato_principal, cardapio.janta.quarta.prato_principal, cardapio.janta.quinta.prato_principal, cardapio.janta.sexta.prato_principal];
            this.janta_opcao_vegetariana = [cardapio.janta.segunda.opcao_vegetariana, cardapio.janta.terca.opcao_vegetariana, cardapio.janta.quarta.opcao_vegetariana, cardapio.janta.quinta.opcao_vegetariana, cardapio.janta.sexta.opcao_vegetariana];
            this.janta_guarnicao = [cardapio.janta.segunda.guarnicao, cardapio.janta.terca.guarnicao, cardapio.janta.quarta.guarnicao, cardapio.janta.quinta.guarnicao, cardapio.janta.sexta.guarnicao];
            this.janta_sobremesa = [cardapio.janta.segunda.sobremesa, cardapio.janta.terca.sobremesa, cardapio.janta.quarta.sobremesa, cardapio.janta.quinta.sobremesa, cardapio.janta.sexta.sobremesa];
            
            let alert = this.alertCtrl.create({
              message: 'Cardápio atualizado',
              buttons: ['Ok'],
              cssClass: 'alertClass'
            });
            alert.present();
          }
          else {
            let alert = this.alertCtrl.create({
              message: 'Problema ao carregar o cardápio',
              buttons: ['Ok'],
              cssClass: 'alertClass'
            });
            alert.present();
          }
        })

      } else {
        this.semana = JSON.parse(cardapio)["semana"]
        var cardapio = JSON.parse(cardapio)["cardapio"]

        let loading = this.loadingCtrl.create({
          content: 'Carregando...'
        });
        loading.present();   

        this.almoco_prato_base = [cardapio.almoco.segunda.prato_base, cardapio.almoco.terca.prato_base, cardapio.almoco.quarta.prato_base, cardapio.almoco.quinta.prato_base, cardapio.almoco.sexta.prato_base];
        this.almoco_prato_principal = [cardapio.almoco.segunda.prato_principal, cardapio.almoco.terca.prato_principal, cardapio.almoco.quarta.prato_principal, cardapio.almoco.quinta.prato_principal, cardapio.almoco.sexta.prato_principal];
        this.almoco_opcao_vegetariana = [cardapio.almoco.segunda.opcao_vegetariana, cardapio.almoco.terca.opcao_vegetariana, cardapio.almoco.quarta.opcao_vegetariana, cardapio.almoco.quinta.opcao_vegetariana, cardapio.almoco.sexta.opcao_vegetariana];
        this.almoco_guarnicao = [cardapio.almoco.segunda.guarnicao, cardapio.almoco.terca.guarnicao, cardapio.almoco.quarta.guarnicao, cardapio.almoco.quinta.guarnicao, cardapio.almoco.sexta.guarnicao];
        this.almoco_sobremesa = [cardapio.almoco.segunda.sobremesa, cardapio.almoco.terca.sobremesa, cardapio.almoco.quarta.sobremesa, cardapio.almoco.quinta.sobremesa, cardapio.almoco.sexta.sobremesa];
        
        this.janta_prato_base = [cardapio.janta.segunda.prato_base, cardapio.janta.terca.prato_base, cardapio.janta.quarta.prato_base, cardapio.janta.quinta.prato_base, cardapio.janta.sexta.prato_base];
        this.janta_prato_principal = [cardapio.janta.segunda.prato_principal, cardapio.janta.terca.prato_principal, cardapio.janta.quarta.prato_principal, cardapio.janta.quinta.prato_principal, cardapio.janta.sexta.prato_principal];
        this.janta_opcao_vegetariana = [cardapio.janta.segunda.opcao_vegetariana, cardapio.janta.terca.opcao_vegetariana, cardapio.janta.quarta.opcao_vegetariana, cardapio.janta.quinta.opcao_vegetariana, cardapio.janta.sexta.opcao_vegetariana];
        this.janta_guarnicao = [cardapio.janta.segunda.guarnicao, cardapio.janta.terca.guarnicao, cardapio.janta.quarta.guarnicao, cardapio.janta.quinta.guarnicao, cardapio.janta.sexta.guarnicao];
        this.janta_sobremesa = [cardapio.janta.segunda.sobremesa, cardapio.janta.terca.sobremesa, cardapio.janta.quarta.sobremesa, cardapio.janta.quinta.sobremesa, cardapio.janta.sexta.sobremesa];
        
        loading.dismiss();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardapioPage');
  }

  atualizarCardapio() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    loading.present();

    var path = 'http://localhost:3000/api/ru/cardapio'

    this.http.get(path).map(res => res.json()).subscribe(data => {
      loading.dismiss();
      if (data.success) {
        this.storage.set("cardapio_atual", data.cardapio_json.json_cardapio)
        this.storage.set("cardapio_data_atualizacao", data.cardapio_json.data.data_solicitacao)

        this.semana = JSON.parse(data.cardapio_json.json_cardapio)["semana"]
        
        var cardapio = JSON.parse(data.cardapio_json.json_cardapio)["cardapio"]
        
        this.almoco_prato_base = [cardapio.almoco.segunda.prato_base, cardapio.almoco.terca.prato_base, cardapio.almoco.quarta.prato_base, cardapio.almoco.quinta.prato_base, cardapio.almoco.sexta.prato_base];
        this.almoco_prato_principal = [cardapio.almoco.segunda.prato_principal, cardapio.almoco.terca.prato_principal, cardapio.almoco.quarta.prato_principal, cardapio.almoco.quinta.prato_principal, cardapio.almoco.sexta.prato_principal];
        this.almoco_opcao_vegetariana = [cardapio.almoco.segunda.opcao_vegetariana, cardapio.almoco.terca.opcao_vegetariana, cardapio.almoco.quarta.opcao_vegetariana, cardapio.almoco.quinta.opcao_vegetariana, cardapio.almoco.sexta.opcao_vegetariana];
        this.almoco_guarnicao = [cardapio.almoco.segunda.guarnicao, cardapio.almoco.terca.guarnicao, cardapio.almoco.quarta.guarnicao, cardapio.almoco.quinta.guarnicao, cardapio.almoco.sexta.guarnicao];
        this.almoco_sobremesa = [cardapio.almoco.segunda.sobremesa, cardapio.almoco.terca.sobremesa, cardapio.almoco.quarta.sobremesa, cardapio.almoco.quinta.sobremesa, cardapio.almoco.sexta.sobremesa];
        
        this.janta_prato_base = [cardapio.janta.segunda.prato_base, cardapio.janta.terca.prato_base, cardapio.janta.quarta.prato_base, cardapio.janta.quinta.prato_base, cardapio.janta.sexta.prato_base];
        this.janta_prato_principal = [cardapio.janta.segunda.prato_principal, cardapio.janta.terca.prato_principal, cardapio.janta.quarta.prato_principal, cardapio.janta.quinta.prato_principal, cardapio.janta.sexta.prato_principal];
        this.janta_opcao_vegetariana = [cardapio.janta.segunda.opcao_vegetariana, cardapio.janta.terca.opcao_vegetariana, cardapio.janta.quarta.opcao_vegetariana, cardapio.janta.quinta.opcao_vegetariana, cardapio.janta.sexta.opcao_vegetariana];
        this.janta_guarnicao = [cardapio.janta.segunda.guarnicao, cardapio.janta.terca.guarnicao, cardapio.janta.quarta.guarnicao, cardapio.janta.quinta.guarnicao, cardapio.janta.sexta.guarnicao];
        this.janta_sobremesa = [cardapio.janta.segunda.sobremesa, cardapio.janta.terca.sobremesa, cardapio.janta.quarta.sobremesa, cardapio.janta.quinta.sobremesa, cardapio.janta.sexta.sobremesa];
        
        let alert = this.alertCtrl.create({
          message: 'Cardápio atualizado',
          buttons: ['Ok'],
          cssClass: 'alertClass'
        });
        alert.present();
      }
      else {
        let alert = this.alertCtrl.create({
          message: 'Problema ao carregar o cardápio',
          buttons: ['Ok'],
          cssClass: 'alertClass'
        });
        alert.present();
      }
    })

  }
}
