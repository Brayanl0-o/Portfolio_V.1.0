import { EventEmitter, Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
  ) { }

  $modal = new EventEmitter<any>();
  $success_send = new EventEmitter<any>();

  sendInfoForm(emailData:any){
    const urlSendInfo = `${this.apiUrl}receiveForm/receive-form`
    return this.http.post(urlSendInfo, emailData);
  }
}
