webpackJsonp([4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadastroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CadastroPage = /** @class */ (function () {
    function CadastroPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.dados = {};
        this.dados = navParams.get('dados');
    }
    CadastroPage.prototype.checkSession = function () {
        var _this = this;
        this.storage.get("usuario").then(function (usu) {
            _this.storage.get("senha").then(function (sen) {
                if (usu == null && sen == null) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
            });
        });
    };
    CadastroPage.prototype.ionViewDidLoad = function () {
        this.checkSession();
        console.log('ionViewDidLoad CadastroPage');
    };
    CadastroPage.prototype.storeEmail = function (email) {
        this.storage.set("email", email);
    };
    CadastroPage.prototype.clickCadastrar = function () {
        this.storeEmail(this.dados["email"]);
        // if (this.dados["email"]) {
        //   this.storage.get("usuario").then((usuario) => {
        //     console.log('nomeee', usuario)
        //   });
        // }
        // cadastrar usuário no banco usando this.dados["usuario/senha/email"]
        // criar sessão como se o usuário tivesse logado
        // this.navCtrl.push(Home);
    };
    CadastroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cadastro',template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\pages\cadastro\cadastro.html"*/'<!--\n\n  Generated template for the CadastroPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-content padding>\n\n\n\n  <form (ngSubmit)="clickCadastrar()">\n\n    <ion-item>\n\n      <ion-label floating>E-mail</ion-label>\n\n      <ion-input type="email" [(ngModel)]="dados.email" name="email"></ion-input>\n\n    </ion-item>\n\n    <button ion-button type="submit" block>Cadastrar</button>\n\n  </form>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\pages\cadastro\cadastro.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _c || Object])
    ], CadastroPage);
    return CadastroPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=cadastro.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracoesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfiguracoesPage = /** @class */ (function () {
    function ConfiguracoesPage(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
    }
    ConfiguracoesPage.prototype.checkSession = function () {
        var _this = this;
        this.storage.get("usuario").then(function (usu) {
            _this.storage.get("senha").then(function (sen) {
                if (usu == null && sen == null) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }
            });
        });
    };
    ConfiguracoesPage.prototype.ionViewDidLoad = function () {
        this.checkSession();
        console.log('ionViewDidLoad ConfiguracoesPage');
    };
    ConfiguracoesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configuracoes',template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\pages\configuracoes\configuracoes.html"*/'<!--\n\n  Generated template for the ConfiguracoesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n\n\n<ion-content padding>\n\nTela configurações\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\pages\configuracoes\configuracoes.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _c || Object])
    ], ConfiguracoesPage);
    return ConfiguracoesPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=configuracoes.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.dados = {};
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.storeUser = function (user) {
        this.storage.set("usuario", user);
    };
    LoginPage.prototype.clickLogin = function () {
        if (this.verificarCredenciais(this.dados["usuario"], this.dados["senha"])) {
            this.storeUser(this.dados["usuario"]);
            if (this.primeiroLogin()) {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__cadastro_cadastro__["a" /* CadastroPage */], { dados: this.dados });
            }
            if (this.dados["lembrar"]) {
                this.storage.set("senha", this.dados["senha"]);
            }
            // this.navCtrl.push(Home);
        }
        else {
            var alert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Verifique as informações inseridas',
                buttons: ['Dismiss']
            });
            alert.present();
        }
    };
    LoginPage.prototype.verificarCredenciais = function (user, senha) {
        user = (user == null || user == '') ? '' : user;
        senha = (senha == null || user == '') ? '' : senha;
        if (user != '' && senha != '') {
            return true;
        }
        else {
            return false;
        }
        // verificar se usuario this.dados["usuario"] existe
        // verificar se a senha this.dados["senha"] esta correta
        // isso por web crawling
    };
    LoginPage.prototype.primeiroLogin = function () {
        // verificar se usuario this.dados["usuario"] já está cadastrado no postgres
        return true;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\pages\login\login.html"*/'<!--\n\n  Generated template for the LoginPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<!-- <ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>login</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header> -->\n\n\n\n<ion-content padding>\n\n\n\n  <form (ngSubmit)="clickLogin()">\n\n    <ion-item>\n\n      <ion-label floating>Usuário</ion-label>\n\n      <ion-input type="text" [(ngModel)]="dados.usuario" name="usuario"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label floating>Senha</ion-label>\n\n      <ion-input type="password" [(ngModel)]="dados.senha" name="senha"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Lembre-se de mim</ion-label>\n\n      <ion-checkbox [(ngModel)]="dados.lembrar" name="lembrar"></ion-checkbox>\n\n    </ion-item>\n\n    <button ion-button type="submit" block>Login</button>\n\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]) === "function" && _d || Object])
    ], LoginPage);
    return LoginPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, viewCtrl, formBuilder, toastCtrl, loadingCtrl, storage, navParams) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.isDisabled = true;
        this.caption_name = "EDITAR";
        this.account = {
            user_RA: '111111',
            user_name: 'userName',
            user_email: 'user@mail.net',
            user_password: 'password',
            profile_image: ' ',
            full_name: 'Nome do Usuário',
            about: 'Bacharel em Ciência e Tecnologia'
        };
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
    PerfilPage.prototype.getInfomations = function () {
    };
    PerfilPage.prototype.changedSmtng = function () {
        this.caption_name = "SALVAR";
    };
    PerfilPage.prototype.editProfile = function () {
        var _this = this;
        if (this.caption_name == "EDITAR") {
            this.isDisabled = false;
            this.caption_name = "CANCELAR";
        }
        else if (this.caption_name == "SALVAR") {
            console.log(this.isReadyToSave);
            if (!(this.account.user_name && this.account.user_email && this.account.user_password && this.account.user_RA)) {
                var toast = this.toastCtrl.create({
                    message: "Campos Inválidos!",
                    duration: 2000,
                    position: 'bottom'
                });
                toast.present();
            }
            else {
                var loading_1 = this.loadingCtrl.create({
                    content: 'Please wait...'
                });
                loading_1.present();
                setTimeout(function () {
                    loading_1.dismiss();
                    /*carregar dados do usuário no banco
                    *...
                    *...
                    *...
                    */
                    var toast = _this.toastCtrl.create({
                        message: "You have successfully updated your details .",
                        duration: 2000,
                        position: 'top'
                    });
                    _this.caption_name = "EDITAR";
                    _this.isDisabled = true;
                    toast.present();
                }, 2000);
            }
        }
        else if (this.caption_name == "CANCELAR") {
            this.isDisabled = true;
            this.caption_name = "EDITAR";
        }
    };
    PerfilPage.prototype.checkSession = function () {
        var _this = this;
        this.storage.get("usuario").then(function (usu) {
            _this.storage.get("senha").then(function (sen) {
                if (usu == null && sen == null) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                }
            });
        });
    };
    PerfilPage.prototype.ionViewDidLoad = function () {
        this.checkSession();
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var imageData = readerEvent.target.result;
            _this.form.patchValue({ 'image': imageData });
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    PerfilPage.prototype.getProfileImageStyle = function () {
        return 'url(' + this.form.controls['image'].value + ')';
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('fileInput'),
        __metadata("design:type", Object)
    ], PerfilPage.prototype, "fileInput", void 0);
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'perfil-page',template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\pages\perfil\perfil.html"*/'\n\n<!--Cabeçalho-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-buttons left><!--botoes do cabeçalho - ESQUERDA-->\n\n    </ion-buttons>\n\n    <ion-title center>{{ \'Perfil\' }}</ion-title>\n\n    <ion-buttons right><!--botoes do cabecalho - DIREITA-->\n\n      <button ion-button icon-only (click)="editProfile()" class="editSaveToggleBtn">{{caption_name}}</button><!--botao edit profile-->\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <div class="fixed-content">\n\n\n\n    <form *ngIf="form" [formGroup]="form" (ngSubmit)="saveProfile()">\n\n      <div class="upperDiv">\n\n        <input type="file" #fileInput style="visibility: hidden; height: 0px" name="files[]"\n\n               (change)="processWebImage($event)"/>\n\n        <div class="profile-image-wrapper" (click)="getPicture()">\n\n          <div class="profile-image-placeholder" *ngIf="!this.form.controls.image.value">\n\n            <ion-icon name="ios-camera-outline" class="ios-camera-outline" md="ios-camera-outline" style="color: white !important"></ion-icon>\n\n            <div>\n\n            </div>\n\n          </div>\n\n          <div class="profile-image" [style.backgroundImage]="getProfileImageStyle()"\n\n               *ngIf="this.form.controls.image.value"></div>\n\n        </div>\n\n        <!--dados do usuario-->\n\n        <h3 class="full_name">{{profileDetails[0].full_name}}</h3> <!--nome-->\n\n        <h3 class="userDetails">{{profileDetails[0].about}}</h3> <!--sobre-->\n\n      </div>\n\n\n\n      <ion-list style="padding: 20px !important; border-bottom: 0.55px solid #fff;">\n\n        <ion-item style="border-top: 0.55px solid #fff;">\n\n          \n\n          <!--CAMPO USUARIO-->\n\n          <ion-label class="usuario">Usuário </ion-label>\n\n          <ion-input class="inputFields" type="text" formControlName="user_name" (keyup)="changedSmtng()"\n\n                     disabled="{{isDisabled}}"\n\n                     [(ngModel)]="account.user_name"></ion-input>\n\n        </ion-item>\n\n        \n\n         <!--CAMPO RA-->\n\n        <ion-item>\n\n          <ion-label class="ra">RA </ion-label>\n\n          <ion-input class="inputFields" type="text" formControlName="user_RA" (keyup)="changedSmtng()"\n\n                     disabled="{{isDisabled}}"\n\n                     [(ngModel)]="account.user_RA"></ion-input>\n\n        </ion-item>\n\n\n\n        <!--CAMPO DE EMAIL-->\n\n        <ion-item>\n\n          <ion-label class="email">Email </ion-label>\n\n          <ion-input class="inputFields" type="email" formControlName="user_email" (keyup)="changedSmtng()"\n\n                     disabled="{{isDisabled}}"\n\n                     [(ngModel)]="account.user_email"></ion-input>\n\n        </ion-item>\n\n\n\n        <!--CAMPO DE SENHA-->\n\n        <ion-item>e\n\n          <ion-label class="senha">Senha </ion-label>\n\n          <ion-input class="inputFields" type="password" formControlName="user_password" (keyup)="changedSmtng()"\n\n                     disabled="{{isDisabled}}"\n\n                     [(ngModel)]="account.user_password"></ion-input>\n\n        </ion-item>\n\n        \n\n      </ion-list>\n\n    </form>\n\n  </div>\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\pages\perfil\perfil.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _g || Object])
    ], PerfilPage);
    return PerfilPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cadastro/cadastro.module": [
		275,
		3
	],
	"../pages/configuracoes/configuracoes.module": [
		276,
		2
	],
	"../pages/login/login.module": [
		277,
		1
	],
	"../pages/perfil/perfil.module": [
		278,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 153;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_cadastro_cadastro__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_perfil_perfil__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_configuracoes_configuracoes__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cadastro/cadastro.module#CadastroPageModule', name: 'CadastroPage', segment: 'cadastro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/configuracoes/configuracoes.module#ConfiguracoesPageModule', name: 'ConfiguracoesPage', segment: 'configuracoes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_cadastro_cadastro__["a" /* CadastroPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_configuracoes_configuracoes__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage) {
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.clickPerfil = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_perfil_perfil__["a" /* PerfilPage */]);
    };
    MyApp.prototype.clickConfiguracoes = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_configuracoes_configuracoes__["a" /* ConfiguracoesPage */]);
    };
    MyApp.prototype.clickLogout = function () {
        this.storage.clear();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\app\app.html"*/'<!-- Menu lateral -->\n\n<ion-menu [content]="content">\n\n\n\n    <ion-content padding>\n\n        <button ion-button menuClose (click)="clickPerfil()">Perfil</button><br>\n\n        <button ion-button menuClose (click)="clickConfiguracoes()">Configurações</button><br>\n\n        <button ion-button menuClose (click)="clickLogout()">Logout</button><br>\n\n    </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<ion-nav [root]="rootPage" #content></ion-nav>\n\n\n\n<button ion-button icon-only menuToggle>\n\n    <ion-icon name="menu"></ion-icon>\n\n</button>'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]) === "function" && _e || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map