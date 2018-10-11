import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-oferecer-carona',
  templateUrl: 'oferecer-carona.html',
})

export class OferecerCaronaPage {

  viagem = {}
  lista = []
  loc = new Object
  origem = []
  destino = []
  horateste = {}
  c = 0

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.origem = new Array
    this.destino = new Array
  }

  criaDic() {
//    console.log(this.origem.length);
    for (var i = 0; i < this.origem.length; i++) {
      //se o elemento da lista não está no horateste, adiciona
      if (!(String(this.origem[i]) in this.horateste))
        this.horateste[String(this.origem[i])] = ''
    }
    console.log('\norigem:')
    console.log(this.origem)
  }


  onChange($event) {
    console.log($event);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  mostrarLocalidade(){
    var path = 'http://localhost:3000/api/caronas/get/localidades'
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != undefined) {
        console.log(data)
        data.data.forEach(element => {
          this.loc[element["id_local"]] = element ["descricao"]
          this.lista.push(element)
        });
        //console.log(this.loc)
      }

    }, (err) => {
        console.log(err)
    })
  }


  oferecer(){
    //salvar no banco de dados]
    //console.log('\norigem:')
    //console.log(this.origem)
    Object.keys(this.horateste).forEach( key => {
      //se a chave nao esta na origem, deleta
      //if (){
      if (! (this.origem.includes(parseInt(key)))) {
        console.log('\ndeletando:')
        console.log(key)
        delete this.horateste[key]
      }
    })
    //console.log('\nhorateste:')
    //console.log(this.horateste)

    console.log(this.viagem)
    
    var path
    var path2

    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/caronas/post/viagem?id_motorista='+ usu + '&dia='+ this.viagem["data"] + '&preco='+ this.viagem["preco"] + '&qtd_vagas=' + this.viagem["qtd_vagas"] + '&descricao='+ this.viagem["descricao"]
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          var id = data.data.id
          Object.keys(this.horateste).forEach( key => {
            path = 'http://localhost:3000/api/caronas/post/viagem/origem?id_viagem=' + id + '&origem=' + key  + '&hora=' + this.horateste[key]
            console.log(path)
            this.http.get(path).map(res => res.json()).subscribe(or => {
              if(data.success) {
              }else {
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            })
          })
        
          var i = 0
          while (i < this.origem.length) {
            path2 = 'http://localhost:3000/api/caronas/post/viagem/destino?id_viagem=' + id + '&destino=' + this.origem[i]
            console.log(path2)
            this.http.get(path).map(res => res.json()).subscribe(or => {
              if(data.success) {
                i++
              }else {
                let alert = this.alertCtrl.create({
                  title: 'Ops!',
                  subTitle: 'Tente novamente',
                  buttons: ['Dismiss']
                });
                alert.present();
              }
            })
          }
        } else {
          let alert = this.alertCtrl.create({
            title: 'Ops!',
            subTitle: 'Tente novamente',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      }, (err) => {
        console.log(err)
      })
    })
  }

  ionViewWillEnter() {
    this.checkSession();
    this.mostrarLocalidade();
    console.log('ionViewWillEnter OferecerCaronaPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}