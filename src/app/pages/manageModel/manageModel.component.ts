import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
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
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { createModelComponent } from "../createModel/createModel.component"
import { datasetsComponent } from "../datasets/datasets.component"
import { dialogDeleteModelComponent } from "./dialogDeleteModel.component"
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { stringToArray, Context } from 'ag-grid-community';

@Component({
  selector: "manageModel",
  styleUrls: ["./manageModel.component.scss"],
  templateUrl: "./manageModel.component.html",
})
export class manageModelComponent implements OnInit {
  private errorName: String;
  @HostBinding('class')
  classes = 'example-items-rows';
  public data: any;
  public root_url: string;
  public showDataModels: any;
  public isShowModels: any;
  public userIdLogin: string;
  public columnDefs: any[];
  public frameworkComponents: any;
  public athmApi: string;
  public colFeatureModel: string;
  public colFeatureModelName: string;
  public colLabelModel: string;
  public colLabelModelName: string;
  public modelId: string;
  public dataId: string;
  public descriptionModel: string;
  public errorFlag: boolean;
  public infoApi: string;
  public dataName: string;
  public dialog: any;
  public defaultColDef;
  public updatedShowModel: boolean;
  public showDataModelsUpdate: any;
  public keyUpdate: boolean;


  staticAlertClosed = false;
  successMessage = "";

  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) {
    this.frameworkComponents = {
      buttonDeleteModel: buttonRenderManageModelComponent,
      buttonShowDetailModel: buttonRenderManageModelComponent,
    };

    this.defaultColDef = {
      // editable: true,
      filter: 'createdAt',
      floatingFilter: true,
      resizable: true,
    };
  }

  async ngOnInit() {
    try {
      this.errorFlag = false;
      this.userIdLogin = "JclGidZqhN";
      this.root_url = "http://localhost:5000/";
      if (this.keyUpdate) {
        this.showDataModels = this.showDataModelsUpdate
      }
      else {
        const resultShow = await Axios({
          method: "GET",
          url: this.root_url + String("getDataModels"),
          params: {
            userId: this.userIdLogin,
          },
        });
        this.showDataModels = resultShow.data["results"];
        console.log(this.showDataModels);
      }

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
      const dialogDeleteModel = this.dialogService.open(dialogDeleteModelComponent, {
        context: {
          objectIdDelete: e.rowData['objectId'],
          nameObjectDelete: e.rowData['modelName'],
          userIdLogin: this.userIdLogin
        }
      }
      );
      dialogDeleteModel.onClose.subscribe(async (reloadData) => {
        if (reloadData) {
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
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  formDialogCreateModel() {
    const dialogCreateModel = this.dialogService.open(datasetsComponent, {
      context: {
        isDialog: true,
      }
    }
    );
    dialogCreateModel.onClose.subscribe(async (resultDataDialog) => {
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
    });
  }
}
