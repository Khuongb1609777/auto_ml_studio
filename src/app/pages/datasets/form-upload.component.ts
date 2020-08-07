import { Component } from "@angular/core";
import {} from "@nebular/theme";
import { NbDialogRef } from "@nebular/theme";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import Axios from "axios";

@Component({
  selector: "form-upload",
  template: `
    <div>
      <form (ngSubmit)="upload()" enctype="multipart/form-data">
        <input
          type="file"
          id="file"
          name="file"
          formControlName="fileUpload"
          nbInput
          placeholder="Text field"
        />
        <button
          nbButton
          size="small"
          type="submit"
          value="Submit"
          status="primary"
        >
          upload
        </button>
      </form>
    </div>
  `,
})
export class FormUpLoadComponent {
  userIdLogin = "JclGidZqhN";
  root_method = "POST";
  root_url = "http://localhost:5000/";

  constructor(protected dialogRef: NbDialogRef<any>) {}

  ngOnInit() {}

  async upload() {
    // try {
    //   const result = await Axios({
    //     method: this.root_method,
    //     url: this.root_url + String("upfile"),
    //     data: this.formCurrent,
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log(result);
    //   var temp = result.data;
    //   if (temp["objectId"]) {
    //     this.uploadResult =
    //       String("Upload successfully ") +
    //       String("Data Id: ") +
    //       temp["objectId"];
    //     try {
    //       const resultShow = await Axios({
    //         method: "GET",
    //         url: this.root_url + String("getData"),
    //         params: {
    //           userId: this.userIdLogin,
    //         },
    //       });
    //       this.showDataResult = resultShow.data["results"];
    //       console.log(this.showDataResult[0]["objectId"]);
    //       this.isShowData = true;
    //     } catch (err) {
    //       console.log(err);
    //     }
    // //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
