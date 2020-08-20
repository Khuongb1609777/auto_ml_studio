import { NgModule } from "@angular/core";
import {
  NbMenuModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
} from "@nebular/theme";

import { buttonRenderDatasetComponent } from "./buttonRenderDataset.component";

@NgModule({
  imports: [NbButtonModule],
  declarations: [buttonRenderDatasetComponent],
})
export class buttonRenderDatasetModule { }
