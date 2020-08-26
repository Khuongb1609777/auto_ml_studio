import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import Axios from "axios";
import { FormControl, FormGroup } from "@angular/forms";
import { async } from "@angular/core/testing";
import { environment } from '../../../environments/environment';

@Component({
  selector: "form-upload",
  templateUrl: "./form-upload.component.html",
  styleUrls: ["./form-upload.component.scss"],
})
export class FormUploadComponent {
  private errorName: string;
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

  constructor(protected dialogRef: NbDialogRef<any>, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.root_method = "POST";
    this.userIdLogin = "JclGidZqhN";
    this.root_url = environment.apiUrl;
    this.notificationFile = "";
    this.fileName = ""
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

  async upload() {
    this.formCurrent.append("dataName", this.fileName)
    var infoUploadTemp = await Axios({
      method: "POST",
      url: this.root_url + String("upload-file"),
      data: this.formCurrent,
    })
    this.infoUpload = infoUploadTemp.data
    var idDataUpload = this.infoUpload['objectId']
    this.errorName = "Upload dataset"
    this.dialogRef.close(this.dataShow);
    var messegeUpload = "Upload successfully data id: " + String(idDataUpload)
    this.toastrService.show(messegeUpload, `SUCCESS: ${this.errorName}`, { status: "success" });
  }

}
