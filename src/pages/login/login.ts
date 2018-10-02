import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';

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
  
  clickLogin() {
    // document.getElementById("teste").textContent = this.dados["usuario"];
    this.verificarCredenciais(this.dados["usuario"], this.dados["senha"], this.dados["lembrar"])
  }

  verificarCredenciais(user, senha, lembrar) {
    user = (user == null || user == '') ? '' : user
    senha = (senha == null || user == '') ? '' : senha

    if(user != '' && senha != '') {
      var path = 'http://localhost:3000/api/alunos/get/senha?login='+ user + '&senha='+ senha
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.data[0] != undefined) {

          //this.storage.set("aluno_ra", data.data[0].ra_aluno)
          //this.storage.set("aluno_nome", data.data[0].nome)
          this.storage.set("aluno_user", data.data[0].user)
          //this.storage.set("aluno_login", data.data[0].login_intranet)
          //this.storage.set("aluno_email", data.data[0].email)
          //this.storage.set("aluno_telefone", data.data[0].telefone)
          //this.storage.set("aluno_telefone", data.data[0].telefone)
          
          if (lembrar) {
            this.storage.set("aluno_senha", this.dados["senha"])
          }
          
          this.navCtrl.push(HomePage, {dados: this.dados});
          //this.navCtrl.push(CadastroPage, {dados: this.dados});
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Verifique as informações inseridas',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Verifique as informações inseridas',
        buttons: ['Dismiss']
      });
      alert.present();
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
