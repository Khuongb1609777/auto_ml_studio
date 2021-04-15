import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus, NbSpinnerComponent } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import Axios from "axios";
import { FormControl, FormGroup } from "@angular/forms";
import { async } from "@angular/core/testing";
import { environment } from '../../../environments/environment';
import { delimiter } from "../create-model/constanst"
@Component({
  selector: "form-upload",
  templateUrl: "./form-upload.component.html",
  styleUrls: ["./form-upload.component.scss"],
})
export class FormUploadComponent {
  public errorName: string;
  @HostBinding('class')
  classes = 'example-items-rows';
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
  public dataShow: any;
  public infoUpload: any;
  public fileName: any;
  public urlData: any;
  public listDelimiter: any;
  public delimiter: any;
  public filetail: any;
  public reload: boolean;

  constructor(protected dialogRef: NbDialogRef<any>, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.root_method = "POST";
    this.userIdLogin = "JclGidZqhN";
    this.root_url = environment.apiUrl;
    this.notificationFile = "";
    this.fileName = "";
    this.urlData = ""
    this.checkType = false;
    this.isShowData = false;
    this.listDelimiter = delimiter;
    this.filetail = "";
    this.buttonSubmitStatus = "disable";
    this.reload = false;
    this.uploadFileForm = new FormGroup({
      fileUpload: new FormControl(),
    });
  }

  getDelimiter(event, i, deli) {
    this.delimiter = String(deli);
  }

  fileChange(event) {
    try {
      // console.log(event)
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const formData: FormData = new FormData();
        let file: File = fileList[0];
        if (file.type == "application/vnd.ms-excel") {
          this.filetail = "excel"
        } else {
          this.filetail = "csv"
        }
        // this.filetail = fileList[0].filename
        formData.append("fileUploaded", file);
        formData.append("userId", "JclGidZqhN");
        formData.append("fileTail", this.filetail)
        this.formCurrent = formData;
        this.buttonSubmitStatus = "enable";
      } else {
        this.buttonSubmitStatus = "disable";
      }
    } catch (err) {
      console.log(err);
    }
  }

  urlChange() {
    try {
      if (this.urlData == "") {
        this.buttonSubmitStatus = "disable";
      } else {
        this.buttonSubmitStatus = "enable";
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadFile() {
    if (this.delimiter == "") {
      this.delimiter = ","
    }
    this.reload = true;
    // setTimeout(() => this.loading = false, 3000);
    this.formCurrent.append("dataName", this.fileName)
    this.formCurrent.append("separator", this.delimiter)
    var infoUploadTemp = await Axios({
      method: "POST",
      url: this.root_url + String("upload-file"),
      data: this.formCurrent,
    })
    this.infoUpload = infoUploadTemp.data
    var idDataUpload = this.infoUpload['objectId']
    if (infoUploadTemp.data['objectId']) {
      this.errorName = "Upload dataset"
      this.reload = false;
      this.dialogRef.close(this.dataShow);
      var messegeUpload = "Upload successfully : " + String(this.fileName)
      this.toastrService.show(messegeUpload, `SUCCESS: ${this.errorName}`, { status: "success" });
    } else {

      this.errorName = "Upload dataset"
      this.dialogRef.close(this.dataShow);
      var messegeUpload = "Upload fail : " + String(this.fileName)
      this.reload = false;
      this.toastrService.show(messegeUpload, `ERROR: ${this.errorName}`, { status: "danger" });
    }

  }

  async uploadFileUrl() {
    if (this.delimiter == "") {
      this.delimiter = ","
    }
    this.reload = true;
    var infoUploadFromUrl = await Axios({
      method: "POST",
      url: this.root_url + String("upload-file-url"),
      params: {
        urlData: this.urlData,
        userId: this.userIdLogin,
        dataName: this.fileName,
        separator: this.delimiter,
      }
    })
    this.infoUpload = infoUploadFromUrl.data
    if (this.infoUpload['error']) {
      this.reload = false;
      var messegeUpload = "Upload fail : " + String(this.infoUpload['error'])
      this.toastrService.show(messegeUpload, `ERROR: UPLOAD DATASET`, { status: "danger" });
    }
    else {
      this.errorName = "UPLOAD"
      this.reload = false;
      this.dialogRef.close(this.dataShow);
      var messegeUpload = "Upload successfully : " + String(this.fileName)
      this.toastrService.show(messegeUpload, `SUCCESS: UPLOAD DATASET`, { status: "success" });
    }

  }

  resetStatusButton() {
    this.buttonSubmitStatus = "disable";
  }

}
