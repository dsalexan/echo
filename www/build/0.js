webpackJsonp([0],{

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilidadesPageModule", function() { return UtilidadesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utilidades__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UtilidadesPageModule = /** @class */ (function () {
    function UtilidadesPageModule() {
    }
    UtilidadesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__utilidades__["a" /* UtilidadesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__utilidades__["a" /* UtilidadesPage */]),
            ],
        })
    ], UtilidadesPageModule);
    return UtilidadesPageModule;
}());

//# sourceMappingURL=utilidades.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilidadesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
throw new Error("Cannot find module \"@ionic-native/in-app-browser\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
// --OBS--
// INSTALAÇÃO NECESSÁRIA:
// $ ionic cordova plugin add cordova-plugin-inappbrowser
// $ npm install --save @ionic-native/in-app-browser
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var biblioteca = 'http://www.biblioteca.unifesp.br/biblioteca/index.php';
var saldoRU = 'https://phpu.unifesp.br/ru_consulta/index.php';
var cardapio = 'url do cardapio';
var email = 'https://www.email.unifesp.br';
var atestado = 'https://intranet.unifesp.br/restrict/index3.php';
var historico = 'https://intranet.unifesp.br/restrict/index3.php';
var UtilidadesPage = /** @class */ (function () {
    function UtilidadesPage(navCtrl, navParams, iab) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iab = iab;
    }
    UtilidadesPage.prototype.clickBiblioteca = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(biblioteca);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage.prototype.clicksSaldo = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(saldoRU);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage.prototype.clickCardapio = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(cardapio);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage.prototype.clickEmail = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(email);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage.prototype.clickAtestado = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(atestado);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage.prototype.clickHistorico = function () {
        console.log('ionViewDidLoad UtilidadesPage');
        var browser = this.iab.create(historico);
        browser.executeScript();
        browser.insertCSS();
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
        browser.close();
    };
    UtilidadesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-utilidades',template:/*ion-inline-start:"D:\Gustavo\Desktop\Software Development\echo\src\pages\utilidades\utilidades.html"*/'<!--\n\n  Generated template for the UtilidadesPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title center>{{ \'Utilidaes\' }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-buttons (click) = "clickBilioteca()" class = "biblioteca">BIBLIOTECA</ion-buttons>\n\n  <ion-buttons (click) = "clickSaldo()" class ="saldo">CONSULTAR SALDO RU</ion-buttons>\n\n  <ion-buttons (click) = "clickCardapio()" class = "caradpio">CARDÁPIO RU</ion-buttons>\n\n  <ion-buttons (click) = "clickEmail()" class = "email">EMAIL UNIFESP</ion-buttons>\n\n  <ion-buttons (click) = "clickAtestado()" class = "atestado">ATESTADO DE MATRICULA</ion-buttons>\n\n  <ion-buttons (click) = "clickHistorico()" class = "historico">HISTORICO ESCOLAR</ion-buttons>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Gustavo\Desktop\Software Development\echo\src\pages\utilidades\utilidades.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["InAppBrowser"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ionic_native_in_app_browser__["InAppBrowser"]) === "function" && _c || Object])
    ], UtilidadesPage);
    return UtilidadesPage;
    var _a, _b, _c;
}());

// https://ionicframework.com/docs/native/in-app-browser/
//# sourceMappingURL=utilidades.js.map

/***/ })

});
//# sourceMappingURL=0.js.map