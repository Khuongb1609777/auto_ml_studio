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

import { dialogDeleteDatasetComponent } from "./dialogDeleteDataset.component";

@NgModule({
    imports: [NbButtonModule, NbCardModule, NbTabsetModule, CommonModule],
    declarations: [dialogDeleteDatasetComponent],
})
export class dialogDeleteDatasetModule { }