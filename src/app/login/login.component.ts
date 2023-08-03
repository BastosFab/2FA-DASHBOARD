import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl('')
  })

  constructor( private userService: UserService) {
  }

  onSubmit() {
    if(!this.loginForm.valid) {
      return
    }

    const {email, password} = this.loginForm.value
    this.userService.login(email!, password!).then(() => {})
    .catch((error) => {
      console.log(error)
    });
  }

}
