import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { ParseSDKComponent } from "./parseSDK/parseSDK.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { datasetsComponent } from "./datasets/datasets.component";
import { userRegisterComponent } from "./userRegister/userRegister.component";
import { createModelComponent } from "./createModel/createModel.component";
import { manageModelComponent } from "./manageModel/manageModel.component";

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
        component: datasetsComponent,
      },
      {
        path: "createModel",
        component: createModelComponent,
      },
      {
        path: "manageModel",
        component: manageModelComponent,
      },
      {
        path: "userRegister",
        component: userRegisterComponent,
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
  exports: [RouterModule],
})
export class PagesRoutingModule { }
