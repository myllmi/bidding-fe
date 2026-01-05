import {Component, inject} from '@angular/core';
import {IamService} from '../../../service/iam.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  iamService = inject(IamService);
  email: string = '';
  password: string = '';

  inputPassword: string = 'password';
  textShowPassword: string = 'Show';

  showPassword() {
    if (this.inputPassword === 'password') {
      this.textShowPassword = 'Hide';
      this.inputPassword = 'text';
    } else {
      this.textShowPassword = 'Show';
      this.inputPassword = 'password';
    }
  }

  loginUser() {
    this.iamService.loginUser(this.email, this.password)
  }
}
