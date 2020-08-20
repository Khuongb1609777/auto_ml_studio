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
import { manageModelComponent } from "./manageModel/manageModel.component";
import { AgGridModule } from "ag-grid-angular";
import { buttonRenderDatasetModule } from "./datasets/renderer/buttonRenderDataset.module";
import { buttonRenderDatasetComponent } from "./datasets/renderer/buttonRenderDataset.component";
import { buttonRenderManageModelComponent } from "./manageModel/button-renderer/buttonRenderManageModel.component"
import { buttonRenderManageModelModule } from "./manageModel/button-renderer/buttonRenderManageModel.module"
import { HttpClientModule } from "@angular/common/http";
import { navigate } from "@reach/router";
import { formUploadComponent } from "./datasets/formUpload.component";
import { FormUpLoadModule } from "./datasets/formUpload.module";
import { dialogDocsAPIComponent } from "./manageModel/dialogDocsAPI.component";
import { dialogDocsAPIModule } from "./manageModel/dialogDocsAPI.module";

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
    dialogDocsAPIModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    buttonRenderDatasetModule,
    buttonRenderManageModelModule,
    dialogDocsAPIModule,
    FormUpLoadModule,
    AgGridModule.withComponents([buttonRenderDatasetComponent, buttonRenderManageModelComponent]),
  ],
  declarations: [
    PagesComponent,
    datasetsComponent,
    userRegisterComponent,
    createModelComponent,
    manageModelComponent,
  ],
  entryComponents: [
    buttonRenderDatasetComponent,
    dialogDocsAPIComponent,
    formUploadComponent,
    buttonRenderManageModelComponent
  ],
})
export class PagesModule { }
