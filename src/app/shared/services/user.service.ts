import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: UserModel

  constructor( private httpClient: HttpClient) { }

  login(email: string, password: string) : Promise<UserModel> {
    console.log(email, password)
    return new Promise((resolve, reject) => {
      this.httpClient.post(environment.API + '/login', {email, password}).subscribe({
        next: async data => {
          console.log(data)
          resolve(await this.getUserInfos())
        }, error: error => {
          reject(error)
        }
      })
    })
  }

  public getUserInfos() : Promise<UserModel> {
    return new Promise((resolve, reject) => {
      this.httpClient.get<UserModel>(environment.API + '/user', this.getHeader()).subscribe({
        next: data => {
          this.user = data
          resolve(data)
        }, error: error => {
          reject(error)
        }
      })
    })
  }

  public getHeader() : {headers: HttpHeaders} {
    const headers: HttpHeaders = new HttpHeaders({'Authorization': ''});
    return {headers}
  }
}
