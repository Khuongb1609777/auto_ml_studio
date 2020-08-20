import { Component } from "@angular/core";
import { } from "@nebular/theme";
import { NbDialogRef } from "@nebular/theme";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import Axios from "axios";
import { FormControl, FormGroup } from "@angular/forms";
import { async } from "@angular/core/testing";
import { environment } from '../../../environments/environment';

@Component({
  selector: "form-upload",
  templateUrl: "./formUpload.component.html",
})
export class formUploadComponent {
  public userIdLogin: any;
  public root_method: any;
  public root_url: any;
  public fileUploaded: any;
  public formCurrent: any;
  public uploadResult: any;
  public showDataResult: any;
  public isShowData: boolean;
  public uploadFileForm: any;
  public notificationFile: any;
  public checkType: boolean;
  public buttonSubmitStatus: any;
  public resultShow: any;

  constructor(protected dialogRef: NbDialogRef<any>) { }

  ngOnInit() {
    this.root_method = "POST";
    this.userIdLogin = "JclGidZqhN";
    this.root_url = environment.apiUrl;
    this.notificationFile = "";
    this.checkType = false;
    this.isShowData = false;
    this.buttonSubmitStatus = "disable";
    this.uploadFileForm = new FormGroup({
      fileUpload: new FormControl(),
    });
  }

  fileChange(event) {
    try {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const formData: FormData = new FormData();
        let file: File = fileList[0];
        if (file["type"] != "application/vnd.ms-excel") {
          this.notificationFile = "Dataset must be 'CSV' file ";
          this.buttonSubmitStatus = "disable";
          this.checkType = true;
        } else {
          this.notificationFile = "";
          this.buttonSubmitStatus = "unable";
        }
        // (this.fileUploaded = document.querySelector("#file"));
        formData.append("fileUploaded", file);
        formData.append("userId", "JclGidZqhN");
        this.formCurrent = formData;
      } else {
        console.log("not file");
      }
    } catch (err) {
      console.log(err);
    }
  }

  upload() {
    Axios({
      method: "POST",
      url: this.root_url + String("upfile"),
      data: this.formCurrent,
    })
      .then(async (res) => {
        this.resultShow = await Axios({
          method: "GET",
          url: this.root_url + String("getData"),
          params: {
            userId: this.userIdLogin,
          },
        });
        if (this.resultShow.data['results']) {
          this.showDataResult = this.resultShow.data["results"];
        }
        this.isShowData = true;
        this.dialogRef.close(this.showDataResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
