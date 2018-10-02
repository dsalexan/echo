import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Platform, Nav } from 'ionic-angular';

import { LoginPage } from '../login/login';
import {ConfigPage} from '../configuracoes/configuracoes'


@IonicPage()
@Component({
  selector: 'perfil-page',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  @ViewChild(Nav) nav: Nav;

  @ViewChild('fileInput') fileInput;
  isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  profileDetails: any[];
  private isDisabled: boolean = true;
  private caption_name: string = "EDITAR";
  account: {
    user_RA: string,user_name: string, user_email: string, user_password: string, profile_image: string,
    full_name: string, about: string
  } = {
    user_RA: '111111',
    user_name: 'userName',
    user_email: 'user@mail.net',
    user_password: 'password',
    profile_image: ' ',
    full_name: 'Nome do Usuário',
    about: 'Bacharel em Ciência e Tecnologia'
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController, public storage: Storage,
              public navParams: NavParams) {

    this.form = formBuilder.group({
      image: [''], user_RA: [''], user_name: [''], user_password: [''], user_email: [''], user_state: [''],
    });


    this.profileDetails = [
      {
        full_name: "Nome do Usuário",
        about: "Bacharelado em Ciência e Tecnologia"
      },
    ];

  }

  getInfomations(){ //busca no banco de dados as informações do usuario
  }

  clickConfig() { // vai para a pagina de configurações
    this.nav.push(ConfigPage);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewDidLoad() {
    this.checkSession()
    console.log('ionViewDidLoad PerfilPage');
    document.getElementById("tabs").style.display = "none"
    document.getElementById("botao_menu").style.display = "none"
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({'image': imageData});
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

/*
 editProfile() {
    if (this.caption_name == "EDITAR") {
      this.isDisabled = false;
      this.caption_name = "CANCELAR";
    } else if (this.caption_name == "SALVAR") {

      console.log(this.isReadyToSave);
      if (!(this.account.user_name && this.account.user_email && this.account.user_password && this.account.user_RA)) {
        let toast = this.toastCtrl.create({
          message: "Campos Inválidos!",
          duration: 2000,
          position: 'bottom'
        });
        toast.present();
      } else {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          /*carregar dados do usuário no banco
          *...
          *...
          *...

         let toast = this.toastCtrl.create({
          message: "You have successfully updated your details .",
          duration: 2000,
          position: 'top'
        });
        this.caption_name = "EDITAR";
        this.isDisabled = true;
        toast.present();

      }, 2000);
    }
  } else if (this.caption_name == "CANCELAR") {
    this.isDisabled = true;
    this.caption_name = "EDITAR";
  }
}
*/

}
