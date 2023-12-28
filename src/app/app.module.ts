import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';
import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule              } from './core/core.module';
import { SharedModule            } from './shared/shared.module';
import { DashboardModule         } from './dashboard/dashboard.module';
import { NoteShareComponent      } from './note-share/note-share.component';
import { EditorComponent         } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteShareComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
