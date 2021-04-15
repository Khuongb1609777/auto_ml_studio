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
    selector: "docs-use",
    styleUrls: ["./dialog-use-model-mx.component.scss"],
    templateUrl: "./dialog-use-model-mx.component.html",
})
export class DialogUseModelMxComponent {
    public modelId: string;
    public dataName: string;
    public isshowFromMX: boolean;
    public isshowFromVIE: boolean;
    public age: string;
    public height: string;
    public weight: string;
    public reload: boolean;
    public gender_values: string[];
    public gender: number;
    public CH2O_values: string[];
    public CH2O: number;
    public TUE_values: string[];
    public TUE: number;
    public FAVC_values: string[];
    public FAVC: number;
    public FCVC_values: string[];
    public FCVC: number;
    public FAF_values: string[];
    public FAF: number;
    public SMOKE_values: string[];
    public SMOKE: number;
    public SCC_values: string[];
    public SCC: Number;
    public CALC_values: string[];
    public CALC: number;
    public FHWO_values: string[];
    public FHWO: number;
    public NCP_values: string[];
    public NCP: number[];
    public MTRANS_values: string[];
    public MTRANS: number;
    public CAEC_values: string[];
    public CAEC: number;


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
    

    public prediction: string;
    public isshowKQ: boolean;

    constructor(private dialogRef: NbDialogRef<any>, private toastrService: NbToastrService, private _clipboardService: ClipboardService, private route: ActivatedRoute, private router: Router) {
        this.reload = false;
        this.gender_values =  ['Nữ','Nam'];
        this.CH2O_values =   ['dưới 1 lít',' từ 1 - 2 lít','trên 2 lít'];
        this.TUE_values =  ['dưới 2 giờ','từ 2 - 5 giờ','trên 5 giờ'];
        this.FAVC_values =  ['Không','có']; ////có thường ăn nhiều thức ăn giàu calo không
        this.FCVC_values =  ['không','1 lần mỗi 2 bữa','mỗi bữa ăn']; //tiêu thụ rau trong bưũa ăn
        this.NCP_values =  ["1","2","3","4","5","6"]; //số bưũa ăn chính
        this.CAEC_values =  ['không','cách 1 - 2 bữa 1 lần','cách 3 - 4 bữa 1 lần','luôn luôn']; // ăn bữa phụ
        this.CALC_values =  ['không','1 - 3lần/tuần','3 - 6 lần/tuần','mỗi ngày']; //uống rượu
        this.SCC_values =  ['Không','Có'] //theo dõi lượng calo tiêu thụ
        this.FAF_values =  ['không','1 - 2 ngày 1 lần','2 - 4 ngày 1 lần',' 4 - 5 ngày 1 lần']; //tần suất hoạt động thể chất
        this.MTRANS_values =  ['Ôtô','xe máy','xe đạp','phương tiện công cộng','đi bộ'];
        this.SMOKE_values =  ['Không','có'];
        this.FHWO_values =  ['Không', "có"] // có thành viên trong gia đình bị béo phì không



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
        this.nicotine_values = ["Có","không"];
        this.require_values = ["không","yêu cầu thấp","trung bình","yêu cầu cao","nặng nhọc"];
        this.park_values = ["Có","không"];
        this.timeuse_values = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16"];
        this.depression_values = ["Có","không"];
 

    }

    async ngOnInit() {
        this.reload = false;
        this.gender_values =  ['Nữ','Nam'];
        this.CH2O_values =   ['dưới 1 lít',' từ 1 - 2 lít','trên 2 lít'];
        this.TUE_values =  ['dưới 2 giờ','từ 2 - 5 giờ','trên 5 giờ'];
        this.FAVC_values =  ['không','có']; ////có thường ăn nhiều thức ăn giàu calo không
        this.FCVC_values =  ['không','1 lần mỗi 2 bữa','mỗi bữa ăn']; //tiêu thụ rau trong bưũa ăn
        this.NCP_values =  ["1 bữa/ngày","2 bữa/ngày","3 bữa/ngày","4 bữa/ngày","5 bữa/ngày","6 bữa/ngày"]; //số bưũa ăn chính
        this.CAEC_values =  ['không','cách 1 - 2 bữa 1 lần','cách 3 - 4 bữa 1 lần','luôn luôn']; // ăn bữa phụ
        this.CALC_values =  ['không','1 - 3lần/tuần','3 - 6 lần/tuần','mỗi ngày']; //uống rượu
        this.SCC_values =  ['không','có'] //theo dõi lượng calo tiêu thụ
        this.FAF_values =  ['không','1 - 2 ngày 1 lần','2 - 4 ngày 1 lần',' 4 - 5 ngày 1 lần']; //tần suất hoạt động thể chất
        this.MTRANS_values =  ['Ôtô','xe máy','xe đạp','phương tiện công cộng','đi bộ'];
        this.SMOKE_values =  ['không','có'];
        this.FHWO_values =  ['không', "có"] // có thành viên trong gia đình bị béo phì không


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
        this.sleeptime_values = ["0 tiếng/ngày","1 tiếng/ngày","2 tiếng/ngày","3 tiếng/ngày","4 tiếng/ngày","5 tiếng/ngày","6 tiếng/ngày","7 tiếng/ngày","8 tiếng/ngày","9 tiếng/ngày","10 tiếng/ngày","11 tiếng/ngày","12 tiếng/ngày","13 tiếng/ngày","14 tiếng/ngày","15 tiếng/ngày","16 tiếng/ngày"];
        this.timeuse_values = ["0 tiếng/ngày","1 tiếng/ngày","2 tiếng/ngày","3 tiếng/ngày","4 tiếng/ngày","5 tiếng/ngày","6 tiếng/ngày","7 tiếng/ngày","8 tiếng/ngày","9 tiếng/ngày","10 tiếng/ngày","11 tiếng/ngày","12 tiếng/ngày","13 tiếng/ngày","14 tiếng/ngày","15 tiếng/ngày","16 tiếng/ngày"];
        this.depression_values = ["không","có"];


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

    async useModelMx(){
        try{
            var age = parseFloat(this.age);
            var height = parseFloat(this.height);
            var weight = parseFloat(this.weight);
            if (this.age){
                if (typeof(age) != "number"){
                    var messageCreateModel = "ERROR, please check type of feature 'age' '"
                    this.toastrService.show(messageCreateModel, `Error value: ${this.age}  `, { status: "danger", duration: 4000 });
                }
            }
            else{
                var messageCreateModel = "ERROR, please provide your age"
                this.toastrService.show(messageCreateModel, `Error value: ${this.age}  `, { status: "danger", duration: 4000 });
            }
            if (this,height){
                if(typeof(height) != "number"){
                var messageCreateModel = "ERROR, please check type of feature 'height' '"
                this.toastrService.show(messageCreateModel, `Error value: ${this.height}  `, { status: "danger", duration: 4000 });
                }
                
            }
            else{
                var messageCreateModel = "ERROR, pleaseplease provide your height "
                this.toastrService.show(messageCreateModel, `Error value: ${this.height}  `, { status: "danger", duration: 4000 });
            }

            if(this.weight){
                if(typeof(weight) != "number"){
                var messageCreateModel = "ERROR, please check type of feature 'weight' '"
                this.toastrService.show(messageCreateModel, `Error value: ${this.weight}  `, { status: "danger", duration: 4000 });
            }
            }
            else{
                var messageCreateModel = "ERROR, please provie your weight"
                this.toastrService.show(messageCreateModel, `Error value: ${this.weight}  `, { status: "danger", duration: 4000 });
            }
            
            var newRecord = [this.gender,height, this.FAVC, age, this.NCP, this.FHWO, this.CAEC, this.CH2O, this.SMOKE, this.FCVC, this.SCC, this.FAF, this.TUE, this.CALC, this.MTRANS, weight];
            var newRecordFiltered = newRecord.filter(function (el) {
                return el != null;
              });
            if(newRecordFiltered.length< 16){
                var messageCreateModel = "ERROR, please provie full information"
                this.toastrService.show(messageCreateModel, `Error value: provide full features value  `, { status: "danger", duration: 4000 });
            }
            else{
                console.log(newRecordFiltered);
                var predictResult = await Axios({
                    method: "GET",
                    url: environment.apiUrl + String("load-model"),
                    params: {
                      record: String(newRecord),
                      modelId: this.modelId,
                      classModel: "SystemModelMx",
                    },
                })
                if (predictResult){
                  console.log(predictResult.data.dataPredict[0])
                  this.prediction = predictResult.data.dataPredict[0]
                  this.isshowKQ = true;
                }
                
                
            }
        }
        catch(err){
            console.log(err)
        }
    }


    getGender(event, index, col) {
        try {
          this.gender = index;
          console.log(this.gender);
        } catch (err) {
          console.log(err);
        }
    }
    getCH2O(event, index, col) {
        try {
          this.CH2O = index;
          console.log(this.CH2O);
        } catch (err) {
          console.log(err);
        }
    }
    getTUE(event, index, col) {
        try {
          this.TUE = index;
          console.log(this.TUE);
        } catch (err) {
          console.log(err);
        }
    }
    getFAVC(event, index, col) {
        try {
          this.FAVC = index;
          console.log(this.FAVC);
        } catch (err) {
          console.log(err);
        }
    }
    getFCVC(event, index, col) {
        try {
          this.FCVC = index;
          console.log(this.FCVC);
        } catch (err) {
          console.log(err);
        }
    }
    getNCP(event, index, col) {
        try {
          this.NCP = index;
          console.log(this.NCP);
        } catch (err) {
          console.log(err);
        }
    }
    getCAEC(event, index, col) {
        try {
          this.CAEC = index;
          console.log(this.CAEC);
        } catch (err) {
          console.log(err);
        }
    }
    getCALC(event, index, col) {
        try {
          this.CALC = index;
          console.log(this.CALC);
        } catch (err) {
          console.log(err);
        }
    }
    getSCC(event, index, col) {
        try {
          this.SCC = index;
          console.log(this.SCC);
        } catch (err) {
          console.log(err);
        }
    }
    getFAF(event, index, col) {
        try {
          this.FAF = index;
          console.log(this.FAF);
        } catch (err) {
          console.log(err);
        }
    }
    getMTRANS(event, index, col) {
        try {
          this.MTRANS = index;
          console.log(this.MTRANS);
        } catch (err) {
          console.log(err);
        }
    }
    getSMOKE(event, index, col) {
        try {
          this.SMOKE = index;
          console.log(this.SMOKE);
        } catch (err) {
          console.log(err);
        }
    }
    getFHWO(event, index, col) {
        try {
          this.FHWO = index;
          console.log(this.FHWO);
        } catch (err) {
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
    


  async useModelVn(){
    try{
        var newRecord = [this.meals,this.nicotine, this.sleep, this.require, this.park, this.timeuse, this.depression, this.breakfast, this.protein, this.water, this.vegetable, this.exercise, this.alcohol, this.sport, this.fastfood, this.dinner];
            var predictResult = await Axios({
                method: "GET",
                url: environment.apiUrl + String("load-model"),
                params: {
                  record: String(newRecord),
                  modelId: this.modelId,
                  classModel: "SystemModelVn"
                },
            })
            if (predictResult){
              console.log(predictResult.data.dataPredict[0])
              this.prediction = predictResult.data.dataPredict[0]
              this.isshowKQ = true;
            }
    }
    catch(err){
        console.log(err)
    }
}


}
