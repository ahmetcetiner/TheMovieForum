import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { Discussion } from 'src/app/model/discussion';
import { List } from 'src/app/model/list';
import { ListAdd } from 'src/app/model/listAdd';
import { Message } from 'src/app/model/message';
import { HEROKU_API_URL } from 'src/config';
import { AlertifyService } from '../alertify-service/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

constructor(private httpClient: HttpClient,
  private alertifyService: AlertifyService) { }
  
getListByUserAndTypeId(userId: string,listType:string) {
    let headers = new HttpHeaders();
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<List[]>(
      HEROKU_API_URL + 'userList/'+userId.toString()+"/"+listType.toString(),
      {headers:headers}                 
    );
  }


    addListItem(list:ListAdd){
    let headers = new HttpHeaders();   
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
  
    this.httpClient.post(
      HEROKU_API_URL + 'list',list,
      {headers:headers}
                 
    ).subscribe(data=>{});
    this.alertifyService.success('Seçtiğiniz film listenize eklenmiştir.');
  }

  deleteListItem(id:number){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.delete( HEROKU_API_URL + 'message/'+id, { headers: headers })
  }
}
