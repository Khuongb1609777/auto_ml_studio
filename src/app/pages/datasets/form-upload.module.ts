import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  NbMenuModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbTabsetModule,
  NbTabsetComponent,

} from "@nebular/theme";

import { FormUploadComponent } from "./form-upload.component";

@NgModule({
  imports: [NbButtonModule, NbCardModule, NbTabsetModule, CommonModule, NbInputModule, FormsModule],
  declarations: [FormUploadComponent],
})
export class FormUpLoadModule { }
