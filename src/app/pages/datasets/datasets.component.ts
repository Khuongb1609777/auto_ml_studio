import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Axios from "axios";
import { ButtonRenderDatasetComponent } from "./renderer/button-render-dataset.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RSA_NO_PADDING } from "constants";
import { navigate } from "@reach/router";
import { NbDialogService } from "@nebular/theme";
import { FormUploadComponent } from "./form-upload.component";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { COLUMNSDEFS_DATASETS } from '../create-model/constanst';
import { CreateModelComponent } from "../create-model/create-model.component";
import { DialogDeleteDatasetComponent } from "./dialog-delete-dataset.component";
import { NbDialogRef } from "@nebular/theme";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Context } from 'ag-grid-community';
import { LOADING } from '../create-model/constanst'
import { NO_ROW_AG_GRID } from '../create-model/constanst'

@Component({
  selector: "datasets",
  styleUrls: ["./datasets.component.scss"],
  templateUrl: "./datasets.component.html",
})
export class DatasetsComponent implements OnInit {
  private errorName: string;
  @HostBinding('class')
  classes = 'example-items-rows';
  public dataset: any;
  public data: any;
  public root_url: any;
  public root_method: any;
  public uploadResult: any;
  public filePath: any;
  public fileReview: any;
  public fileUploaded: any;
  public errorUpload: any;
  public showDataResult: any;
  public errorShowdata: any;
  public arrHeader: any[];
  public isShowData: boolean;
  public frameworkComponents: any;
  public objectIdDelete: any;
  public isShowDelete: boolean;
  public resultDelete = {};
  public objectIdCreateModel = {};
  public isShowCreateModel: boolean;
  public formCurrent: any;
  public userIdLogin: any;
  public uploadFileForm: any;
  private _success = new Subject<string>();
  public dialog: any;
  public resultShow: any;
  public defaultColDef: any;
  private gridApi;
  private gridColumnApi;
  public columnDefs: any;
  public rowData: any;
  public isDialog: boolean;
  public loading: boolean;
  public loadingTemplate: string;
  public noRowsTemplate: string;


  staticAlertClosed = false;
  successMessage = "";

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private http: HttpClient,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<any>
  ) {
    this.frameworkComponents = {
      buttonCreateModel: ButtonRenderDatasetComponent,
      buttonDeleteDataset: ButtonRenderDatasetComponent,
      buttonDownloadDataset: ButtonRenderDatasetComponent,

    };
    this.defaultColDef = {
      resizable: false,
      flex: 1,
      minWidth: 150,
    };
    this.loadingTemplate = `<div><span>Loading...</span></div>`
    this.noRowsTemplate = `<div><span>No data</span></div>`;

    this.isDialog = false
  }
  async ngOnInit() {
    try {
      this.loading = true;
      // setTimeout(() => this.loading = false, 3000);
      this.isShowDelete = false;
      this.isShowCreateModel = false;
      this.isShowData = false;
      this.userIdLogin = "JclGidZqhN";
      this.root_method = "GET";
      this.root_url = environment.apiUrl;
      const getDataset = await Axios({
        method: "GET",
        url: this.root_url + "get-datasets",
        params: {
          className: "DatasetMerge",
        },
      });
      this.dataset = getDataset.data["results"];
      this.loading = false
      this.isShowData = true;
      this.columnDefs = COLUMNSDEFS_DATASETS



      // setTimeout(() => (this.staticAlertClosed = true), 20000);

      // this._success.subscribe((message) => (this.successMessage = message));
      // this._success
      //   .pipe(debounceTime(5000))
      //   .subscribe(() => (this.successMessage = ""));
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

  async onClickDelete(e) {
    try {
      const checkDelete = await Axios({
        method: "GET",
        url: this.root_url + "check-data-delete",
        params: {
          className: "Data",
          dataId: e.rowData['objectId'],
        },
      });
      // console.log(checkDelete['data']['status'])
      if (checkDelete['data']['status'] == 200) {
        const dialogDeleteData = this.dialogService.open(DialogDeleteDatasetComponent, {
          context: {
            dataName: e.rowData['dataName'],
            objectIdDelete: e.rowData['objectId'],
          }
        });
        dialogDeleteData.onClose.subscribe(async (reloadData) => {
          if (reloadData) {
            const resultShow = await Axios({
              method: "GET",
              url: this.root_url + "get-data",
              params: {
                userId: this.userIdLogin,
              },
            });
            this.showDataResult = resultShow.data["results"];
          }
        });
      } else {
        this.errorName = "DELETE DATASET"
        var notificationDeleteDataset = checkDelete['data']['error']
        this.toastrService.show(notificationDeleteDataset, `ERROR: ${this.errorName}`, { status: "danger", duration: 7000 });
      }
      // });
    } catch (err) {
      console.log(err);
    }
  }

  onClickCreateModel(e) {
    try {
      this.objectIdCreateModel = e.rowData["objectId"];
      var objectDataName = e.rowData['dataName']
      // this.router.navigate([
      //   "/pages/createModel"],
      //   { queryParams: { objectIdData: this.objectIdCreateModel } });
      var reload_spiner = true;
      const dialogCreateModel = this.dialogService.open(CreateModelComponent, {
        context: {
          idDataCreateModel: String(this.objectIdCreateModel),
          reload: reload_spiner,
        },
      });
      // this.dialogRef.close
      dialogCreateModel.onClose.subscribe(async (isClose) => {

        if (isClose) {
          this.dialogRef.close()
        }

      })
    } catch (err) {
      console.log(err);
    }

  }

  async formDialog() {
    try {
      const formDialog = this.dialogService.open(FormUploadComponent, {
        context: {
          dataShow: this.showDataResult,
        },
        autoFocus: false
      });
      formDialog.onClose.subscribe(async (reloadData) => {
        var showDataResultTemp = await Axios({
          method: "GET",
          url: this.root_url + "get-data",
          params: {
            userId: this.userIdLogin,
          },
        });
        this.showDataResult = showDataResultTemp.data['results']
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  async onClickDownloadDataset(e) {
    try {
      const resultDownload = await Axios({
        method: "GET",
        url: this.root_url + "download-dataset",
        params: {
          dataId: e['rowData']['objectId'],
          className: "Data"
        },
      });
      if (resultDownload['config']['url']) {
        window.open(resultDownload['config']['url'] + "?dataId=" + String(e['rowData']['objectId']) + "&className=Data")
      } else {

      }
    } catch (err) {
      console.log(err);
    }
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}

