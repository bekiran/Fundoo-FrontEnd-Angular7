import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
// import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  url: string;
  constructor(public http: HttpClient) {}
  apiBaseurl = environment.baseUrl;

  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({
        //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
        "Content-Type": "application/json"
      })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }

  resetpassword(data, purpose: string) {
    let headers = new HttpHeaders({
      "content-Type": "application/json", //shows the type of content
      token: localStorage.getItem("token") //grabbing the token from localstorage
    });
    // set header in your http request
    return this.http.post(this.apiBaseurl + purpose, data, {
      headers: headers
    });
  }

  postJSON(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  put(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.put(url, body, httpOptions);
  }

  getHttp(url) {
    const httpTocken = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiBaseurl + url, httpTocken);
  }
}
