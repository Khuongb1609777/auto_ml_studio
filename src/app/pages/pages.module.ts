import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbLayoutModule,
  NbSelectModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { ShareModule } from "../@shared/share.module";
import { datasetsComponent } from "./datasets/datasets.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { userRegisterComponent } from "./userRegister/userRegister.component";
import { createModelComponent } from "./createModel/createModel.component";
import { AgGridModule } from "ag-grid-angular";
import { ButtonRendererModule } from "./datasets/renderer/button-renderer.module";
import { ButtonRendererComponent } from "./datasets/renderer/button-renderer.component";
import { HttpClientModule } from "@angular/common/http";
import { navigate } from "@reach/router";
import { FormUpLoadComponent } from "./datasets/form-upload.component";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    ShareModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    NbRadioModule,
    NbLayoutModule,
    NbSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonRendererModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    PagesComponent,
    datasetsComponent,
    userRegisterComponent,
    createModelComponent,
  ],
  entryComponents: [ButtonRendererComponent],
})
export class PagesModule {}
