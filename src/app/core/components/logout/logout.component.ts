import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) {
    this.authenticationService.logout();
    this.userService.deleteCurrentUser();
    this.sessionStorageService.clear();
  }

  onHomeClick() {
    this.router.navigateByUrl("/dashboard");
  }

}
