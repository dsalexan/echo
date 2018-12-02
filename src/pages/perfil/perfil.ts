import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Platform, Nav } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ConfigPage } from '../configuracoes/configuracoes'


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
  
  account: {
    user_RA: string,
    user_name: string,
    user_email: string,
    user_telefone: string,
    profile_image: string,
    full_name: string,
    about: string
  }
  
  constructor(public http: Http, public alertCtrl : AlertController, public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public toastCtrl: ToastController, public loadingCtrl: LoadingController, public storage: Storage,
              public navParams: NavParams) {

    this.form = formBuilder.group({
      image: [''],
      user_RA: [''],
      user_name: [''],
      user_telefone: [''],
      user_email: [''],
      user_state: [''],
    });

    this.account = {
      user_RA: '',
      user_name: '',
      user_email: 'E-mail',
      user_telefone: 'Telefone',
      profile_image: '',
      full_name: '',
      about: ''
    }
  }

  getInfomations() { //busca no banco de dados as informações do usuario
    this.storage.get("aluno_login").then((usu) => {
      this.account.user_name = usu
      
      this.storage.get("aluno_ra").then((ra) => {
        this.account.user_RA = ra

        this.storage.get("aluno_email").then((email) => {
          this.account.user_email = email

          this.storage.get("aluno_nome").then((nome) => {
            this.account.full_name = nome

            this.storage.get("aluno_telefone").then((telefone) => {
              this.account.user_telefone = telefone
            })

          })

        })

      })
    })
  }

  clickConfig() { // vai para a pagina de configurações
    this.navCtrl.push(ConfigPage);
  }

  checkSession() {
    this.storage.get("aluno_nome").then((usu) => {
      if(usu == null) {
        this.navCtrl.push(LoginPage);
      }
    })
  }

  ionViewWillEnter() {
    this.checkSession()
    this.getInfomations()
    console.log('ionViewWillEnter PerfilPage');
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

 editProfile() {
  const edit = this.alertCtrl.create({
    title: 'Editar informações',
    inputs: [
      {
        name: 'email',
        placeholder: this.account.user_email
      },
      {
        name: 'telefone',
        placeholder: this.account.user_telefone,
      }
    ],
    
    buttons: [
      {
        text: 'Cancelar',
        handler: values => {
          console.log('Cancelado!');
        }
      },
      {
        text: 'Salvar',
        handler: values => {
          if(values.email != null)
            this.account.user_email = values.email;
          if(values.telefone != null)
            this.account.user_telefone = values.telefone;
          console.log('Salvo! Valor: ' + values);
          this.saveProfile();
        }
      }
    ]
  });

  edit.present();

}

saveProfile(){
  var erro;
  var path;

  this.storage.get("aluno_ra").then((usu) => {
    path = 'http://localhost:3000/api/aluno/update/email?aluno=' + this.account.user_RA + '&email=' + this.account.user_email
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          }else {
            erro = 1
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Dismiss']
              });
              alert.present();
            }
          })   
      }, (err) => {
        console.log(err)
      })

      this.storage.get("aluno_ra").then((usu) => {
      path = 'http://localhost:3000/api/aluno/update/telefone?aluno=' + this.account.user_RA + '&email=' + this.account.user_telefone
      console.log(path)
      this.http.get(path).map(res => res.json()).subscribe(data => {

        if(data.success) {
          }else {
            erro = 1
              let alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Tente novamente',
                buttons: ['Dismiss']
              });
              alert.present();
            }
          })   
      }, (err) => {
        console.log(err)
      })

      
    }  

}
