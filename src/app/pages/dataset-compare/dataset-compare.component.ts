import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import Axios from "axios";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RSA_NO_PADDING } from "constants";
import { navigate } from "@reach/router";
import { NbDialogService } from "@nebular/theme";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { environment } from '../../../environments/environment';
import { COLUMNSDEFS_DATASETS } from '../create-model/constanst';
import { COLUMNSDEFS_DATASETS_MERGE } from '../create-model/constanst';
import { CreateModelComponent } from "../create-model/create-model.component";
import { NbDialogRef } from "@nebular/theme";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Context } from 'ag-grid-community';
import { LOADING } from '../create-model/constanst'
import { NO_ROW_AG_GRID } from '../create-model/constanst'
@Component({
  selector: 'ngx-dataset-compare',
  templateUrl: './dataset-compare.component.html',
  styleUrls: ['./dataset-compare.component.scss']
})
export class DatasetCompareComponent implements OnInit {

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
    this.defaultColDef = {
      resizable: false,
      flex: 1,
      minWidth: 200,
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
      this.columnDefs = COLUMNSDEFS_DATASETS_MERGE

      // setTimeout(() => (this.staticAlertClosed = true), 20000);

      // this._success.subscribe((message) => (this.successMessage = message));
      // this._success
      //   .pipe(debounceTime(5000))
      //   .subscribe(() => (this.successMessage = ""));
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

}
