import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import {
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbTabsetComponent,
    NbSelectModule,
    NbSelectComponent,
    NbSpinnerModule
} from "@nebular/theme";

import { DialogNewRecordComponent } from "./dialog-new-record.component";

@NgModule({
    imports: [NbButtonModule, NbCardModule, NbTabsetModule, CommonModule, FormsModule, NbInputModule, NbSelectModule, NbSpinnerModule, ],
    
    declarations: [DialogNewRecordComponent],
})
export class DialogNewRecordModule { }
