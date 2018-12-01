import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http'; 

import { LoginPage } from '../login/login'
import { CaronaPage } from '../carona/carona'
import { ViagemMotoristaPage } from '../viagem-motorista/viagem-motorista';
import { ProcurarCaronaPage } from '../procurar-carona/procurar-carona';


@IonicPage()
@Component({
  selector: 'page-res-carona',
  templateUrl: 'res-carona.html',
})
export class ResCaronaPage {
  dados: any;
  viagens: {}
  loc: {}
  viagens_disponiveis = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    this.dados = this.navParams.get("p1");
    this.loc = this.navParams.get("loc");
    this.viagens = this.navParams.get("p2")

  }

  selecionar(item){
    console.log("item: ")
    console.log(item)
    
    this.storage.get("aluno_ra").then((usu) => {
      if(item["id_motorista"]==usu){
        this.navCtrl.push(ViagemMotoristaPage, {viagem: item, loc:this.loc})
      }
      
      else{
        var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/passageiro?id=' + usu

        // verificar se ele ja ta reservado na viagem
        this.http.get(path).map(res => res.json()).subscribe(data => {
          console.log("Verificando se há reservas para o mesmo passageiro na viagem")
          if(data.data.length != 0) { //passageiro já solicitou reserva
            console.log(data.data)
            //this.navCtrl.push(ResCaronaPage, {p1: data.data, p2:this.viagem, loc:this.loc});
          } else { // passageiro ainda não solicitou reserva
            this.navCtrl.push(CaronaPage, {viagem: item, loc:this.loc})    
          }
        }, (err) => {
          console.log(err)
        })

      }
    })
  }

  validaViagens(){
    this.dados.forEach(viagem =>{
      console.log(viagem.qtd_vagas)
      if(viagem.qtd_vagas > 0){
        this.viagens_disponiveis.push(viagem)
      }
      console.log(this.viagens_disponiveis)
    })
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession();
    console.log('viagens', this.dados)
    console.log(this.loc)
    if(this.dados.length == 0){
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Não há viagens para esta busca!',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.push(ProcurarCaronaPage);
    }
    console.log('ionViewDidLoad ResCaronaPage');
    this.validaViagens();
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

}
