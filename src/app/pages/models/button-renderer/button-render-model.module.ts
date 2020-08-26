import { NgModule } from "@angular/core";
import {
    NbMenuModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
} from "@nebular/theme";

import { ButtonRenderManageModelComponent } from "./button-render-model.component";

@NgModule({
    imports: [NbButtonModule],
    declarations: [ButtonRenderManageModelComponent],
})
export class ButtonRenderManageModelModule { }
