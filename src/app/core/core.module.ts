import { NgModule                 } from '@angular/core';
import { CommonModule             } from '@angular/common';
import { CoreRoutingModule        } from './core-routing.module';
import { SharedModule             } from '../shared/shared.module';

import { HeaderComponent          } from './components/header/header.component';
import { FooterComponent          } from './components/footer/footer.component';
import { LoginComponent           } from './components/login/login.component';
import { RegisterComponent        } from './components/register/register.component';
import { httpInterceptorProviders } from '../interceptors/httpRequestInterceptor';
import { DialogComponent          } from '../dialogs/dialog/dialog.component';
import { Dialog2Component         } from '../dialogs/dialog2/dialog2.component';
import { LogoutComponent          } from './components/logout/logout.component';
import { DialogFontComponent      } from '../dialogs/dialog-font/dialog-font.component';
import { ProfilComponent          } from '../profil/profil.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    Dialog2Component,
    LogoutComponent,
    DialogFontComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  providers: [httpInterceptorProviders],
})
export class CoreModule { }

