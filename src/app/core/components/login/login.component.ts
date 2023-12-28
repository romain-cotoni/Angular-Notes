import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { User } from '../../../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  status!: number;
  constructor(private authenticationService: AuthenticationService,
              private sessionStorageService: SessionStorageService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({ 
      'usernameControl': ['rom1'], //, [Validators.required, Validators.pattern("")]
      'passwordControl': ['ssap'],
      'roleControl'    : ['USER'],   
    })
  }

  getAccountFormControls() {
    return {
      'username': this.form.get('usernameControl')?.value,
      'password': this.form.get('passwordControl')?.value,
      'role'    : this.form.get('roleControl')?.value
    };
  }

  onSubmit() {
    let account = this.getAccountFormControls();
    this.authenticationService.login(account).subscribe({
      next: (response) => {
        console.log("login -> authenticationService -> subscribe: ", response);
        this.userService.setCurrentUser(response.user);
        this.sessionStorageService.setUser(response.user);
        this.sessionStorageService.saveToken(response.jwtToken);
        this.router.navigate(['/dashboard']);
      },
      error   : (error) => { this.status = error.status; console.log("error on login: ", error) },
      complete: () => {}
    })
  }

  onRegisterClick() {
    this.router.navigate(['/register']);
  }

}
