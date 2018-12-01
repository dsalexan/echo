import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import { AES, lib, PBKDF2, pad, mode } from 'crypto-js'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LoginPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }
  
  clickLogin() {
    // document.getElementById("teste").textContent = this.dados["usuario"];
    this.verificarCredenciais(this.dados["usuario"], this.dados["senha"])
  }

  verificarCredenciais(user, senha) {
    user = (user == null || user == '') ? '' : user
    senha = (senha == null || user == '') ? '' : senha

    if(user != '' && senha != '') {
      // Loading message
      let loading = this.loadingCtrl.create({
        content: 'Carregando...'
      });
      loading.present();
      
      // Encrypt
      var encryptSenha = this.encrypt(senha, 'Achilles');

      var path = 'http://104.248.9.4:3000/api/auth/login' //?login='+ user + '&senha='+ 
      var params = 'login='+ user + '&senha='+ encryptSenha

      //var path = 'http://104.248.9.4.4:3000/api/auth/login?login='+ user + '&senha='+ senha
      this.http.post(path, {'login': user, 'senha': encryptSenha}).map(res => res.json()).subscribe(data => {
        loading.dismiss();
        
        if(data.auth && data.data != undefined) {
          this.storage.set("aluno_ra", data.data.ra)
          this.storage.set("aluno_nome", data.data.nome)
          this.storage.set("aluno_senha", senha)
          this.storage.set("aluno_login", data.data.login)
          this.storage.set("aluno_email", data.data.email == null ? "" : data.data.email)
          this.storage.set("aluno_telefone", data.data.telefone == null ? "" : data.data.telefone)

          this.navCtrl.push(HomePage, {dados: this.dados});
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Verifique as informações inseridas',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err) //quando autenticacao falha, retorna erro 401, com auth false
        let alert = this.alertCtrl.create({
          title: 'Ops!',
          subTitle: 'Verifique as informações inseridas',
          buttons: ['Dismiss']
        });
        alert.present();
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

  encrypt (msg, pass) {
    var keySize = 256;
    var iterations = 100;

    var salt = lib.WordArray.random(128/8);
    
    var key = PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });
  
    var iv = lib.WordArray.random(128/8);
    
    var encrypted = AES.encrypt(msg, key, { 
      iv: iv, 
      padding: pad.Pkcs7,
      mode: mode.CBC
      
    });
    
    // salt, iv will be hex 32 in length
    // append them to the ciphertext for use  in decryption
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
  }
}
