import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { ClipboardModule } from 'ngx-clipboard';
import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: "docs-API",
    styleUrls: ["./dialog-docs-api.component.scss"],
    templateUrl: "./dialog-docs-api.component.html",
})
export class DialogDocsAPIComponent {
    userIdLogin = "JclGidZqhN";
    root_method = "POST";
    root_url = "http://localhost:5000/";
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
        this.dataName = "adfasf";
    }

    ngOnInit() {
        console.log(this.dataName);
        if (this.errorDetail) {
            this.errorFlag = true;
        } else {
            this.flagSuccess = true;
        }
        console.log(this.colFeatureName);
    }
    copyCurlCsv() {
        try {
            const urlAPI = this.root_url + "create-api-model";
            const method = 'POST';
            const header = 'Content-Type: multipart/form-data';
            const inputColumns = this.colFeature;
            const modelId = this.modelId;
            const curl = `\ncurl --request ${method} '${this.urlApi}' \\\n--header '${header}' \\\n --form 'modelId=${modelId}' \\\n --form 'inputColumns=${inputColumns}'`;
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
            const urlAPI = this.root_url + "create-api-model-jsondata";
            const method = 'POST';
            const header = 'Content-Type: application/json';
            const modelId = this.modelId;
            const colFeatureNameArr = this.colFeatureName.split(",");
            const dataRaw = {};
            var dataTest = ""
            for (const col of colFeatureNameArr) { dataTest = dataTest + '"' + col + '"' + ':' + '"' + '"' + ',' }
            var dataTest2 = dataTest.substring(0, dataTest.length - 1)
            const curl = `\ncurl --request ${method} '${urlAPI}' \\\n--header '${header}' \\\n--data-raw '{ \\\n "modelId":"${modelId}", \\\n "dataTest": [\\\n{\\\n  ${dataTest2}\\\n}\\\n]\\\n}'`;
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
