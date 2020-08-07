import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import Axios from "axios";
import { stringify } from "querystring";
import { ButtonRendererComponent } from "./renderer/button-renderer.component";
import { showDataComponent } from "../showData/showData.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { RSA_NO_PADDING } from "constants";
import { navigate } from "@reach/router";
import { NbDialogService } from "@nebular/theme";
// import { FormUpLoadComponent } from "./form-upload.component";

@Component({
  selector: "datasets",
  styleUrls: ["./datasets.component.scss"],
  templateUrl: "./datasets.component.html",
})
export class datasetsComponent implements OnInit {
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
  public columnDefs: any[];
  public frameworkComponents: any;
  public objectIdDelete: any;
  public isShowDelete: boolean;
  public resultDelete = {};
  public objectIdCreateModel = {};
  public isShowCreateModel: boolean;
  public formCurrent: any;
  public userIdLogin: any;
  public uploadFileForm: any;

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };
  }
  async ngOnInit() {
    try {
      this.uploadFileForm = new FormGroup({
        fileUpload: new FormControl(),
      });
      this.isShowDelete = false;
      this.isShowCreateModel = false;
      this.isShowData = false;
      const SimRobot = Parse.Object.extend("SimRobot");
      const query = new Parse.Query(SimRobot);
      const result = await query.find();
      const data = this.showDataResult;
      this.userIdLogin = "JclGidZqhN";
      this.root_method = "POST";
      this.root_url = "http://localhost:5000/";

      const resultShow = await Axios({
        method: "GET",
        url: this.root_url + String("getData"),
        params: {
          userId: this.userIdLogin,
        },
      });
      this.showDataResult = resultShow.data["results"];
      // console.log(this.showDataResult[0]['objectId'])
      this.isShowData = true;

      // Create alert

      // columns for table data
      this.columnDefs = [
        {
          headerName: "Object ID",
          field: "objectId",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Create At",
          field: "createdAt",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Update At",
          field: "updatedAt",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Data Name",
          field: "dataName",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Delete Dataset",
          cellRenderer: "buttonRenderer",
          cellRendererParams: {
            onClick: this.onclickDelete.bind(this),
            label: "Delete",
          },
        },
        {
          headerName: "Create Model",
          cellRenderer: "buttonRenderer",
          cellRendererParams: {
            onClick: this.onclickCreateModel.bind(this),
            label: "Create",
          },
        },
      ];

      if (result.length > 0) {
        this.data = "datasets page, user upload datasets at this page ^^ !";
      }
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }

  fileChange(event) {
    // console.log(event);
    // this.filePath = event.srcElement.value;
    const formData = new FormData();
    this.fileUploaded = document.querySelector("#file");
    console.log("ok", this.fileUploaded);
    formData.append("fileUploaded", this.fileUploaded.files[0]);
    formData.append("userId", "JclGidZqhN");
    this.formCurrent = formData;
  }

  onclickDelete(e) {
    this.objectIdDelete = e.rowData["objectId"];
    //  console.log(this.objectIdDelete)
    Axios({
      method: "POST",
      url: this.root_url + String("deleteData"),
      params: {
        oId: this.objectIdDelete,
      },
    })
      .then((res) => {
        // console.log("---------",res.data);
        if (res.data["error"]) {
          this.resultDelete = "Delete error: " + res.data["error"];
        } else {
          this.resultDelete =
            "Delete successfully object " + this.objectIdDelete;
          this.isShowDelete = true;
          Axios({
            method: "GET",
            url: this.root_url + String("getData"),
            params: {
              userId: "JclGidZqhN",
            },
          })
            .then((res) => {
              this.showDataResult = res.data["results"];
              // console.log(this.showDataResult[0]['objectId'])
              this.isShowData = true;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onclickCreateModel(e) {
    // this.isShowCreateModel = true;
    this.objectIdCreateModel = e.rowData["objectId"];
    // this.router.navigateByUrl('/pages/createModel');
    this.router.navigate([
      "/pages/createModel",
      { objectIdData: this.objectIdCreateModel },
    ]);
  }

  formDialog() {
    // const dialog = this.dialogService.open(FormUpLoadComponent);
  }
}
