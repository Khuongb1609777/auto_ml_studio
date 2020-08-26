import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
} from "@nebular/theme";

import { ButtonRenderDatasetComponent } from "./button-render-dataset.component";

@NgModule({
  imports: [NbButtonModule],
  declarations: [ButtonRenderDatasetComponent],
})
export class ButtonRenderDatasetModule { }
