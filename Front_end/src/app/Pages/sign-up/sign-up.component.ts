import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService, Sex, User } from '../../data.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  onSubmit() {
    let signUpUser = { id: 0, name: "", sex: Sex.UNKNOWN, email: "", password: "", folowingList: [], folowedList: [], conversationList: [], avatar: ""};
    let name = this.signUpForm.value.name;
    let email = this.signUpForm.value.email;
    let password = this.signUpForm.value.password;
    localStorage.removeItem('localUserId');

    if (name && email && password) {
      signUpUser.name = name;
      signUpUser.email = email;
      signUpUser.password =password;

      this.dataService.addUser(signUpUser)
        .subscribe(response => {
          if (response.status == 201) {
            this.router.navigate(['/login']);
          }
          else {
            console.log("thất bại khi thêm mới tài khoản ở signUP");
          }
        })
    }
    else {
      console.log("ten,email hoac pass = null")
    }
  }

  signUpForm = this.fb.group({
    name: [''],
    email: [''],
    password: ['']
  });
}
