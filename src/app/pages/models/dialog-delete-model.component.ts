import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { NbDialogRef } from "@nebular/theme";
import { environment } from '../../../environments/environment';
import axios from "axios"




@Component({
    selector: "delete-model",
    styleUrls: ["./dialog-delete-model.component.scss"],
    templateUrl: "./dialog-delete-model.component.html",
})
export class DialogDeleteModelComponent {
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
            url: this.root_url + String("delete-data-model"),
            params: {
                oId: objectId,
                class: "Model",
            },
        })

        if (resultDelete.data['error']) {
            this.errorName = "xóa mô hình"
            var notificationDeleteDataset = resultDelete.data['error']
            this.toastrService.show(notificationDeleteDataset, `Lỗi: ${this.errorName}`, { status: "danger" });
        }
        else {
            this.errorName = "xóa mô hình"
            var notificationSuccess = "Xóa mô hình " + String(this.nameObjectDelete) + " successfully"
            this.toastrService.show(notificationSuccess, `Thành công: ${this.errorName}`, { status: "success" });
            var reload = true;
            this.dialogRef.close(reload)
        }

    }


}
