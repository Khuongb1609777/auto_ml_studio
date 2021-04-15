import { Component, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EChartOption } from 'echarts';
import Axios from "axios";
import { environment } from '../../../environments/environment';
import { single } from './data';


@Component({
  selector: 'ngx-data-analyst',
  templateUrl: './data-analyst.component.html',
  styleUrls: ['./data-analyst.component.scss']
})
export class DataAnalystComponent implements OnInit {
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


  // options




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

  constructor() {
  }

  async ngOnInit(){
    try{
      const dataChartsTemp = await Axios({
        method: "GET",
        url: environment.apiUrl + String("get-data-charts"),
        params: {
          className: 'Dataset',
        },
      })
      this.dataCharts = dataChartsTemp.data;
      // console.log(this.dataCharts)
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
    }
    catch(err){
      console.log(err)
    }
    
  }
  
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
    // console.log('Activate', JSON.parse(JSON.stringify(data['value']['value'])));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
