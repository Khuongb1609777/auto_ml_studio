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
import { COLUMNSDEFS_DATASET_OBESITY } from '../create-model/constanst';
import { CreateModelComponent } from "../create-model/create-model.component";
import { NbDialogRef } from "@nebular/theme";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Context } from 'ag-grid-community';
import { LOADING } from '../create-model/constanst'
import { NO_ROW_AG_GRID } from '../create-model/constanst'
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import {DialogNewRecordComponent} from "./dialog-new-record.component"
@Component({
  selector: 'ngx-dataset-obesity',
  templateUrl: './dataset-obesity.component.html',
  styleUrls: ['./dataset-obesity.component.scss']
})
export class DatasetObesityComponent implements OnInit {

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


  public single: any;
  public dataCharts: any;
  public PieGenderChart: EChartOption;
  public genderData: any;
  public NCP: any;
  public FHWO: any;
  public CAEC: any;
  public CH2O: any;
  public SMOKE: any;
  public FCVC: any;
  public SCC: any;
  public FAF: any;
  public TUE: any;
  public CALC: any;
  public MTRANS: any;
  public AGE: any;
  public OBESITY: any;
  public FAVC: any;
  public isshowChart: boolean;

  public view: any[] = [500, 400];
  public viewBar: any[] = [800, 400];
  public showLegend: boolean = true;
  public showLabels: boolean = true;
  public legend: boolean = true;
  public animations: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'weight';
  public yAxisLabel: string = 'height';
  public timeline: boolean = true;

  multi: any[];
  public colorScheme = {
    domain: ['#610607', '#061061', '#066156', '#066107','#615C06','#E053AD','#CE53E0','#AA53E0','#8953E0','#535AE0','#5395E0','#53D7E0','#53E0A5','#53E05A','#AAE053','#CEE053','#E0BD53','#E08253']
  };
  public colorScheme2 = {
    domain: ['#8953E0','#615C06','#53D7E0','#53E05A','#AAE053','#061061','#535AE0','#E0BD53','#E08253', '#610607','#CEE053','#5395E0', '#53E0A5', '#066156', '#066107','#E053AD','#CE53E0','#AA53E0']
  };
  public colorScheme3 = {
    domain: ['#5395E0', '#53E0A5', '#066156', '#066107','#E053AD','#CE53E0','#AA53E0','#8953E0','#615C06','#53D7E0','#53E05A','#AAE053','#061061','#535AE0','#E0BD53','#E08253', '#610607','#CEE053']
  };
  // options
  public isDoughnut: boolean = false;
  legendPosition: string = 'below';

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

    };
    this.defaultColDef = {
      resizable: false,
      flex: 1,
      minWidth: 250,
    };
    this.loadingTemplate = `<div><span>Loading...</span></div>`
    this.noRowsTemplate = `<div><span>No data</span></div>`;

    this.isDialog = false
  }

  async ngOnInit(){
    try {
      this.isshowChart = false;
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
          className: "DatasetObesityRaw",
        },
      });
      this.dataset = getDataset.data["results"];
      this.loading = false
      this.isShowData = true;

      this.columnDefs = COLUMNSDEFS_DATASET_OBESITY

      const dataChartsTemp = await Axios({
        method: "GET",
        url: environment.apiUrl + String("get-data-charts-obesity"),
        params: {
          className: 'DatasetObesityRaw',
        },
      })

      this.dataCharts = dataChartsTemp.data;
      this.genderData = this.dataCharts['chart_gender']
      this.FAVC = this.dataCharts['chart_FAVC']
      this.NCP = this.dataCharts['chart_NCP']
      this.FHWO = this.dataCharts['chart_FHWO']
      this.CAEC = this.dataCharts['chart_CAEC']
      this.CH2O = this.dataCharts["chart_CH2O"]
      this.SMOKE = this.dataCharts["chart_SMOKE"]
      this.FCVC = this.dataCharts["chart_FCVC"]
      this.SCC = this.dataCharts['chart_SCC']
      this.FAF= this.dataCharts['chart_FAF']
      this.TUE = this.dataCharts['chart_TUE']
      this.CALC = this.dataCharts['chart_CALC']
      this.MTRANS = this.dataCharts['chart_MTRANS']
      this.AGE = this.dataCharts['chart_age']
      this.OBESITY = this.dataCharts['chart_obesity']
      this.isshowChart = true;
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }
  onClickCreateModel(e) {
    try {
      console.log(e);
      var reload_spiner = true;
      const dialogCreateModel = this.dialogService.open(CreateModelComponent, {
        context: {
          classNameCreateModel: "DatasetObesity",
          dataNameCreateModel: "DatasetMX",
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
  onClickAddRecord(e){
    try {
      // console.log(e);
      var reload_spiner = true;
      const dialogCreateModel = this.dialogService.open(DialogNewRecordComponent, {
        context: {
          classNameAddData: "DatasetObesity",
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

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
    // console.log('Activate', JSON.parse(JSON.stringify(data['value']['value'])));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
