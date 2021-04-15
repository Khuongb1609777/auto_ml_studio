import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardService } from 'ngx-clipboard';
import { environment } from '../../../environments/environment';

@Component({
    selector: "docs-API",
    styleUrls: ["./dialog-docs-api.component.scss"],
    templateUrl: "./dialog-docs-api.component.html",
})
export class DialogDocsAPIComponent {
    userIdLogin = "JclGidZqhN";
    root_method = "POST";
    public athm: String;
    public colLabel: string;
    public colLabelName: string;
    public colFeature: string;
    public colFeatureName: string;
    public colFeatureNameArr: [];
    public modelId: string;
    public dataId: string;
    public urlApi: string;
    public descriptionModel: string;
    public errorDetail: string;
    public errorFlag: boolean;
    public flagSuccess: boolean;
    public dataName: string;
    public urlApiJson: string;
    public urlApiCsv: string;

    constructor(private dialogRef: NbDialogRef<any>, private toastrService: NbToastrService, private _clipboardService: ClipboardService) {
        this.athm = "";
        this.colLabel = "";
        this.colLabelName = "";
        this.colFeatureName = "";
        this.colFeature = "";
        this.modelId = "";
        this.dataId = "";
        this.urlApi = "";
        this.descriptionModel = "";
        this.errorFlag = false;
        this.flagSuccess = false;
        this.errorDetail = "";
        this.dataName = "";

    }

    ngOnInit() {
        this.urlApi = environment.apiUrl + "model-publish-api";
        if (this.errorDetail) {
            this.errorFlag = true;
        } else {
            this.flagSuccess = true;
        }
        // console.log(this.colFeatureName);
    }
    copyCurlCsv() {
        try {
            const method = 'POST';
            const header = 'Content-Type: multipart/form-data';
            const inputColumns = this.colFeature;
            const modelId = this.modelId;
            const curl = `\ncurl --request ${method} '${this.urlApi}' \\\n--header '${header}' \\\n --form 'modelId=${modelId}' \\\n --form 'inputColumns=${inputColumns}'`;
            // console.log(curl)
            this._clipboardService.copy(curl);
            const notificationSuccess = "copy to clipboard";
            const success = "COPY"
            this.toastrService.show(notificationSuccess, `SUCCESS: ${success}`, { status: "success", duration: 3000 });
        }
        catch (err) {
            console.log(err);
        }
    }


    copyCurlJson() {
        try {
            const method = 'POST';
            const header = 'Content-Type: application/json';
            const modelId = this.modelId;
            const colFeatureNameArr = this.colFeatureName.split(",");
            const dataRaw = {};
            var data = ""
            for (const col of colFeatureNameArr) { data = data + '"' + col + '"' + ':' + '"' + '"' + ',' }
            var data2 = data.substring(0, data.length - 1)
            const curl = `\ncurl --request ${method} '${this.urlApi}' \\\n--header '${header}' \\\n--data-raw '{ \\\n "modelId":"${modelId}", \\\n "data": [\\\n{\\\n  ${data2}\\\n}\\\n]\\\n}'`;
            // console.log(curl);
            this._clipboardService.copy(curl);
            const notificationSuccess = "copy to clipboard";
            const success = "COPY"
            this.toastrService.show(notificationSuccess, `SUCCESS: ${success}`, { status: "success", duration: 3000 });
        }
        catch (err) {
            console.log(err);
        }
    }
}
