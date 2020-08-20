import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NbDialogRef } from "@nebular/theme";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import Axios from "axios";
import {
  NbMenuModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbRadioModule,
  NbLayoutModule,
  NbSelectModule,
  NbTabsetModule,
} from "@nebular/theme";
import { Console } from "console";

@Component({
  selector: "docsAPI",
  styleUrls: ["./dialogDocsAPI.component.scss"],
  templateUrl: "./dialogDocsAPI.component.html",
})
export class dialogDocsAPIComponent {
  userIdLogin = "JclGidZqhN";
  root_method = "POST";
  root_url = "http://localhost:5000/";
  public athm: any;
  public colLabel: any;
  public colLabelName: any;
  public colFeature: any;
  public colFeatureName: any;
  public modelId: any;
  public dataId: any;
  public urlApi: any;
  public descriptionModel: any;
  public errorDetail: any;
  public errorFlag: boolean;
  public flagSuccess: boolean;
  public dataName: any;

  constructor(private dialogRef: NbDialogRef<any>) {
    this.athm = "";
    this.colLabel = "";
    this.colLabelName = "";
    this.colFeatureName = "";
    this.colFeature = "";
    this.modelId = "";
    this.dataId = "";
    this.urlApi = "";
    this.descriptionModel = "";
    this.errorFlag = false;
    this.flagSuccess = false;
    this.errorDetail = "";
    this.dataName = "adfasf";
  }

  ngOnInit() {
    console.log(this.dataName);
    if (this.errorDetail) {
      this.errorFlag = true;
    } else {
      this.flagSuccess = true;
    }
  }
}
