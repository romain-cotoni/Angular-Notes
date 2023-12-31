import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { LogoutComponent } from './core/components/logout/logout.component';
import { ProfilComponent } from './profil/profil.component';
import { NoteShareComponent } from './note-share/note-share.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: '**'        , redirectTo: 'login'                                      },
  { path: ''          , redirectTo: 'login'                                      },
  { path: 'login'     , component: LoginComponent                                },
  { path: 'logout'    , component: LogoutComponent                               },
  { path: 'register'  , component: RegisterComponent                             },
  { path: 'editor'    , component: EditorComponent    , canActivate: [authGuard] },
  { path: 'share-note', component: NoteShareComponent , canActivate: [authGuard] },
  { path: 'dashboard' , component: DashboardComponent , canActivate: [authGuard] },
  { path: 'profil'    , component: ProfilComponent    , canActivate: [authGuard] },
  //{ path: 'note/:id/share', component: NoteShareComponent, canActivate: [authGuard] },
  //{ path: '', redirectTo: 'text-editor', pathMatch: 'full' },
  //{ path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  //{ path: 'editor', canActivate: [authGuard], loadChildren: () => import('./text-editor/text-editor.module').then(m => m.TextEditorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
