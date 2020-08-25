import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { environment } from '../../../environments/environment';
import axios from "axios"




@Component({
    selector: "DeleteModel",
    styleUrls: ["./dialogDeleteModel.component.scss"],
    templateUrl: "./dialogDeleteModel.component.html",
})
export class dialogDeleteModelComponent {
    private errorName: string;
    @HostBinding('class')
    classes = 'example-items-rows';
    public objectIdDelete: string;
    public root_url: string;
    public userIdLogin: string;
    public nameObjectDelete: string;

    constructor(public dialogRef: NbDialogRef<any>, private toastrService: NbToastrService) {
        this.objectIdDelete = ""
        this.root_url = environment.apiUrl
        this.userIdLogin = ""
        this.nameObjectDelete = ""

    }

    ngOnInit() {

    }

    async deleteModel() {
        var objectId = this.objectIdDelete
        var resultDelete = await axios({
            method: "POST",
            url: this.root_url + String("deleteDataModel"),
            params: {
                oId: objectId,
                class: "Model",
            },
        })

        if (resultDelete.data['error']) {
            this.errorName = "DELETE DATASET"
            var notificationDeleteDataset = resultDelete.data['error']
            this.toastrService.show(notificationDeleteDataset, `ERROR: ${this.errorName}`, { status: "danger" });
        }
        else {
            this.errorName = "DELETE DATASET"
            var notificationSuccess = "Delete model " + String(this.nameObjectDelete) + " successfully"
            this.toastrService.show(notificationSuccess, `SUCCESS: ${this.errorName}`, { status: "success" });
            var reload = true;
            this.dialogRef.close(reload)
        }

    }


}
