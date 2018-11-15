import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { InicialDivulgacaoPage } from '../inicial-divulgacao/inicial-divulgacao';


export class PopoverDivulgarPage {

  data: String;
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

}


@IonicPage()
@Component({
  selector: 'page-divulgar-divulgacao',
  templateUrl: 'divulgar-divulgacao.html',
})

export class DivulgarDivulgacaoPage {

  item = {} // {} tipo: objetoF
  lista = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public popOver: PopoverController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter DivulgarDivulgacaoPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
    this.PreencherListaTipo()
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  abrirData(myEvent) {
    let popover = this.popOver.create(PopoverDivulgarPage);
    popover.present({
      ev: myEvent
    });
  }

  onChange($event) {
    console.log($event);
  }

  PreencherListaTipo(){
    var path = 'http://localhost:3000/api/divulgacao/get/todos/tipo'
    this.http.get(path).map(res => res.json()).subscribe(data => {
      data.data.forEach(tipo => {
        this.lista.push({id_tipo:tipo.id_tipo, nome_tipo:tipo.nome_tipo})
      })
    }, (err) => {
        console.log(err)
    })
  }

  divulgar(){
    this.storage.get("aluno_ra").then((usu) => {
      var path = 'http://localhost:3000/api/divulgacao/post/divulgacao?ra_aluno='+ usu + 'id_tipo=' + this.item["categoria"] + '&valor='+ this.item["valor"] + '&dia='+ this.item["dia"] + '&hora_inicio' + this.item["hora_inicio"] + '&hora_fim' + this.item["hora_fim"] + '&quantidade=' + this.item["quantidade"] + '&descricao='+ this.item["descricao"]
      console.log(path)

    })
  }
}

  // teste(){
  //   console.log(this.item)
  // }


// export class OferecerCaronaPage {

//   viagem = {}
//   lista = []
//   loc = new Object
//   origem = []
//   destino = []
//   horateste = {}
//   c = 0

//   constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController, public popOver: PopoverController) {
    
//   }

  

  // oferecer(){
  //   //salvar no banco de dados]
  //   //console.log('\norigem:')
  //   //console.log(this.origem)
  //   Object.keys(this.horateste).forEach( key => {
  //     //se a chave nao esta na origem, deleta
  //     //if (){
  //     if (! (this.origem.includes(parseInt(key)))) {
  //       console.log('\ndeletando:')
  //       console.log(key)
  //       delete this.horateste[key]
  //     }
  //   })
  //   //console.log('\nhorateste:')
  //   //console.log(this.horateste)

  //   console.log(this.viagem)
    
  //   var path
  //   var path2

  //   this.storage.get("aluno_ra").then((usu) => {
  //     path = 'http://localhost:3000/api/caronas/post/viagem?id_motorista='+ usu + '&dia='+ this.viagem["data"] + '&preco='+ this.viagem["preco"] + '&qtd_vagas=' + this.viagem["qtd_vagas"] + '&descricao='+ this.viagem["descricao"]
  //     console.log(path)
  //     this.http.get(path).map(res => res.json()).subscribe(data => {

  //       if(data.success) {
  //         var id = data.data.id_viagem
  //         var erro = 0
  //         Object.keys(this.horateste).forEach( key => {
  //           path = 'http://localhost:3000/api/caronas/post/viagem/origem?id_viagem=' + id + '&hora=' + this.horateste[key] + '&origem=' + key 
  //           console.log(path)
  //           this.http.get(path).map(res => res.json()).subscribe(or => {
  //             if(data.success) {
  //             }else {
  //               erro = 1
  //               let alert = this.alertCtrl.create({
  //                 title: 'Ops!',
  //                 subTitle: 'Tente novamente',
  //                 buttons: ['Dismiss']
  //               });
  //               alert.present();
  //             }
  //           })
  //         })
        
  //         var i = 0
  //         while (i < this.destino.length) {
  //           path2 = 'http://localhost:3000/api/caronas/post/viagem/destino?id_viagem=' + id + '&destino=' + this.destino[i]
  //           console.log(path2)
  //           i++
  //           this.http.get(path2).map(res => res.json()).subscribe(or => {
  //             if(data.success) {
  //             }else {
  //               erro = 1
  //               let alert = this.alertCtrl.create({
  //                 title: 'Ops!',
  //                 subTitle: 'Tente novamente',
  //                 buttons: ['Dismiss']
  //               });
  //               alert.present();
  //             }
  //           })
  //         }

  //         if(!erro){
  //           let alert = this.alertCtrl.create({
  //             title: 'Ok!',
  //             subTitle: 'Viagem criada com sucesso',
  //             buttons: ['Dismiss']
  //           });
  //           alert.present();
  //           this.navCtrl.push(InicialCaronaPage);
  //         }
  //       } else {
  //         let alert = this.alertCtrl.create({
  //           title: 'Ops!',
  //           subTitle: 'Tente novamente',
  //           buttons: ['Dismiss']
  //         });
  //         alert.present();
  //       }
  //     }, (err) => {
  //       console.log(err)
  //     })
  //   })
  // }
