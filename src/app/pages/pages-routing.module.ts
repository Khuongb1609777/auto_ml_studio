import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { ParseSDKComponent } from "./parseSDK/parseSDK.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { DatasetsComponent } from "./datasets/datasets.component";
import { DatasetsPreprocessingComponent } from "./datasets-preprocessing/datasets-preprocessing.component";
import { DatasetCompareComponent } from "./dataset-compare/dataset-compare.component"
import { DataAnalystComponent } from "./data-analyst/data-analyst.component";
import { DiagnosisObesityComponent } from "./diagnosis-obesity/diagnosis-obesity.component";
import { CreateModelComponent } from "./create-model/create-model.component";
import { ModelsComponent } from "./models/models.component";
import { NbDialogRef } from '@nebular/theme';
import { DatasetObesityComponent } from "./dataset-obesity/dataset-obesity.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "parseSDK",
        component: ParseSDKComponent,
      },
      {
        path: "datasets",
        component: DatasetsComponent,
      },
      {
        path: "datasets-preprocessing",
        component: DatasetsPreprocessingComponent,
      },
      {
        path: "datasets-merge",
        component: DatasetCompareComponent,
      },
      {
        path: "data-analyst",
        component: DataAnalystComponent,
      },
      {
        path: "dataset-obesity",
        component: DatasetObesityComponent,
      },
      {
        path: "diagnosis-obesity",
        component: DiagnosisObesityComponent,
      },
      {
        path: "createModel",
        component: CreateModelComponent,
      },
      {
        path: "models",
        component: ModelsComponent,
      },
      {
        path: "",
        // redirectTo: "dashboard",
        redirectTo: "datasets",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [{
    provide: NbDialogRef,
    useValue: {
      close: (dialogResult: any) => { }
    }
  }],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
