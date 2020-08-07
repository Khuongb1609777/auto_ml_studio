import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import Axios from "axios";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbComponentSize } from "@nebular/theme";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "createModel",
  styleUrls: ["./createModel.component.scss"],
  templateUrl: "./createModel.component.html",
})
export class createModelComponent implements OnInit {
  formModel = new FormGroup({
    algorithm: new FormControl(""),
    colFeature: new FormControl(""),
    colLabel: new FormControl(""),
  });

  public errorLogin: boolean;
  public notification: any;
  public sessionToken: boolean;
  public data: any;
  public result: any;
  public root_url: any;
  public arrColData: any[];
  public arrAlgorithm: any[];
  public algorithm: any;
  public params: any[];
  public customParams: any;
  public isshowFrom: any;
  public idDataCreateFrom: any;
  public colLabel: any;
  public colFeature: any[];
  public selectAthm: any;
  public sizes: NbComponentSize[];
  public isshowParam: boolean;
  public inputValue: any;
  public selectArr: any;
  public isSelectAll: any;

  constructor(private route: ActivatedRoute) {}
  message: string;
  async ngOnInit() {
    try {
      this.idDataCreateFrom = this.route.snapshot.params.objectIdData;
      if (this.idDataCreateFrom) {
        this.colFeature = [];
        this.root_url = "http://localhost:5000/";
        this.sizes = ["large"];
        this.isshowParam = false;
        this.inputValue = {};
        this.params = [];
        this.selectArr = [];
        // console.log(this.idDataCreateFrom);
        Axios({
          method: "GET",
          url: this.root_url + String("getColumnsFrom"),
          params: {
            objectId: this.idDataCreateFrom,
          },
        })
          .then((res) => {
            console.log(res);
            this.arrColData = res.data;
            console.log(this.arrColData);
            // console.log(typeof this.arrColData[1]);
            this.isshowFrom = true;
          })
          .catch((err) => {
            console.log(err);
          });

        Axios({
          method: "GET",
          url: this.root_url + String("getAlgorithm"),
          params: {
            className: "Algorithm",
          },
        })
          .then((res) => {
            // console.log(res);
            this.arrAlgorithm = res.data.results;
            // console.log(this.arrAlgorithm);

            this.isshowFrom = true;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.notification = "Chọn data rồi mới create model được";
      }
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

  getColLabel(event, index, col) {
    this.colLabel = index;
    console.log(this.colLabel);
    this.colFeature = this.colFeature.filter((i) => i != this.colLabel);
  }

  getColFeature(v, index) {
    // console.log(this.selectArr);
    if (v.selected) {
      this.colFeature.push(index);
    } else {
      this.colFeature = this.colFeature.filter((i) => i != index);
    }
    // console.log(index);
    // console.log(v.selected);
    console.log("col featuree", this.colFeature);
  }

  selectFunction(event) {
    console.log(event);
  }

  selectAll(event, value) {
    if (event.selected) {
      var arrColDataCopy = this.arrColData;
      var arr = [];
      for (var col in arrColDataCopy) arr.push(String(col));
      arr.push("all");
      arr = arr.filter((col) => col != String(this.colLabel));
      this.selectArr = arr;
      console.log("ok", this.selectArr);
      // console.log(event);
    } else {
      this.selectArr = [];
    }
  }

  getAlgorithm(event, index) {
    this.algorithm = this.arrAlgorithm[index]["algorithmName"];
    Axios({
      method: "GET",
      url: this.root_url + String("getParams"),
      params: {
        className: this.algorithm,
      },
    })
      .then((res) => {
        this.params = res.data["results"][0];
        var parammeter = [];
        for (var k in this.params) parammeter.push(k);
        parammeter = parammeter.filter((p) => p != "createAt");
        var keysRemove = ["objectId", "createdAt", "updatedAt", "modelId"];
        for (var index in parammeter)
          parammeter = parammeter.filter((p) => p !== keysRemove[index]);
        this.params = parammeter;
        this.isshowParam = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createModel() {
    console.log("ok");
    console.log(this.colLabel);
    console.log(this.colFeature);
    console.log(this.algorithm);
    this.customParams = {};
    Object.keys(this.inputValue).map((key) => {
      if (this.inputValue[key] !== "") {
        this.customParams[key] = this.inputValue[key];
      }
    });
    // Call API create model
    Axios({
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
      .then((res) => {
        console.log(res);
        // this.arrColData = res.data;
        // console.log(this.arrColData);
        // console.log(typeof this.arrColData[1]);
        // this.isshowFrom = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
