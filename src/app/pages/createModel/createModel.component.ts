import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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

@Component({
  selector: "createModel",
  styleUrls: ["./createModel.component.scss"],
  templateUrl: "./createModel.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class createModelComponent implements OnInit {
  formModel = new FormGroup({
    algorithm: new FormControl(""),
    colFeature: new FormControl(""),
    colLabel: new FormControl(""),
  });

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

  constructor(private route: ActivatedRoute, private router: Router) { }
  message: string;
  async ngOnInit() {
    try {
      this.notificationCreate = CHECK_PARAMS_CREATE_MODEL;
      console.log(typeof (this.notificationCreate));
      console.log(this.notificationCreate['errorFeature'])
      // this.idDataCreateFrom = this.route.snapshot.params.objectIdData;
      this.idDataCreateFrom = this.route.snapshot.queryParamMap.get('objectIdData');
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
        var arrColDataTemp = await axios({
          method: "GET",
          url: this.root_url + String(GET_COLUMNS_FROM),
          params: {
            objectId: this.idDataCreateFrom,
          },
        })
        console.log(arrColDataTemp);
        if (arrColDataTemp.data) {
          this.arrColData = arrColDataTemp.data;
          this.isshowFrom = true;
        }
        else {
          this.arrColData = ['notdata'];
        }

        var arrAlgorithmTemp = await axios({
          method: "GET",
          url: this.root_url + String("getAlgorithm"),
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

  async getAlgorithm(event, index) {
    try {
      this.algorithm = this.arrAlgorithm[index]["algorithmName"];
      var paramsTemp = await axios({
        method: "GET",
        url: this.root_url + String("getParams"),
        params: {
          className: this.algorithm,
        },
      })
      this.params = paramsTemp.data['results'][0];
      var parammeter = [];
      for (var k in this.params) parammeter.push(k);
      parammeter = parammeter.filter((p) => p != "createAt");
      var keysRemove = ["objectId", "createdAt", "updatedAt", "modelId"];
      for (index in parammeter) parammeter = parammeter.filter((p) => p !== keysRemove[index]);
      this.params = parammeter;
      this.isshowParam = true;
      this.customParams = {};
      this.inputValue = {};
    } catch (err) {
      console.log(err);
    }
  }

  async createModel() {
    try {
      console.log(this.colLabel)
      console.log(this.colFeature)
      console.log(typeof (this.colLabel))
      if (this.colLabel == -1) {
        alert(this.notificationCreate['errorLabel']);
      } else {
        if (this.colFeature.length == 0) {
          alert(this.notificationCreate['errorFeature']);
        }
        else {
          if (this.algorithm == "") {
            alert(this.notificationCreate['errorAlgorithm']);
          }
          else {
            this.customParams = {};
            Object.keys(this.inputValue).map((key) => {
              if (this.inputValue[key] !== "") {
                this.customParams[key] = this.inputValue[key];
              }
            });
            var returnCreate = await axios({
              method: "POST",
              url: "http://localhost:5000/createModel",
              params: {
                objectId: this.idDataCreateFrom,
                className: "Data",
                label: this.colLabel,
                feature: String(this.colFeature),
                algorithm: this.algorithm,
                params: this.customParams,
              },
            })
            console.log(returnCreate)
            if (returnCreate.data['error']) {
              alert(returnCreate.data['error']);
            }
            else {
              this.router.navigate(["/pages/manageModel"]);
            }
          }
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

  chooseData() {
    this.router.navigate(["/pages/datasets"]);
  }
  defaultParams() {
    this.isshowParam = false;
  }
}
