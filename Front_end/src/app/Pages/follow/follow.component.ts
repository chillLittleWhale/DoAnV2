import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService, User } from '../../data.service';

@Component({
  selector: 'app-follow',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './follow.component.html',
  styleUrl: './follow.component.css'
})
export class FollowComponent {
  followingList: Array<User> = [];
  followerList: Array<User> = [];
  userId = localStorage.getItem("localUserId");
  mySelf: User | undefined;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getFollowedList(this.userId)
      .subscribe((data: Array<User>) => this.followerList = data)
      
    this.restartTable()

  }

  isUserInBothLists(user: User): boolean {
    return this.followingList.some(u => u.id === user.id) && this.followerList.some(u => u.id === user.id);
  }

  onFollow(id: number){
    let updateUser = this.mySelf;
    if(updateUser){
      updateUser.folowingList.push(id);
      this.dataService.updateUser(this.userId, updateUser)
      .subscribe(response => {
        this.restartTable()
        console.log(`Follow id ${id} thành công.`);
      });
    }
  }

  onUnFollow(id: number){
    console.log(`Chossen id: ${id}`);
    let updateUser = this.mySelf;
    if(updateUser){
      updateUser.folowingList = updateUser.folowingList.filter(itemId => itemId !== id);
      updateUser.folowingList.forEach(element => {
        console.log(element);
      });
      this.dataService.updateUser(this.userId, updateUser)
      .subscribe(response => {
        this.restartTable()
        console.log(`UnFollow id ${id} thành công.`);
      });
    }
  }

  onFind(){

  }

  restartTable(){
    this.dataService.getFollowingList(this.userId)
      .subscribe((data: Array<User>) => this.followingList = data)

    this.dataService.getUserById(this.userId)
      .subscribe((data: User) => this.mySelf = data)
  }
}
