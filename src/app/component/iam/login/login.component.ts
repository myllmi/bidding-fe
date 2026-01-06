import {Component, inject} from '@angular/core';
import {IamService} from '../../../service/iam.service';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  authService = inject(AuthService);
  iamService = inject(IamService);
  router = inject(Router);

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
    this.iamService.loginUser(this.email, this.password).subscribe(res => {
      this.authService.setAccessToken(res.token);
      this.router.navigate(['/']).then()
    })
  }
}
