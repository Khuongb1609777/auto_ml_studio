import { Component, OnInit, ViewEncapsulation, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import axios from "axios";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
  formModel = new FormGroup({
    algorithm: new FormControl(""),
    colFeature: new FormControl(""),
    colLabel: new FormControl(""),
  });
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
  public params: any[];
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
  public nameDataCreateModel: string;
  public nameData: string;
  public modelName: String;

  constructor(private route: ActivatedRoute, private router: Router, private toastrService: NbToastrService, private dialogRef: NbDialogRef<any>) { }
  message: string;
  async ngOnInit() {
    try {
      this.modelName = ""
      this.idDataCreateFrom = this.idDataCreateModel
      this.nameData = this.nameDataCreateModel
      if (this.idDataCreateFrom) {
        this.colFeature = []
        this.colLabel = -1;
        this.algorithm = ""
        this.root_url = environment.apiUrl;
        this.sizes = ["large"];
        this.isshowParam = false;
        this.chooseDataFlag = false;
        this.inputValue = {};
        this.params = [];
        this.selectArr = [];
        this.checkAllFlag = false;
        this.errorCreate = {}
        this.defaultParamsFlag = false;
        this.notificationCreate = CHECK_PARAMS_CREATE_MODEL

        var arrColDataTemp = await axios({
          method: "GET",
          url: this.root_url + String("get-columns-form"),
          params: {
            objectId: this.idDataCreateFrom,
          },
        })
        if (arrColDataTemp.data) {
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
        if (arrAlgorithmTemp.data.results) {
          this.arrAlgorithm = arrAlgorithmTemp.data.results;
          console.log(this.arrAlgorithm);
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
      var params_values_default = athm['params'];
      console.log(Object.keys(params_values_default));
      this.algorithm = athm['algorithmName'];
      // var paramsTemp = await axios({
      //   method: "GET",
      //   url: this.root_url + String("get-params"),
      //   params: {
      //     className: this.algorithm,
      //   },
      // })
      // this.params = paramsTemp.data['results'][0];
      // var parammeter = [];
      // for (var k in this.params) parammeter.push(k);
      // parammeter = parammeter.filter((p) => p != "createAt");
      // var keysRemove = ["objectId", "createdAt", "updatedAt", "modelId"];
      // for (index in parammeter) parammeter = parammeter.filter((p) => p !== keysRemove[index]);
      this.params = Object.keys(params_values_default);
      this.isshowParam = true;
      this.customParams = {};
      this.inputValue = {};
    } catch (err) {
      console.log(err);
    }
  }

  async createModel() {
    try {
      console.log(this.algorithm);
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
            if (this.defaultParamsFlag) {
              this.customParams = {}
            } else {
              Object.keys(this.inputValue).map((key) => {
                if (this.inputValue[key] !== "") {
                  this.customParams[key] = this.inputValue[key];
                }
              });
            }

            var returnCreate = await axios({
              method: "POST",
              url: "http://localhost:5000/create-model",
              params: {
                objectId: this.idDataCreateFrom,
                className: "Data",
                label: this.colLabel,
                feature: String(this.colFeature),
                algorithm: this.algorithm,
                params: this.customParams,
                modelname: this.modelName
              },
            })
            console.log(returnCreate);
            // console.log(returnCreate.data['objectId'])
            if (returnCreate.data['error']) {
              console.log(returnCreate.data)
              console.log("okieeeeeeeeeeeeeeeeee");
              console.log(returnCreate.data['error'])
              this.errorName = "Create Model"
              this.toastrService.show(returnCreate.data['error'], `ERROR: ${this.errorName}`, { status: "danger", duration: 15000 });
            }
            else {
              this.errorName = "Create Model"
              var messageCreateModel = "Create successfully model: " + String(this.modelName)
              this.toastrService.show(messageCreateModel, `SUCCESS: ${this.errorName}`, { status: "success", duration: 4000 });
              var isClose = true
              this.dialogRef.close(isClose);
              this.router.navigate(["/pages/models"]);
            }
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

}
