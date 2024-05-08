import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../../data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})

export class LogInComponent implements OnInit {
  userList: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getUserList()
      .subscribe((data: Array<User>) => this.userList = data)
  }

  onSubmit() {
    let email = this.logInForm.value.email;
    let password = this.logInForm.value.password;

    if (email && password) {
      for (var i in this.userList) {
        // console.log("🚀 ~ LogInComponent ~ onSubmit ~ this.userList:", this.userList)
        // console.log(this.userList[i].email);
        // console.log(this.userList[i].password);
        if (this.userList[i].email == email && this.userList[i].password == password) {
          // console.log("tim thay tai khoan");
          localStorage.setItem("localUserId", this.userList[i].id);
          
          this.router.navigate(['/home']);
          break;
        }
      }
    }
    else {
      console.log("email va pass dang bang null")
    }
  }

  logInForm = this.fb.group({
    email: [''],
    password: ['']
  });
}
