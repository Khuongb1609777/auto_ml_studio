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
import { COLUMNSDEFS_DATASETS_P } from '../create-model/constanst';
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


@Component({
  selector: 'ngx-datasets-preprocessing',
  templateUrl: './datasets-preprocessing.component.html',
  styleUrls: ['./datasets-preprocessing.component.scss']
})
export class DatasetsPreprocessingComponent implements OnInit {
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


  public single: any;
  public dataCharts: any;
  public PieGenderChart: EChartOption;
  public genderData: any;
  public jobData: any;
  public mealOfThedayData: any;
  public breakfastOfTheweek: any;
  public dinnerOfTheweek: any;
  public fastfoodInWeek: any;
  public vegetableInMeal: any;
  public proteinOfMeal: any;
  public sourceOfFood: any;
  public waterInDay: any;
  public sporttime: any;
  public alcohol: any;
  public timeEx: any;
  public sodawater: any;
  public nicotine: any;
  public chronicDiseases: any;
  public chronicDiseasesMedicine: any;
  public chronicDiseasesRelative: any;
  public requireOfJob: any;
  public transport: any;
  public park: any;
  public sedative: any;
  public depression: any;
  public age: any;
  public heightWeight: any;
  public bmiValues: any;
  public view: any[] = [500, 400];
  public viewBar: any[] = [1000, 350];
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
      console.log(getDataset);
      this.dataset = getDataset.data["results"];
      console.log(this.dataset)
      this.loading = false
      this.isShowData = true;

      this.columnDefs = COLUMNSDEFS_DATASETS_P

      

      // setTimeout(() => (this.staticAlertClosed = true), 20000);

      // this._success.subscribe((message) => (this.successMessage = message));
      // this._success
      //   .pipe(debounceTime(5000))
      //   .subscribe(() => (this.successMessage = ""));
      const dataChartsTemp = await Axios({
        method: "GET",
        url: environment.apiUrl + String("get-data-charts"),
        params: {
          className: 'Dataset',
        },
      })
      this.dataCharts = dataChartsTemp.data;
      console.log(this.dataCharts)
      this.genderData = this.dataCharts['chart_gender']
      this.jobData = this.dataCharts['chart_job']
      this.mealOfThedayData = this.dataCharts['chart_meal_of_theday']
      this.breakfastOfTheweek = this.dataCharts['chart_breakfast_of_theweek']
      this.dinnerOfTheweek = this.dataCharts['chart_dinner_of_theweek']
      this.fastfoodInWeek = this.dataCharts["chart_fastfood_of_theweek"]
      this.vegetableInMeal = this.dataCharts["chart_vegetable_in_meal"]
      this.proteinOfMeal = this.dataCharts["chart_protein_of_meal"]
      this.sourceOfFood = this.dataCharts['chart_source_of_food']
      this.waterInDay = this.dataCharts['chart_water_of_the_day']
      this.timeEx = this.dataCharts['chart_time_doexcercise_for_week']
      this.sporttime = this.dataCharts['chart_sporttime_for_week']
      this.alcohol = this.dataCharts['chart_alcohol']
      this.sodawater = this.dataCharts['chart_sodawater']
      this.nicotine = this.dataCharts['chart_nicotine']
      this.chronicDiseases = this.dataCharts['chart_chronicDiseases']
      this.chronicDiseasesMedicine = this.dataCharts['chart_chronicDiseasesMedicine']
      this.chronicDiseasesRelative = this.dataCharts['chart_chronicDiseasesRelative']
      this.requireOfJob = this.dataCharts['chart_requireOfJob']
      this.transport = this.dataCharts['chart_transport']
      this.park = this.dataCharts['chart_park']
      this.sedative = this.dataCharts['chart_sedative']
      this.depression = this.dataCharts['chart_depression']
      this.age = this.dataCharts['chart_age']
      this.bmiValues = this.dataCharts['chart_bmi']
      // this.heightWeight = [
      //   {
      //     "name": "Chieu cao",
      //     "series": this.dataCharts['chart_height_weight']
      //   },]
      this.heightWeight = this.dataCharts['chart_height_weight']
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
          classNameCreateModel: "DatasetPreprocessing",
          dataNameCreateModel: "DatasetVietNam",
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
