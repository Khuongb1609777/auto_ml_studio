import { NgModule } from "@angular/core";
import {
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
} from "@nebular/theme";

import { buttonRenderManageModelComponent } from "./buttonRenderManageModel.component";

@NgModule({
    imports: [NbButtonModule],
    declarations: [buttonRenderManageModelComponent],
})
export class buttonRenderManageModelModule { }
