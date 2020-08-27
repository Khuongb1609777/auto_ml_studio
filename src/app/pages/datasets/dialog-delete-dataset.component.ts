import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { environment } from '../../../environments/environment';
import axios from "axios"




@Component({
    selector: "DeleteDataset",
    styleUrls: ["./dialog-delete-dataset.component.scss"],
    templateUrl: "./dialog-delete-dataset.component.html",
})
export class DialogDeleteDatasetComponent {
    public dataName: string;
    public objectIdDelete: string;
    public root_url: string;
    public userIdLogin: string;
    private errorName: string;
    @HostBinding('class')
    classes = 'example-items-rows';

    constructor(public dialogRef: NbDialogRef<any>, private toastrService: NbToastrService) {
        this.dataName = ""
        this.objectIdDelete = ""
        this.root_url = environment.apiUrl
        this.userIdLogin = ""
    }

    ngOnInit() {
        console.log(this.dataName);
    }

    async deleteDataset() {
        var result = await axios({
            method: "POST",
            url: this.root_url + "delete-data",
            params: {
                oId: this.objectIdDelete,
            },
        });
        if (result.data['error']) {
            this.errorName = "DELETE DATASET"
            var notificationDeleteDataset = result.data['error']
            this.toastrService.show(notificationDeleteDataset, `ERROR: ${this.errorName}`, { status: "danger", duration: 7000 });
        }
        else {
            this.errorName = "DELETE DATASET"
            var notificationSuccess = "Delete data " + String(this.dataName) + " successfully"
            this.toastrService.show(notificationSuccess, `SUCCESS: ${this.errorName}`, { status: "success" });
            var reload = true;
            this.dialogRef.close(reload)
        }
    }
}
