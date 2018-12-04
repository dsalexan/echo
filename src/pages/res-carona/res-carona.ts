import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login'
import { CaronaPage } from '../carona/carona'
import { ViagemMotoristaPage } from '../viagem-motorista/viagem-motorista';
import { ProcurarCaronaPage } from '../procurar-carona/procurar-carona';
import { ViagemPassageiroPage } from '../viagem-passageiro/viagem-passageiro';


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

  temp_p1 = []
  temp_p2 = {}
  temp_loc = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public alertCtrl: AlertController) {
    this.dados = this.navParams.get("p1");
    this.loc = this.navParams.get("loc");
    this.viagens = this.navParams.get("p2")

    this.temp_p1 = this.navParams.get("p1");
    this.temp_p2 = this.navParams.get("p2")
    this.temp_loc = this.navParams.get("loc");
  }

  clickBack() {
    this.navCtrl.push(ProcurarCaronaPage)
  }

  selecionar(item){
    // console.log("item: ")
    // console.log(item)
    
    this.storage.get("aluno_ra").then((usu) => {
      if(item["id_motorista"]==usu){
        this.navCtrl.push(ViagemMotoristaPage, {viagem: item, loc:this.loc})
      }
      else{
        //console.log("Verificando se há reservas para o mesmo passageiro na viagem")
        var path = 'http://104.248.9.4:3000/api/caronas/get/viagem/passageiro/reserva?id_viagem=' + item.id_viagem + '&id_passageiro=' + usu
        this.http.get(path, {headers: new HttpHeaders()}).subscribe(data => {
        // this.http.get(path).map(res => res.json()).subscribe(data => {
          if(data["success"]){
            if(data["data"].length == 0){ //nao ta reservado
              this.navCtrl.push(CaronaPage, {viagem: item, loc:this.loc, disponiveis: this.viagens_disponiveis, tp1: this.temp_p1, tp2:this.temp_p2, tloc:this.temp_loc})
            }
            else{ //busca infos pra enviar pra prox pagina
              var path2 = 'http://104.248.9.4:3000/api/caronas/get/viagem/passageiro?id=' + usu
              this.http.get(path2, {headers: new HttpHeaders()}).subscribe(data2 => {
              // this.http.get(path2).map(res => res.json()).subscribe(data2 => {
                if(data2["success"] && data2["data"].length > 0){
                  data2["data"].forEach(viagem =>{
                    if(viagem.id_viagem == item.id_viagem){ //passageiro já solicitou reserva
                      this.navCtrl.push(ViagemPassageiroPage, {viagem: viagem, loc: this.loc})
                    }
                  })
                }
              })
            }
          } else {
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Fechar']
              });
              alert.present();
          }
        })
      }
    })
  }

  validaViagens(){
    this.dados.forEach(viagem =>{
      //console.log(viagem.qtd_vagas)
      if(viagem.qtd_vagas > 0){
        this.viagens_disponiveis.push(viagem)
      }
      //console.log(this.viagens_disponiveis)
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
    //console.log('viagens', this.dados)
    //console.log(this.loc)
    if(this.dados.length == 0){
      let alert = this.alertCtrl.create({
        title: 'Ops!',
        subTitle: 'Não há viagens para esta busca!',
        buttons: ['Fechar']
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
