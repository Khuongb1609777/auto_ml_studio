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
  NbSpinnerModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { ShareModule } from "../@shared/share.module";
import { DatasetsComponent } from "./datasets/datasets.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateModelComponent } from "./create-model/create-model.component";
import { ModelsComponent } from "./models/models.component"
import { AgGridModule } from "ag-grid-angular";
import { ButtonRenderDatasetModule } from "./datasets/renderer/button-render-dataset.module";
import { ButtonRenderDatasetComponent } from "./datasets/renderer/button-render-dataset.component";
import { ButtonRenderManageModelComponent } from "./models/button-renderer/button-render-model.component"
import { ButtonRenderManageModelModule } from "./models/button-renderer/button-render-model.module"
import { HttpClientModule } from "@angular/common/http";
import { navigate } from "@reach/router";
import { FormUploadComponent } from "./datasets/form-upload.component";
import { FormUpLoadModule } from "./datasets/form-upload.module";
import { DialogDocsAPIComponent } from "./models/dialog-docs-api.component"
import { DialogDocsAPIModule } from "./models/dialog-docs-api.module";
import { DialogDeleteModelComponent } from "./models/dialog-delete-model.component";
import { DialogDeleteModelModule } from "./models/dialog-delete-model.module";
import { ClipboardModule } from 'ngx-clipboard';


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
    NbSpinnerModule,
    DialogDocsAPIModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonRenderDatasetModule,
    ButtonRenderManageModelModule,
    DialogDocsAPIModule,
    DialogDeleteModelModule,
    FormUpLoadModule,
    ClipboardModule,
    AgGridModule.withComponents([ButtonRenderDatasetComponent, ButtonRenderManageModelComponent]),
  ],
  declarations: [
    PagesComponent,
    DatasetsComponent,
    CreateModelComponent,
    ModelsComponent,
  ],
  entryComponents: [
    ButtonRenderDatasetComponent,
    DialogDocsAPIComponent,
    FormUploadComponent,
    ButtonRenderManageModelComponent,
    DialogDeleteModelComponent
  ],
})
export class PagesModule { }
