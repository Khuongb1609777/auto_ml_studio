import { Component, OnInit } from "@angular/core";
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
import { COLUMNSDEFS_DATASETS } from '../createModel/constanst'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: "datasets",
  styleUrls: ["./datasets.component.scss"],
  templateUrl: "./datasets.component.html",
})
export class datasetsComponent implements OnInit {
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

  staticAlertClosed = false;
  successMessage = "";

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.frameworkComponents = {
      buttonCreateModel: buttonRenderDatasetComponent,
      buttonDeleteDataset: buttonRenderDatasetComponent,

    };
  }
  async ngOnInit() {
    try {
      this.isShowDelete = false;
      this.isShowCreateModel = false;
      this.isShowData = false;
      this.userIdLogin = "JclGidZqhN";
      this.root_method = "GET";
      this.root_url = environment.apiUrl;
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
      //Create button delete dataset
      this.columnDefs[4] = {
        headerName: "Delete Dataset",
        cellRenderer: "buttonDeleteDataset",
        cellRendererParams: {
          onClick: this.onclickDelete.bind(this),
          label: "Delete",
        },
      }
      //create button create model
      this.columnDefs[5] = {
        headerName: "Create Model",
        cellRenderer: "buttonCreateModel",
        cellRendererParams: {
          onClick: this.onclickCreateModel.bind(this),
          label: "Create",
        },
      }
      // this.gridApi.sizeColumnsToFit();

      this.defaultColDef = {
        // editable: true,
        filter: 'createdAt',
        floatingFilter: true,
        resizable: true,
      };

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
      this.objectIdDelete = e.rowData["objectId"];
      var result = await Axios({
        method: "POST",
        url: this.root_url + "deleteData",
        params: {
          oId: this.objectIdDelete,
        },
      });
      if (result.data['error']) {
        this.resultDelete = "Delete error: " + result.data['error'];
        console.log(this.resultDelete);
      }
      else {
        var resultRegetData = await Axios({
          method: "GET",
          url: "http://localhost:5000/getData",
          params: {
            userId: this.userIdLogin,
          },
        });
        this.showDataResult = resultRegetData.data["results"];
        this.isShowData = true;
        this._success.next(
          ` Delete successfully dataset ${this.objectIdDelete}.`
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  onclickCreateModel(e) {
    try {
      this.objectIdCreateModel = e.rowData["objectId"];
      // this.router.navigate([
      //   "/pages/createModel",
      //   { objectIdData: this.objectIdCreateModel },
      // ]);
      this.router.navigate([
        "/pages/createModel"],
        { queryParams: { objectIdData: this.objectIdCreateModel } });
    } catch (err) {
      console.log(err);
    }
  }

  async formDialog() {
    this.dialog = this.dialogService.open(formUploadComponent, {
      context: {
        dataShow: this.showDataResult,
      },
    });
    this.dialog.onClose.subscribe((resultDataDialog) => {
      async (res) => {
        this.showDataResult = await Axios({
          method: "GET",
          url: this.root_url + "getData",
          params: {
            userId: this.userIdLogin,
          },
        });
      }
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

}
