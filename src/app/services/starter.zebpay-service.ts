import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ZebpayService {
  http: any;
  baseUrl: String;
  urls: any;

  constructor(http: Http) {
    this.http = http;
    this.baseUrl = 'https://www.zebapi.com/api/v1';
    this.urls = {
      getBTCINRCurrentPrice: "/market/ticker/btc/inr"
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

  getBTCINRCurrentPrice() {
    var serviceUrl = this.baseUrl + this.format(this.urls.getBTCINRCurrentPrice);
    return this.makeGetCall(serviceUrl);
  }
}      