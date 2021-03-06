// Author: T4professor
import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";

@Component({
  selector: "app-button-renderer",
  templateUrl: "./button-render-dataset.component.html",
})
export class ButtonRenderDatasetComponent implements ICellRendererAngularComp {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  ngOnChanges() {
    console.log('change', this.params)
  }

  onClick(event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
