import { ClipboardService } from 'ngx-clipboard';
import { Component, OnInit, ViewEncapsulation, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute } from "@angular/router";
import Axios from "axios";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { NbComponentSize } from "@nebular/theme";
import { NbDialogService } from "@nebular/theme";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { NbDialogRef } from "@nebular/theme";
import { NbInputModule } from "@nebular/theme"
import { NbSelectModule } from "@nebular/theme"


@Component({
    selector: "dialog-new-record",
    styleUrls: ["./dialog-new-record.component.scss"],
    templateUrl: "./dialog-new-record.component.html",
})
export class DialogNewRecordComponent {
    public isshowFromVIE: boolean;
    public class_name: string;
    public meals_values: string[];
    public meals: number;
    public breakfast_values: string[];
    public breakfast: number;
    public dinner_values: string[];
    public dinner: number;
    public fastfood_values: string[];
    public fastfood: number;
    public vegetable_values: string[];
    public vegetable: number;
    public water_values: string[];
    public water: number;
    public protein_values: string[];
    public protein: number;
    public exercise_values: string[];
    public exercise: number;
    public sport_values: string[];
    public sport: number;
    public alcohol_values: string[];
    public alcohol: number;
    public nicotine_values: string[];
    public nicotine: Number;
    public sleeptime_values: string[];
    public sleep: number;
    public require_values: string[];
    public require: number;
    public park_values: string[];
    public park: number;
    public timeuse_values: string[];
    public timeuse: number;
    public depression_values: string[];
    public depression: number;
    public obesity_values: string[]
    public obesity: number;
    public reload: boolean;

    public prediction: string;
    public isshowKQ: boolean;

    constructor(private dialogRef: NbDialogRef<any>, private toastrService: NbToastrService, private _clipboardService: ClipboardService, private route: ActivatedRoute, private router: Router) {

        this.meals_values = ["1","2","3","4","5","6","7"];
        this.breakfast_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.dinner_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.fastfood_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.vegetable_values = ["dưới 50 gram/bữa","từ 50 - 100 gram/bữa","trên 100 gram/bữa"];
        this.protein_values = ["dưới 50 gram/bữa","từ 50 - 100 gram/bữa","trên 100 gram/bữa"];
        this.water_values = ["dưới 1 lít/ngày","từ 1 - 2 lít/ngày","từ 2 - 3 lít/ngày"];
        this.exercise_values = ["không","dưới 1 giờ/tuần","từ 1 - 3 giờ/tuần","trên 3 giờ/tuần"];
        this.sport_values = ["không","dưới 1 giờ/tuần","từ 1 - 3 giờ/tuần","trên 3 giờ/tuần"];
        this.alcohol_values = ["không","có"];
        this.nicotine_values = ["không","có"];
        this.require_values = ["không","yêu cầu thấp","trung bình","yêu cầu cao","nặng nhọc"];
        this.park_values = ["không","có"];
        this.timeuse_values = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
        this.depression_values = ["không","có"];
        this.obesity_values = ["Thiếu cân","Bình thường","Tiền béo phì","Béo phì loại 1","Béo phì loại 2","Béo phì loại 3"]
 

    }

    async ngOnInit() {

        this.meals_values = ["1","2","3","4","5","6","7"];
        this.breakfast_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.dinner_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.fastfood_values = ["không","từ 1 - 2 bữa/tuần","từ 3 - 4 bữa/tuần","từ 5 - 6 bữa/tuần","hằng ngày"];
        this.vegetable_values = ["dưới 50 gram/bữa","từ 50 - 100 gram/bữa","trên 100 gram/bữa"];
        this.protein_values = ["dưới 50 gram/bữa","từ 50 - 100 gram/bữa","trên 100 gram/bữa"];
        this.water_values = ["dưới 1 lít/ngày","từ 1 - 2 lít/ngày","từ 2 - 3 lít/ngày"];
        this.exercise_values = ["không","dưới 1 giờ/tuần","từ 1 - 3 giờ/tuần","trên 3 giờ/tuần"];
        this.sport_values = ["không","dưới 1 giờ/tuần","từ 1 - 3 giờ/tuần","trên 3 giờ/tuần"];
        this.alcohol_values = ["không","có"];
        this.nicotine_values = ["không","có"];
        this.require_values = ["không","yêu cầu thấp","trung bình","yêu cầu cao","nặng nhọc"];
        this.park_values = ["không","có"];
        this.sleeptime_values = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
        this.timeuse_values = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
        this.depression_values = ["không","có"];
        this.obesity_values = ["Thiếu cân","Bình thường","Tiền béo phì","Béo phì loại 1","Béo phì loại 2","Béo phì loại 3"]
 



        this.isshowKQ = false;

    }
    copyCurlCsv() {
        try {

        }
        catch (err) {
            console.log(err);
        }
    }


    copyCurlJson() {
        try {
            
        }
        catch (err) {
            console.log(err);
        }
    }

    getMeals(event, index, col) {
      try {
        this.meals = index + 1;
      } catch (err) {
        console.log(err);
      }
  }
  getBreakfast(event, index, col) {
      try {
        this.breakfast = index;
      } catch (err) {
        console.log(err);
      }
  }
  getDinner(event, index, col) {
      try {
        this.dinner = index;
      } catch (err) {
        console.log(err);
      }
  }
  getFastfood(event, index, col) {
      try {
        this.fastfood = index;
      } catch (err) {
        console.log(err);
      }
  }
  getVegetable(event, index, col) {
      try {
        this.vegetable = index;
      } catch (err) {
        console.log(err);
      }
  }
  getProtein(event, index, col) {
      try {
        this.protein = index;
      } catch (err) {
        console.log(err);
      }
  }
  getWater(event, index, col) {
      try {
        this.water = index;
      } catch (err) {
        console.log(err);
      }
  }
  getExercise(event, index, col) {
      try {
        this.exercise = index;
      } catch (err) {
        console.log(err);
      }
  }
  getSport(event, index, col) {
      try {
        this.sport = index;
      } catch (err) {
        console.log(err);
      }
  }
  getAlcohol(event, index, col) {
      try {
        this.alcohol = index;
      } catch (err) {
        console.log(err);
      }
  }
  getNicotine(event, index, col) {
      try {
        this.nicotine = index;
      } catch (err) {
        console.log(err);
      }
  }
  getRequire(event, index, col) {
      try {
        this.require = index;
      } catch (err) {
        console.log(err);
      }
  }
  getPark(event, index, col) {
      try {
        this.park = index;
      } catch (err) {
        console.log(err);
      }
  }
  getTimeuse(event, index, col) {
    try {
      this.timeuse = index;
    } catch (err) {
      console.log(err);
    }
  }
  getDepression(event, index, col) {
    try {
      this.depression = index;
    } catch (err) {
      console.log(err);
    }
  }

  getSleeptime(event, index, col) {
    try {
      this.sleep = index;
    } catch (err) {
      console.log(err);
    }
  }

  getObesity(event, index, col) {
    try {
      this.obesity = index;
    } catch (err) {
      console.log(err);
    }
  }
    


  async add_data(){
    try{
        var newRecord = [this.meals,this.nicotine, this.sleep, this.require, this.park, this.timeuse, this.depression, this.breakfast, this.protein, this.water, this.vegetable, this.exercise, this.alcohol, this.sport, this.fastfood, this.dinner, this.obesity];
        var newRecordFiltered = newRecord.filter(function (el) {
            return el != null;
          });
        console.log(newRecord)
        if(newRecordFiltered.length< 17){
            var messageCreateModel = "ERROR, please provie full information"
            this.toastrService.show(messageCreateModel, `Error value: provide full features value  `, { status: "danger", duration: 4000 });
        }
        else{
            var predictResult = await Axios({
                method: "POST",
                url: environment.apiUrl + String("new-record-survey"),
                params: {
                  record: String(newRecord),
                  className:"DatasetSurveyBalance"
                },
            })
            if (predictResult){
              var messageCreateModel = "Thêm mẫu thành công"
              this.reload = false;
              this.toastrService.show(messageCreateModel, `Thành công:`, { status: "success", duration: 4000 });
            }
        }
    }
    catch(err){
        console.log(err)
    }
}


}
