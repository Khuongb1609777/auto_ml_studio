import { NgModule } from "@angular/core";
import { NbMenuModule, NbInputModule, NbCardModule, NbButtonModule } from "@nebular/theme";

import {ButtonRendererComponent} from './button-renderer.component'


@NgModule({
  imports: [
    NbButtonModule,
    

  ],
  declarations: [ButtonRendererComponent],
})
export class ButtonRendererModule {}
