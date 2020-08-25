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

import { formUploadComponent } from "./formUpload.component";

@NgModule({
  imports: [NbButtonModule, NbCardModule, NbTabsetModule, CommonModule, NbInputModule, FormsModule],
  declarations: [formUploadComponent],
})
export class FormUpLoadModule { }
