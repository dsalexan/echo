import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { LoginPage } from '../login/login'
import { ViagemMotoristaPage } from '../viagem-motorista/viagem-motorista';
import { ViagemPassageiroPage } from '../viagem-passageiro/viagem-passageiro';

@IonicPage()
@Component({
  selector: 'page-minhas-caronas',
  templateUrl: 'minhas-caronas.html',
})
export class MinhasCaronasPage {

  viagens_motorista= [];
  reservas_motorista= {};
  viagens_passageiro = [];
  loc = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
  }

  abrirMotorista(v){
    console.log(v)
    this.navCtrl.push(ViagemMotoristaPage, {viagem: v, loc:this.loc});
  }

  abrirPassageiro(v){
    this.navCtrl.push(ViagemPassageiroPage, {viagem: v, loc:this.loc});
  }

  caronasMotorista(){
    var path;
    this.storage.get("aluno_ra").then((usu) => {
      
      path = 'http://104.248.9.4:3000/api/caronas/get/viagem/motorista/reserva?id='+ usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          data.data.forEach(element => {
            if(element.id_viagem in Object.keys(this.reservas_motorista)){
              if(element.status_reserva == false && this.reservas_motorista[element.id_viagem] == true)
                this.reservas_motorista[element.id_viagem] = false
            }
            else{
              this.reservas_motorista[element.id_viagem] = element.status_reserva
            }
          })
          
          var path2 = 'http://104.248.9.4:3000/api/caronas/get/viagem/motorista?id='+ usu
          console.log(path2)
          this.http.get(path2).map(res => res.json()).subscribe(data2 => {
            
            if(data2.success) {
              this.viagens_motorista = data2.data;
              console.log(this.viagens_motorista)
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



  caronasPassageiro(){
    var path;
    this.storage.get("aluno_ra").then((usu) => {
      path = 'http://104.248.9.4:3000/api/caronas/get/viagem/passageiro?id='+ usu
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {
        
        if(data.success) {
          this.viagens_passageiro = data.data;
          console.log(this.viagens_passageiro)
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

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  mostrarLocalidade(){
    var path = 'http://104.248.9.4:3000/api/caronas/get/localidades'
    this.http.get(path).map(res => res.json()).subscribe(data => {

      if(data.data[0] != undefined) {
        //console.log(data)
        data.data.forEach(element => {
          this.loc[element["id_local"]] = element ["descricao"]
        });
        //console.log(this.loc)
      }
    }, (err) => {
        console.log(err)
    })
  }

  ionViewWillEnter() {
    this.checkSession();
    this.mostrarLocalidade();
    this.caronasMotorista();
    this.caronasPassageiro();
    console.log('ionViewWillEnter MinhasCaronasPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }
}
