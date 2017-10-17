import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CoinDeskService {
  http: any;
  baseUrl: String;
  urls: any;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'https://api.coindesk.com';
    this.urls = {
      getBTCUSDCurrentPrice: "/v1/bpi/currentprice/usd.json",
      getBTCINRCurrentPrice: "/v1/bpi/currentprice/inr.json",
      getETHUSDCurrentPrice: "/site/headerdata.json?currency=ETH"
      // getXRPUSDCurrentPrice: "/site/headerdata.json?currency=XRP"
    }
  }

  format(inputArgs) {
    var args = inputArgs[0];
    for (var i = 0; i < inputArgs.length - 1; i++) {
      var reg_exp = new RegExp("\\{" + i + "\\}");
      args = args.replace(reg_exp, inputArgs[i + 1]);
    }
    // $rootScope.lastExecutedCall = args;
    return args;
  }

  makeGetCall(serviceUrl) {
    return this.http.get(serviceUrl)
      .then(function (response) {
        response.data.url = serviceUrl;
        return response;
      }, function (err) {
        if (err) {
          return err;
        }
      }).then(this.returnData)
      .then(function (data) {
        return data;
      })
  }

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

  getBTCUSDCurrentPrice() {
    var serviceUrl = this.baseUrl + this.format(this.urls.getBTCUSDCurrentPrice);
    return this.makeGetCall(serviceUrl);
  }
  getBTCINRCurrentPrice() {
    var serviceUrl = this.baseUrl + this.format(this.urls.getBTCINRCurrentPrice);
    return this.makeGetCall(serviceUrl);
  }
  getETHUSDCurrentPrice() {
    var serviceUrl = this.baseUrl + this.format(this.urls.getETHUSDCurrentPrice);
    return this.makeGetCall(serviceUrl);
  }
  // getXRPUSDCurrentPrice() {
  //     var serviceUrl = this.baseUrl + this.format(this.urls.getXRPUSDCurrentPrice);
  //     return this.makeGetCall(serviceUrl);
  // }
}