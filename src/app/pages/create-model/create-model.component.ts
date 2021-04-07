import { Component, OnInit, ViewEncapsulation, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { NbComponentSize } from "@nebular/theme";
import { NbDialogService } from "@nebular/theme";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { GET_COLUMNS_FROM } from './constanst';
import { CHECK_PARAMS_CREATE_MODEL } from './constanst'
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "createModel",
  styleUrls: ["./create-model.component.scss"],
  templateUrl: "./create-model.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
    ::ng-deep nb-layout-column {
      height: 80vw;
    }
  `,
  ],
})
export class CreateModelComponent implements OnInit {
  private errorName: string;
  @HostBinding('class')
  classes = 'example-items-rows';
  public errorLogin: boolean;
  public notification: string;
  public sessionToken: boolean;
  public data: any;
  public result: any;
  public root_url: string;
  public arrColData: any[];
  public arrAlgorithm: any[];
  public algorithm: any;
  public algorithmId: any;
  public paramChoose: any;
  public params: any[];
  public paramValuesDefault: any[];
  public customParams: any;
  public isshowFrom: boolean;
  public idDataCreateFrom: string;
  public colLabel: number;
  public colFeature: any[];
  public sizes: NbComponentSize[];
  public isshowParam: boolean;
  public inputValue: any;
  public selectArr: any[];
  public isSelectAll: any;
  public checkAllFlag: boolean;
  public chooseDataFlag: boolean;
  public notificationCreate: {};
  public errorCreate: {};
  public defaultParamsFlag: boolean;
  public idDataCreateModel: string;
  public classNameCreateModel: string;
  public className: string;
  public modelName: String;
  public userId: string;
  public loading: boolean;
  public reload: boolean;
  public dataNameCreateModel: string;
  public dataName: string;

  constructor(private route: ActivatedRoute, private router: Router, private toastrService: NbToastrService, private dialogRef: NbDialogRef<any>) {
    this.reload = false;
  }
  message: string;
  async ngOnInit() {
    try {
      this.modelName = ""
      this.className = this.classNameCreateModel
      this.dataName = this.dataNameCreateModel
      console.log(this.className);
      if (this.className) {
        this.userId = "JclGidZqhN";
        this.colFeature = [];
        this.colLabel = -1;
        this.algorithm = "";
        this.algorithmId = "";
        this.root_url = environment.apiUrl;
        this.sizes = ["large"];
        this.isshowParam = false;
        this.chooseDataFlag = false;
        this.inputValue = {};
        this.params = [];
        this.selectArr = [];
        this.checkAllFlag = false;
        this.errorCreate = {};
        this.defaultParamsFlag = false;
        this.notificationCreate = CHECK_PARAMS_CREATE_MODEL
        this.reload = true;
        setTimeout(() => this.loading = false, 20000);

        var arrColDataTemp = await axios({
          method: "GET",
          url: this.root_url + String("get-columns-form"),
          params: {
            className: this.className,
          },
        })
        if (arrColDataTemp.data) {
          console.log(arrColDataTemp)
          this.arrColData = arrColDataTemp.data;
          this.isshowFrom = true;
        }
        else {
          this.arrColData = ['notdata'];
        }

        var arrAlgorithmTemp = await axios({
          method: "GET",
          url: this.root_url + String("get-algorithm"),
          params: {
            className: "Algorithm",
          },
        })
        if (arrAlgorithmTemp) {
          this.arrAlgorithm = arrAlgorithmTemp.data.results;
          this.reload = false;
          this.isshowFrom = true;
        }
        else {
          this.arrAlgorithm = ['Get algorithm fail'];
        }
      } else {
        this.chooseDataFlag = true;
      }
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

  getColLabel(event, index, col) {
    try {
      this.colLabel = index;
      this.colFeature = this.colFeature.filter((i) => i != this.colLabel);
    } catch (err) {
      console.log(err);
    }
  }

  getColFeature(v, index) {
    try {
      if (v.selected) {
        this.colFeature.push(index);
      } else {
        this.colFeature = this.colFeature.filter((i) => i != index);
        this.selectArr = this.selectArr.filter((i) => i != index);
      }
    } catch (err) {
      console.log(err);
    }
  }


  selectAll(event) {
    try {
      if (event.selected) {
        this.checkAllFlag = true;
        var arrColDataCopy = this.arrColData;
        var arr = [];
        for (var col in arrColDataCopy) arr.push(String(col));
        arr.push("all");
        arr = arr.filter((col) => col != String(this.colLabel));
        this.selectArr = arr;
      } else {
        this.selectArr = [];
        this.checkAllFlag = false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAlgorithm(event, athm) {
    try {
      this.paramChoose = athm['params'];
      // console.log(Object.keys(paramChoose));
      this.algorithm = athm['algorithmName'];
      this.algorithmId = athm['objectId'];
      this.params = Object.keys(this.paramChoose);
      this.paramValuesDefault = Object.values(this.paramChoose);
      this.isshowParam = true;
      this.customParams = {};
      this.inputValue = {};
    } catch (err) {
      console.log(err);
    }
  }

  async createModel() {
    try {
      if (this.colLabel == -1) {
        this.errorName = "Label"
        this.toastrService.show(this.notificationCreate['errorLabel'], `ERROR: ${this.errorName}`, { status: "danger" });
      } else {
        if (this.colFeature.length == 0) {
          this.errorName = "Feature"
          this.toastrService.show(this.notificationCreate['errorFeature'], `ERROR: ${this.errorName}`, { status: "danger" });
        }
        else {
          if (this.algorithm == "") {
            this.errorName = "Algorithm"
            this.toastrService.show(this.notificationCreate['errorAlgorithm'], `ERROR: ${this.errorName}`, { status: "danger" });
          }
          else {
            this.customParams = {};
            Object.keys(this.paramChoose).map((key) => {
              if (this.paramChoose[key] !== "") {
                this.customParams[key] = this.paramChoose[key];
              }
            });
            // console.log(this.customParams)

            this.reload = true;
            setTimeout(() => this.loading = false, 3000);
            var returnCreate = await axios({
              method: "POST",
              url: "http://localhost:5000/create-model",
              params: {
                dataName: this.dataName,
                className: this.className,
                label: this.colLabel,
                feature: String(this.colFeature),
                algorithm: this.algorithm,
                algorithmId: this.algorithmId,
                params: this.customParams,
                modelname: this.modelName
              },
            })
            if (returnCreate.data['error']) {
              this.reload = false;
              this.errorName = "Tạo mô hình"
              this.toastrService.show(returnCreate.data['error'], `Lỗi: ${this.errorName}`, { status: "danger", duration: 15000 });
            }
            else {
              this.errorName = "Create Model"
              var messageCreateModel = "Tạo thành công mô hình: " + String(this.modelName)
              this.reload = false;
              this.toastrService.show(messageCreateModel, `Thành công: ${this.errorName}`, { status: "success", duration: 4000 });
              var isClose = true
              this.dialogRef.close(isClose);
              this.router.navigate(["/pages/models"], { queryParams: { loading: this.loading } });
              // this.router.navigate([
              //   "/pages/createModel"],
              //   );
            }
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

}
