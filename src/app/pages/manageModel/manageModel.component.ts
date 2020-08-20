import { Component, OnInit } from "@angular/core";
import Axios from "axios";
import { buttonRenderManageModelComponent } from "./button-renderer/buttonRenderManageModel.component";
import {
  NbDialogService,
  NbAccordionItemHeaderComponent,
} from "@nebular/theme";
import { dialogDocsAPIComponent } from "./dialogDocsAPI.component";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { COLUMNSDEFS_MANAGE_MODEL } from "../createModel/constanst"

@Component({
  selector: "manageModel",
  styleUrls: ["./manageModel.component.scss"],
  templateUrl: "./manageModel.component.html",
})
export class manageModelComponent implements OnInit {
  public data: any;
  public root_url: any;
  public showDataModels: any;
  public isShowModels: any;
  public userIdLogin: any;
  public columnDefs: any[];
  public frameworkComponents: any;
  public athmApi: any;
  public colFeatureModel: any;
  public colFeatureModelName: any;
  public colLabelModel: any;
  public colLabelModelName: any;
  public modelId: any;
  public dataId: any;
  public descriptionModel: any;
  public errorFlag: boolean;
  public infoApi: any;
  public dataName: any;
  public dialog: any;
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = "";

  constructor(private dialogService: NbDialogService) {
    this.frameworkComponents = {
      buttonDeleteModel: buttonRenderManageModelComponent,
      buttonShowDetailModel: buttonRenderManageModelComponent,
    };
  }

  async ngOnInit() {
    try {
      this.errorFlag = false;
      this.userIdLogin = "JclGidZqhN";
      this.root_url = "http://localhost:5000/";
      const resultShow = await Axios({
        method: "GET",
        url: this.root_url + String("getDataModels"),
        params: {
          userId: this.userIdLogin,
        },
      });
      this.showDataModels = resultShow.data["results"];
      this.showDataModels.forEach((value, index) => {
        this.showDataModels[index]["idDataModel"] = this.showDataModels[index][
          "dataModel"
        ]["objectId"];
        var fullName = this.showDataModels[index]["modelFile"]["name"].split(
          "_",
          5
        );
        this.showDataModels[index]["athmAndDataName"] = String(
          fullName[2]
        ).split(".", 2)[0];
      });

      this.isShowModels = true;

      this.columnDefs = COLUMNSDEFS_MANAGE_MODEL
      this.columnDefs[4] = {
        headerName: "Delete Model",
        cellRenderer: "buttonDeleteModel",
        cellRendererParams: {
          onClick: this.onclickDelete.bind(this),
          label: "Delete",
        },
      }
      this.columnDefs[5] = {
        headerName: "Setup Postman",
        cellRenderer: "buttonShowDetailModel",
        cellRendererParams: {
          onClick: this.onclickShowDetailModel.bind(this),
          label: "Publish Api",
        },
      }

    } catch (err) {
      this.data = "rpa-iot-api";
    }

    setTimeout(() => (this.staticAlertClosed = true), 20000);

    this._success.subscribe((message) => (this.successMessage = message));
    this._success
      .pipe(debounceTime(5000))
      .subscribe(() => (this.successMessage = ""));
  }

  async onclickShowDetailModel(e) {
    try {
      this.modelId = e.rowData["objectId"];
      this.dataId = e.rowData["idDataModel"];
      var infoApiTemp = await Axios({
        method: "GET",
        url: this.root_url + String("detailModel"),
        params: {
          modelId: this.modelId,
        },
      })
      this.infoApi = infoApiTemp.data
      if (this.infoApi["error"]) {
        var errorGetDetail = this.infoApi["error"];
        this.errorFlag = true;
        this.dialog = this.dialogService.open(dialogDocsAPIComponent, {
          context: {
            errorDetail: errorGetDetail,
          },
        });
      } else {
        this.athmApi = this.infoApi["algorithm"];
        this.colFeatureModel = this.infoApi["colFeature"];
        this.colFeatureModelName = this.infoApi["colFeatureName"];
        this.colLabelModel = this.infoApi["colLabel"];
        this.colLabelModelName = this.infoApi["colLabelName"];
        this.descriptionModel = this.infoApi["description"];
        this.dataName = this.infoApi["dataName"];
        console.log(this.dialogService)
        this.dialogService.open(dialogDocsAPIComponent, {
          context: {
            athm: this.athmApi,
            colFeature: this.colFeatureModel,
            colFeatureName: this.colFeatureModelName,
            colLabel: this.colLabelModel,
            colLabelName: this.colLabelModelName,
            modelId: this.modelId,
            dataId: this.dataId,
            dataName: this.dataName,
            urlApi: "http://localhost:5000/createApiModel",
            descriptionModel: this.descriptionModel,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onclickDelete(e) {
    try {
      var objectIdDelete = e.rowData["objectId"];
      var resultDelete = await Axios({
        method: "POST",
        url: this.root_url + String("deleteDataModel"),
        params: {
          oId: objectIdDelete,
          class: "Model",
        },
      })

      var showDataModelsTemp = await Axios({
        method: "GET",
        url: this.root_url + String("getDataModels"),
        params: {
          userId: this.userIdLogin,
        },
      })

      this.showDataModels = showDataModelsTemp.data["results"];
      this.showDataModels.forEach((value, index) => {
        this.showDataModels[index]["idDataModel"] = this.showDataModels[
          index
        ]["dataModel"]["objectId"];
        this.showDataModels[index]["idDataModel"] = this.showDataModels[
          index
        ]["dataModel"]["objectId"];
        var fullName = this.showDataModels[index]["modelFile"][
          "name"
        ].split("_", 5);
        this.showDataModels[index]["athmAndDataName"] = (
          String(fullName[2]) +
          "-" +
          String(fullName[3])
        ).split(".", 2)[0];
      });
      this._success.next(`delete successfully model ${objectIdDelete}`);
    } catch (err) {
      console.log(err);
    }
  }
}
