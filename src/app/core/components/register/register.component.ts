import { Component } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form!: FormGroup;
  status!: number;
  error!: string;

  constructor(private authenticationService: AuthenticationService,
              private sessionStorageService: SessionStorageService,              
              private formBuilder: FormBuilder,
              private router: Router) {}

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
    this.sessionStorageService.clear();
    let account = this.getAccountFormControls();
    this.authenticationService.register(account).subscribe({
      next: (response) => {  
        //console.log("account: ", response);
        this.router.navigate(['/login']);
      },
      error: (error) => { this.status = error.status; this.error = error.error; console.log("error on register: ", error); },
      complete: () => {}
    })
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }


}
