import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { CoinbaseService } from './services/starter.coinbase-service';
import { CoinDeskService } from './services/starter.coindesk-service';
import { BTCXIndiaService } from './services/starter.btcxindia-service';
import { ZebpayService } from './services/starter.zebpay-service';

import { SQLiteService } from './services/starter.sqlite-service';
import { ToastService } from './services/starter.toast-service';

@Component({
  templateUrl: 'app.html',
  providers: [CoinbaseService, CoinDeskService, BTCXIndiaService, ZebpayService, SQLiteService, ToastService]
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
