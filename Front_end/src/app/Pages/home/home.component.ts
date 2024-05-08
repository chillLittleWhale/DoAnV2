import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Conversation, DataService, Message, MessageType, User } from '../../data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userId = localStorage.getItem("localUserId");
  userIdNumber =this.userId? Number.parseFloat(this.userId): -1;
  mySelf: User | undefined;

  conversationList: Array<Conversation> = [];
  receiverList: Array<User> = [];
  messageList: Array<Message> = [];

  selectedConversation: Conversation | undefined;
  // selectedConverName: any;
  // selectedConverAvatar: any;

  tmpUser: any;
  tmpConversation: any;
  constructor(
    private fbSearch: FormBuilder,
    private fbMessage: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("userID: " + this.userId);

    this.dataService.getConversationList(this.userId)
      .subscribe((data: Array<Conversation>) => this.conversationList = data)

    this.dataService.getUserById(this.userId)
      .subscribe((data: User) => this.mySelf = data)
  }

  searchForm = this.fbSearch.group({
    search: ['']
  });

  messageForm = this.fbMessage.group({
    content: ['']
  });

  onConversationSelect(conversation: Conversation) {
    this.dataService.getConversationById(conversation.id)
      .subscribe((data: Conversation) => this.selectedConversation = data)

    this.dataService.getMessageList(conversation.id)
      .subscribe((data: Array<Message>) => this.messageList = data)

    //this.setSelectedConverName();
    // this.setSelectedConverAvartar();
    console.log("onConversationSelect() được gọi");
  }

  onSendMessage() {
    let newMessage = { id: 0, senderId: 0, content: "", sentTime: "", type: MessageType.NOMAL };
    let content = this.messageForm.value.content;

    if (content && this.mySelf) {
      newMessage.senderId = this.mySelf.id;
      newMessage.content = content;

      this.dataService.sendMessage(newMessage)            // thêm message
        .subscribe(response => {
          if (response.status == 201) {
            let newConversation = this.selectedConversation;
            if (response.body && typeof response.body === 'string') {
              let messId: number = parseInt(response.body);
              if (!isNaN(messId)) {
                if (newConversation) {
                  newConversation.messageList.push(messId);
                  this.dataService.updateConversation(this.selectedConversation?.id, newConversation)
                    .subscribe(response => {
                      console.log("update succsess")
                    })
                } else { console.error('Invalid conversation'); }
              } else { console.error('Invalid message ID'); }
            } else { console.error('Invalid response body'); }
          } else { console.log("Gửi tin nhắn thất bại"); }
        })
      this.messageForm.reset();
    }
  }

  getConverName(conver: Conversation): string {
    let name = null;
    if (conver?.groupName) {
      name = conver.groupName;
      console.log("Tên: có groupName")
    }
    else {
      if (conver?.participantList) {
        conver.participantList.forEach(id => {
            if (id != this.userIdNumber) {
              this.tmpUser = this.dataService.getUserById(id);
              name = this.tmpUser.name;
              console.log("Tên: không có groupName")
            }
        });
      }
    }
    console.log(name?.toString());
    return name!;
  }

  getConverAvartar(conver: Conversation): String {
    let avatar = null;
    if (conver?.groupName) {
      avatar = '../../../assets/pic/avatar-group-100.png';
      console.log("Avatar: có groupName")
    }
    else {
      if (conver?.participantList) {
        conver.participantList.forEach(id => {
          if (id != this.userIdNumber) {
            this.dataService.getUserById(id).subscribe((data: User) => this.tmpUser = data)
              avatar = this.tmpUser.avatar;
              // return avatar;
              console.log("Avatar: không có groupName")
            }
        });
      }
    }
    console.log(avatar?.toString());
    return avatar!;
  }
  // // start: Sidebar
  // document.querySelector('.chat-sidebar-profile-toggle').addEventListener('click', function(e) {
  //   e.preventDefault()
  //   this.parentElement.classList.toggle('active')
  // })

  // document.addEventListener('click', function(e) {
  //   if(!e.target.matches('.chat-sidebar-profile, .chat-sidebar-profile *')) {
  //       document.querySelector('.chat-sidebar-profile').classList.remove('active')
  //   }
  // })
  // // end: Sidebar



  // // start: Coversation
  // document.querySelectorAll('.conversation-item-dropdown-toggle').forEach(function(item) {
  //   item.addEventListener('click', function(e) {
  //       e.preventDefault()
  //       if(this.parentElement.classList.contains('active')) {
  //           this.parentElement.classList.remove('active')
  //       } else {
  //           document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
  //               i.classList.remove('active')
  //           })
  //           this.parentElement.classList.add('active')
  //       }
  //   })
  // })

  // document.addEventListener('click', function(e) {
  //   if(!e.target.matches('.conversation-item-dropdown, .conversation-item-dropdown *')) {
  //       document.querySelectorAll('.conversation-item-dropdown').forEach(function(i) {
  //           i.classList.remove('active')
  //       })
  //   }
  // })

  // document.querySelectorAll('.conversation-form-input').forEach(function(item) {
  //   item.addEventListener('input', function() {
  //       this.rows = this.value.split('\n').length
  //   })
  // })

  // document.querySelectorAll('[data-conversation]').forEach(function(item) {
  //   item.addEventListener('click', function(e) {
  //       e.preventDefault()
  //       document.querySelectorAll('.conversation').forEach(function(i) {
  //           i.classList.remove('active')
  //       })
  //       document.querySelector(this.dataset.conversation).classList.add('active')
  //   })
  // })

  // document.querySelectorAll('.conversation-back').forEach(function(item) {
  //   item.addEventListener('click', function(e) {
  //       e.preventDefault()
  //       this.closest('.conversation').classList.remove('active')
  //       document.querySelector('.conversation-default').classList.add('active')
  //   })
  // })
  // end: Coversation
}
