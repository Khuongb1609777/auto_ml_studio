import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import {
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbTabsetModule,
    NbTabsetComponent,
} from "@nebular/theme";

import { DialogDocsAPIComponent } from "./dialog-docs-api.component";

@NgModule({
    imports: [NbButtonModule, NbCardModule, NbTabsetModule, CommonModule],
    declarations: [DialogDocsAPIComponent],
})
export class DialogDocsAPIModule { }
