import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';
import { SharedRoutingModule   } from './shared-routing.module';
import { FormsModule           } from '@angular/forms';
import { ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule      } from '@angular/common/http';
import { AsyncPipe             } from '@angular/common';

//MATERIAL MODULES:
import { MatButtonModule       } from '@angular/material/button';
import { MatSelectModule       } from '@angular/material/select';
import { MatIconModule         } from '@angular/material/icon';
import { MatTooltipModule      } from '@angular/material/tooltip';
import { MatFormFieldModule    } from '@angular/material/form-field';
import { MatInputModule        } from '@angular/material/input';
import { MatDialogModule       } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule         } from '@angular/material/menu';
import { MatSlideToggleModule  } from '@angular/material/slide-toggle';
import { MatCardModule         } from '@angular/material/card';
import { MatToolbarModule      } from '@angular/material/toolbar';
import { MatChipsModule        } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AsyncPipe,
    
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
    
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,

    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  providers: [],
})
export class SharedModule { }
