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
    styleUrls: ["./dialog-new-record.component.scss"],
    templateUrl: "./dialog-new-record.component.html",
})
export class DialogNewRecordComponent {
    public modelId: string;
    public dataName: string;
    public isshowFrom: boolean;
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
    public NCP_values: number[];
    public NCP: number[];
    public MTRANS_values: string[];
    public MTRANS: number;
    public CAEC_values: string[];
    public CAEC: number;
    public OBESITY_values: string[];
    public CLASS_OB: number;
    public classNameAddData: string;

    public prediction: string;
    public isshowKQ: boolean;
    public loading: boolean;
    public kqAdd: string;

    constructor(private dialogRef: NbDialogRef<any>, private toastrService: NbToastrService, private _clipboardService: ClipboardService, private route: ActivatedRoute, private router: Router) {
        this.reload = false;
        this.gender_values =  ['Nữ','Nam'];
        this.CH2O_values =   ['dưới 1 lít',' từ 1 - 2 lít','trên 2 lít'];
        this.TUE_values =  ['dưới 2 giờ','từ 2 - 5 giờ','trên 5 giờ'];
        this.FAVC_values =  ['có','không']; ////có thường ăn nhiều thức ăn giàu calo không
        this.FCVC_values =  ['không bao giờ','thỉnh thoảng','mỗi bữa ăn']; //tiêu thụ rau trong bưũa ăn
        this.NCP_values =  [1,2,3,4,5,6]; //số bưũa ăn chính
        this.CAEC_values =  ['không','thỉnh thoảng','thường xuyên','luôn luôn']; // ăn bữa phụ
        this.CALC_values =  ['không','thỉnh thoảng','thường xuyên','mỗi ngày']; //uống rượu
        this.SCC_values =  ['có','không'] //theo dõi lượng calo tiêu thụ
        this.FAF_values =  ['không','1 - 2','2 - 4 ngày',' 4 - 5 ngày']; //tần suất hoạt động thể chất
        this.MTRANS_values =  ['Ôtô','xe máy','xe đạp','phương tiện công cộng','đi bộ'];
        this.SMOKE_values =  ['có','không'];
        this.FHWO_values =  ['có', "không"] // có thành viên trong gia đình bị béo phì không

    }

    async ngOnInit() {
        this.isshowFrom = true;
        this.reload = false;
        this.gender_values =  ['Nữ','Nam'];
        this.CH2O_values =   ['dưới 1 lít',' từ 1 - 2 lít','trên 2 lít'];
        this.TUE_values =  ['dưới 2 giờ','từ 2 - 5 giờ','trên 5 giờ'];
        this.FAVC_values =  ['không','có']; ////có thường ăn nhiều thức ăn giàu calo không
        this.FCVC_values =  ['không bao giờ','tỉnh thoảng','luôn ăn']; //tiêu thụ rau trong bưũa ăn
        this.NCP_values =  [0,1,2,3,4,5,6]; //số bưũa ăn chính
        this.CAEC_values =  ['không','thỉnh thoảng','thường xuyên','luôn luôn']; // ăn bữa phụ
        this.CALC_values =  ['không','thỉnh thoảng','thường xuyên','luôn luôn']; //uống rượu
        this.SCC_values =  ['không','có'] //theo dõi lượng calo tiêu thụ
        this.FAF_values =  ['không','1 - 2','2 - 4 ngày',' 4 - 5 ngày']; //tần suất hoạt động thể chất
        this.MTRANS_values =  ['Ôtô','xe máy','xe đạp','phương tiện công cộng','đi bộ'];
        this.SMOKE_values =  ['không','có'];
        this.FHWO_values =  ['không', "có"] // có thành viên trong gia đình bị béo phì không
        this.OBESITY_values = ["Insufficient_Weight","Normal_Weight","Overweight_Level_I","Overweight_Level_II","Obesity_Type_I","Obesity_Type_II","Obesity_Type_III",]
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

    async addRecord(){
        try{
            this.reload = true;
            setTimeout(() => this.loading = false, 3000);
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
            
            var newRecord = [this.gender,height, this.FAVC, age, this.NCP, this.FHWO, this.CAEC, this.CH2O, this.SMOKE, this.FCVC, this.SCC, this.FAF, this.TUE, this.CALC, this.MTRANS, weight, this.CLASS_OB];
            var newRecordFiltered = newRecord.filter(function (el) {
                return el != null;
              });
            if(newRecordFiltered.length< 17){
                var messageCreateModel = "ERROR, please provie full information"
                this.toastrService.show(messageCreateModel, `Error value: provide full features value  `, { status: "danger", duration: 4000 });
            }
            else{
                console.log(newRecordFiltered);
                var uploadResult = await Axios({
                    method: "POST",
                    url: environment.apiUrl + String("add-record-obesity"),
                    params: {
                      record: String(newRecord),
                      className: this.classNameAddData,
                      classNameRaw: "DatasetObesityRaw"
                    },
                })
                if (uploadResult){
                    console.log(uploadResult)
                    this.isshowKQ = true;
                    var errorName = "Create Model"
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


    getGender(event, index, col) {
        try {
          this.gender = index;
        } catch (err) {
          console.log(err);
        }
    }
    getCH2O(event, index, col) {
        try {
          this.CH2O = index;
        } catch (err) {
          console.log(err);
        }
    }
    getTUE(event, index, col) {
        try {
          this.TUE = index;
        } catch (err) {
          console.log(err);
        }
    }
    getFAVC(event, index, col) {
        try {
          this.FAVC = index;
        } catch (err) {
          console.log(err);
        }
    }
    getFCVC(event, index, col) {
        try {
          this.FCVC = index;
        } catch (err) {
          console.log(err);
        }
    }
    getNCP(event, index, col) {
        try {
          this.NCP = index;
        } catch (err) {
          console.log(err);
        }
    }
    getCAEC(event, index, col) {
        try {
          this.CAEC = index;
        } catch (err) {
          console.log(err);
        }
    }
    getCALC(event, index, col) {
        try {
          this.CALC = index;
        } catch (err) {
          console.log(err);
        }
    }
    getSCC(event, index, col) {
        try {
          this.SCC = index;
        } catch (err) {
          console.log(err);
        }
    }
    getFAF(event, index, col) {
        try {
          this.FAF = index;
        } catch (err) {
          console.log(err);
        }
    }
    getMTRANS(event, index, col) {
        try {
          this.MTRANS = index;
        } catch (err) {
          console.log(err);
        }
    }
    getSMOKE(event, index, col) {
        try {
          this.SMOKE = index;
        } catch (err) {
          console.log(err);
        }
    }
    getFHWO(event, index, col) {
        try {
          this.FHWO = index;
        } catch (err) {
          console.log(err);
        }
    }
    getClass(event, index, col) {
        try {
          this.CLASS_OB = index;
        } catch (err) {
          console.log(err);
        }
    }
    


}
