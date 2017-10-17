import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoinbaseService {
  http: any;
  baseUrl: String;
  urls: any;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'http://192.168.10.5:8080';
    this.urls = {
      getBTCUSDBuyPrice: '/getBTCUSDBuyPrice',
      getLTCUSDBuyPrice: '/getLTCUSDBuyPrice',
      getETHUSDBuyPrice: '/getETHUSDBuyPrice',
      getBTCUSDSellPrice: '/getBTCUSDSellPrice',
      getLTCUSDSellPrice: '/getLTCUSDSellPrice',
      getETHUSDSellPrice: '/getETHUSDSellPrice'
    }
  }

  makeGetCall(serviceUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(serviceUrl)
        //     .success(function(data){
        //       console.log(data);
        //     })
        // })

        // return this.http.get(serviceUrl)
        // .map(data => data.json())
        // .subscribe(data => {
        //   //data.url = serviceUrl;
        //   return data;
        // }, err => {
        //   console.log('Something went wrong!');
        // });

    })
  }

  //     .then(function (response) {
  //       response.data.url = serviceUrl;
  //       return response;
  //     }, function (err) {
  //       if (err) {
  //         return err;
  //       }
  //     }).then(this.returnData)
  //     .then(function (data) {
  //       return data;
  //     })
  // }

  returnData(res) {
    if (res.data) {
      return res.data;
    }
    else {
      res.data = null;
      return res.data;
    }
    //throw new Error('Return data error ... ');
  }

  getBTCUSDBuyPrice() {
    var serviceUrl = this.baseUrl + this.urls.getBTCUSDBuyPrice;
    return this.makeGetCall(serviceUrl);
  }

  getLTCUSDBuyPrice() {
    var serviceUrl = this.baseUrl + this.urls.getLTCUSDBuyPrice;
    return this.makeGetCall(serviceUrl);
  }

  getETHUSDBuyPrice() {
    var serviceUrl = this.baseUrl + this.urls.getETHUSDBuyPrice;
    return this.makeGetCall(serviceUrl);
  }

  getBTCUSDSellPrice() {
    var serviceUrl = this.baseUrl + this.urls.getBTCUSDSellPrice;
    return this.makeGetCall(serviceUrl);
  }

  getLTCUSDSellPrice() {
    var serviceUrl = this.baseUrl + this.urls.getLTCUSDSellPrice;
    return this.makeGetCall(serviceUrl);
  }

  getETHUSDSellPrice() {
    var serviceUrl = this.baseUrl + this.urls.getETHUSDSellPrice;
    return this.makeGetCall(serviceUrl);
  }
}