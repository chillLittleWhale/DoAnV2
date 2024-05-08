import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  rootURL = "http://localhost:8000";
  constructor(private http: HttpClient) { }
  // User------------------------------------------------------------------------------------------------------
  getUserList(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.rootURL + "/user/all");
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.rootURL}/user/${id}`);
  }


  addUser(user: User) {
    return this.http.post<Response>(`${this.rootURL}/user`, user,
      {
        observe: 'response' // trả về một Observable của HttpResponse thay vì dữ liệu thô từ response body. HttpResponse chứa thông tin về phản hồi HTTP như mã trạng thái, headers và thân của phản hồi
      }
    );
  }

  updateUser(id: any, user: User) {
    return this.http.put(`${this.rootURL}/user/${id}`, user);
  }

  // deleteUser(Userid: any) {
  //   return this.http.delete(this.rootURL + "/User/" + Userid);
  // }

  getFriendList(userId: any): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.rootURL}/user/getFriendList/${userId}`);
  }
  getFollowingList(userId: any): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.rootURL}/user/getFollowingList/${userId}`);
  }
  getFollowedList(userId: any): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${this.rootURL}/user/getFollowedList/${userId}`);
  }
  getConversationList(userId: any): Observable<Array<Conversation>> {
    return this.http.get<Array<Conversation>>(`${this.rootURL}/user/getConversationList/${userId}`);
  }
  // Conversatioin-----------------------------------------------------------------------------------------------------

  getConversationById(id: any): Observable<Conversation> {
    return this.http.get<Conversation>(`${this.rootURL}/conversation/${id}`);
  }

  getMessageList(converId: any): Observable<Array<Message>> {
    return this.http.get<Array<Message>>(`${this.rootURL}/conversation/getMessageList/${converId}`);
  }

  updateConversation(id: any, conversation: Conversation) {
    return this.http.put(`${this.rootURL}/conversation/${id}`, conversation);
  }

  // Message  -------------------------------------------------------------------------------------------------------
  sendMessage(newMessage: Message) {
    return this.http.post<Response>(`${this.rootURL}/message`, newMessage,
      {
        observe: 'response'
      }
    );
  }
}

export interface User {
  id: number,
  name: string,
  sex: Sex,
  email: string,
  password: string,
  folowingList: number[],
  folowedList: number[],
  conversationList: number[],
  avatar: string,
}

export interface Conversation {
  id: number,
  groupName: string,
  participantList: number[],
  messageList: number[],
}

export interface Message {
  id: number,
  senderId: number,
  content: string,
  sentTime: string,
  type: MessageType
}

export enum Sex {
  UNKNOWN,
  MALE,
  FEMALE
}

export enum MessageType {
  NOMAL,
  DELETED,
  EDITED,
  FORWARDED
}