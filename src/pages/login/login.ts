import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
import { AES, lib, PBKDF2, pad, mode } from 'crypto-js'

import { ENV } from '../../../constants/env'
import endpoints from '../../../constants/endpoints'
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  dados = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public storage: Storage, public http: HttpClient, public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu != null) {
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
      }
    })
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
      var encryptLogin = this.encrypt(user, 'Achilles')
      var encryptSenha = this.encrypt(senha, 'Achilles')

      this.http.post(endpoints.api.auth.login, {'login': encryptLogin, 'senha': encryptSenha}, {headers: new HttpHeaders()}).subscribe((result: any) => {
        loading.dismiss();

        if(result.auth && result.data) {
          this.storage.set("aluno_ra", result.data.ra)
          this.storage.set("aluno_nome", result.data.nome)
          this.storage.set("aluno_senha", senha)
          this.storage.set("aluno_login", result.data.login)
          this.storage.set("aluno_email", result.data.email == null ? "" : result.data.email)
          this.storage.set("aluno_telefone", result.data.telefone == null ? "" : result.data.telefone)

          this.http.get(ENV.HOSTNAME + '/api/unifesp/atestado/analysis/' + result.data.ra, {responseType: 'text'}).subscribe()

          this.navCtrl.push(HomePage, {dados: this.dados});
        }
        /* tslint:enable */
      },(err) => {
        loading.dismiss();
        if(err.status == 401){
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Verifique as informações inseridas',
            buttons: ['Continuar']
          });
          alert.present();
        }else{
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Houve um erro ao tentar falar com o servidor',
            buttons: ['Continuar']
          });
          alert.present();
        }
      })
    } else {
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Verifique as informações inseridas',
        buttons: ['Continuar']
      });
      alert.present();
    }

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
