import { Component } from '@angular/core';
import { AlertController, App, ViewController, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController
  ) {}

  pageLogin() {
    this.navCtrl.push(LoginPage);
  }
}