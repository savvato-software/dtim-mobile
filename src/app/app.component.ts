import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FunctionPromiseService } from 'savvato-javascript-services'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
   menuOptions = [ ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _menuCtrl : MenuController,
    private _functionPromiseService: FunctionPromiseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this._menuCtrl.close();

      this.setMenuOptions();
    });
  }

  setMenuOptions() {

    this.menuOptions = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      }
    ]

  }

  getMenuOptions() {
    let  menuOptions = this._functionPromiseService.get("currentMenuOptions", "currentMenuOptions", null);

    return menuOptions;
  }

  handleMenuWillOpenEvent() {

  }  
}
