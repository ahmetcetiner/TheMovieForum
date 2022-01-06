import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { Message } from 'src/app/model/message';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private httpClient: HttpClient) { }
getMessageById(id: number) {
    let headers = new HttpHeaders();
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Message>(
      HEROKU_API_URL + 'message/'+id.toString(),
      {headers:headers}                 
    );
  }

  /*getMessageByMovieId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Message>(
      HEROKU_API_URL + 'movieMessageAll',
      {headers:headers}
                 
    );
  }*/

  /*getMessageByUserId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Message>(
      HEROKU_API_URL + 'messages',
      {headers:headers}
                 
    );
  }*/

    /*getMessageByDiscussionId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Message>(
      HEROKU_API_URL + 'discussionMessages',
      {headers:headers}
                 
    );
  }*/

  getMessages(): Observable<Message[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Message[]>(HEROKU_API_URL + 'messageAll', {
      headers: headers,
    });
  }

  updateMessage(message: Message) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<Message>(HEROKU_API_URL + 'message', message, {
      headers: headers,
    });
  }

  sendMessage(message: Message) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.put<Message>(
      HEROKU_API_URL + 'message',
      {
        UserId: message.UserId,
        MessageText: message.MessageText,
        DiscussionId: message.DiscussionId,
        CreatedDate:message.CreatedDate
      },
      { headers: headers }
    );
  }

  /*deleteMessage(messageId:number){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.delete( HEROKU_API_URL + 'message',)
  }*/
}
