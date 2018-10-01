import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    document.getElementById("tabs").style.display = "block"
    document.getElementById("botao_menu").style.display = "block"
  }
  
  storeUser(user) {
    this.storage.set("usuario", user)
  }
  
  clickLogin() {
    document.getElementById("teste").textContent = this.dados["usuario"];
    if (this.verificarCredenciais(this.dados["usuario"], this.dados["senha"])) {
      this.storeUser(this.dados["usuario"]);

      if (this.primeiroLogin()) {
        this.navCtrl.push(CadastroPage, {dados: this.dados});
      }

      if (this.dados["lembrar"]) {
        this.storage.set("senha", this.dados["senha"])
      }

      // this.navCtrl.push(Home);
    } else {
      let alert = this.alertCtrl.create( {
        title: 'Ops!',
        subTitle: 'Verifique as informações inseridas',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  verificarCredenciais(user, senha) {
    user = (user == null || user == '') ? '' : user
    senha = (senha == null || user == '') ? '' : senha

    if(user != '' && senha != '') {
      //return true
      this.http.get('http://localhost:3000/api/alunos/get/senha?login=user0&senha=123456').map(res => res.json()).subscribe(data => {
        console.log('RETORNO QUERY', data)
        // if(data.results != null) {
        //   // guardar na sessao as info
        //   return true
        // }
      }, err => {
        console.log(err)
      })

      return false
    } else {
      return false
    }

    // verificar se usuario this.dados["usuario"] existe
    // verificar se a senha this.dados["senha"] esta correta
    // isso por web crawling
  }

  primeiroLogin() {
    // verificar se usuario this.dados["usuario"] já está cadastrado no postgres
    return true;
  }
}
