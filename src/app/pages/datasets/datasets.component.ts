import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Axios from "axios";
import { buttonRenderDatasetComponent } from "./renderer/buttonRenderDataset.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RSA_NO_PADDING } from "constants";
import { navigate } from "@reach/router";
import { NbDialogService } from "@nebular/theme";
import { formUploadComponent } from "./formUpload.component";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { COLUMNSDEFS_DATASETS } from '../createModel/constanst';
import { createModelComponent } from "../createModel/createModel.component";
import { dialogDeleteDatasetComponent } from "./dialogDeleteDataset.component";
import { NbDialogRef } from "@nebular/theme";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Context } from 'ag-grid-community';

@Component({
  selector: "datasets",
  styleUrls: ["./datasets.component.scss"],
  templateUrl: "./datasets.component.html",
})
export class datasetsComponent implements OnInit {
  private errorName: string;
  @HostBinding('class')
  classes = 'example-items-rows';
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
  public defaultColDef;
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  public rowData: any;
  public isDialog: boolean;
  public loading: boolean;

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
      buttonCreateModel: buttonRenderDatasetComponent,
      buttonDeleteDataset: buttonRenderDatasetComponent,

    };
    this.defaultColDef = {
      resizable: true,
      flex: 1,
    };
    this.isDialog = false
  }
  async ngOnInit() {
    try {
      this.isShowDelete = false;
      this.isShowCreateModel = false;
      this.isShowData = false;
      this.userIdLogin = "JclGidZqhN";
      this.root_method = "GET";
      this.root_url = environment.apiUrl;
      this.loading = false;
      const resultShow = await Axios({
        method: "GET",
        url: this.root_url + "getData",
        params: {
          userId: this.userIdLogin,
        },
      });
      this.showDataResult = resultShow.data["results"];
      this.isShowData = true;

      this.columnDefs = COLUMNSDEFS_DATASETS
      this.columnDefs[4] = {
        headerName: "Delete Dataset",
        cellRenderer: "buttonDeleteDataset",
        cellRendererParams: {
          onClick: this.onclickDelete.bind(this),
          label: "Delete",
        },
      }
      this.columnDefs[5] = {
        headerName: "Create Model",
        cellRenderer: "buttonCreateModel",
        cellRendererParams: {
          onClick: this.onclickCreateModel.bind(this),
          label: "Create",
        },
      }


      setTimeout(() => (this.staticAlertClosed = true), 20000);

      this._success.subscribe((message) => (this.successMessage = message));
      this._success
        .pipe(debounceTime(5000))
        .subscribe(() => (this.successMessage = ""));
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

  async onclickDelete(e) {
    try {
      const dialogDeleteData = this.dialogService.open(dialogDeleteDatasetComponent, {
        context: {
          dataName: e.rowData['dataName'],
          objectIdDelete: e.rowData['objectId'],
        }
      });
      dialogDeleteData.onClose.subscribe(async (reloadData) => {
        if (reloadData) {
          const resultShow = await Axios({
            method: "GET",
            url: this.root_url + "getData",
            params: {
              userId: this.userIdLogin,
            },
          });
          this.showDataResult = resultShow.data["results"];
        }

      });
    } catch (err) {
      console.log(err);
    }
  }

  onclickCreateModel(e) {
    try {
      this.loading = true;
      setTimeout(() => this.loading = false, 3000);
      this.objectIdCreateModel = e.rowData["objectId"];
      var objectDataName = e.rowData['dataName']
      // this.router.navigate([
      //   "/pages/createModel"],
      //   { queryParams: { objectIdData: this.objectIdCreateModel } });
      const dialogCreateModel = this.dialogService.open(createModelComponent, {
        context: {
          idDataCreateModel: String(this.objectIdCreateModel),
          nameDataCreateModel: String(objectDataName),
        },
      });
      // this.dialogRef.close
      dialogCreateModel.onClose.subscribe(async (isClose) => {

        if (isClose) {
          var reload = true;
          this.dialogRef.close(reload)
        }

      })
    } catch (err) {
      console.log(err);
    }

  }

  async formDialog() {
    const formDialog = this.dialogService.open(formUploadComponent, {
      context: {
        dataShow: this.showDataResult,
      },
      autoFocus: false
    });
    formDialog.onClose.subscribe(async (reloadData) => {
      var showDataResultTemp = await Axios({
        method: "GET",
        url: this.root_url + "getData",
        params: {
          userId: this.userIdLogin,
        },
      });
      this.showDataResult = showDataResultTemp.data['results']
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
