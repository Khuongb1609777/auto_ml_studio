import { Component, OnInit, HostBinding } from "@angular/core";
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import Axios from "axios";
import { ButtonRenderManageModelComponent } from "./button-renderer/button-render-model.component";
import {
    NbDialogService,
    NbAccordionItemHeaderComponent,
} from "@nebular/theme";
import { DialogDocsAPIComponent } from "./dialog-docs-api.component";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { COLUMNSDEFS_MANAGE_MODEL } from "../create-model/constanst"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CreateModelComponent } from "../create-model/create-model.component"
import { DatasetsComponent } from "../datasets/datasets.component"
import { DialogDeleteModelComponent } from "./dialog-delete-model.component"
import { DialogUseModelMxComponent } from "./dialog-use-model-mx.component"
import { stringToArray, Context } from 'ag-grid-community';
import { environment } from '../../../environments/environment'
import { LOADING } from '../create-model/constanst'
import { NO_ROW_AG_GRID } from '../create-model/constanst'


@Component({
    selector: "models",
    styleUrls: ["./models.component.scss"],
    templateUrl: "./models.component.html",
})
export class ModelsComponent implements OnInit {
    private errorName: String;
    @HostBinding('class')
    classes = 'example-items-rows';
    public data: any;
    public root_url: string;
    public showDataModels: any;
    public isShowModels: any;
    public userIdLogin: string;
    public columnDefs: any[];
    public frameworkComponents: any;
    public athmApi: string;
    public colFeatureModel: string;
    public colFeatureModelName: string;
    public colLabelModel: string;
    public colLabelModelName: string;
    public modelId: string;
    public dataId: string;
    public descriptionModel: string;
    public errorFlag: boolean;
    public infoApi: string;
    public dataName: string;
    public dialog: any;
    public defaultColDef;
    public updatedShowModel: boolean;
    public showDataModelsUpdate: any;
    public keyUpdate: boolean;
    public loadingTemplate: string;
    public noRowsTemplate: string;


    constructor(private dialogService: NbDialogService, private toastrService: NbToastrService) {
        this.frameworkComponents = {
            buttonDeleteModel: ButtonRenderManageModelComponent,
            buttonShowDetailModel: ButtonRenderManageModelComponent,
        };

        this.defaultColDef = {
            // editable: true,
            filter: 'createdAt',
            floatingFilter: true,
            resizable: true,
        };
        this.noRowsTemplate = `<div><span>No model</span></div>`;
        this.loadingTemplate = `<div><span>Loading...</span></div>`
    }

    async ngOnInit() {
        try {
            this.errorFlag = false;
            this.userIdLogin = "JclGidZqhN";
            this.root_url = environment.apiUrl;
            const resultShow = await Axios({
                method: "GET",
                url: this.root_url + String("get-data-models"),
                params: {
                    userId: this.userIdLogin,
                },
            });
            console.log(resultShow)
            this.showDataModels = resultShow.data["results"];
            this.isShowModels = true;
            this.columnDefs = COLUMNSDEFS_MANAGE_MODEL
            this.columnDefs[4] = {
                headerName: "Delete Model",
                cellRenderer: "buttonDeleteModel",
                cellRendererParams: {
                    onClick: this.onClickDeleteModel.bind(this),
                    label: "Xóa mô hình",
                },
            }
            // this.columnDefs[5] = {
            //     headerName: "Use",
            //     cellRenderer: "buttonDeleteModel",
            //     cellRendererParams: {
            //         onClick: this.onClickUseModel.bind(this),
            //         label: "Use model",
            //     },
            // }
            this.columnDefs[5] = {
                headerName: "Triển khai (API)",
                cellRenderer: "buttonShowDetailModel",
                cellRendererParams: {
                    onClick: this.onClickShowDetailModel.bind(this),
                    label: "Triển khai",
                },
            }

        } catch (err) {
            this.data = "rpa-iot-api";
        }

    }

    async onClickShowDetailModel(e) {
        try {
            this.athmApi = e.rowData["algorithm"]["algorithmName"];
            this.colFeatureModel = e['rowData']["colFeature"];
            this.colFeatureModelName = e['rowData']["colFeatureName"];
            this.colLabelModel = e['rowData']["colLabel"];
            this.colLabelModelName = e['rowData']["colLabelName"];
            this.descriptionModel = e['rowData']["description"];
            this.dataName = e.rowData['fromData'];
            this.dialogService.open(DialogDocsAPIComponent, {
                context: {
                    athm: this.athmApi,
                    colFeature: this.colFeatureModel,
                    colFeatureName: this.colFeatureModelName,
                    colLabel: this.colLabelModel,
                    colLabelName: this.colLabelModelName,
                    modelId: e['rowData']['objectId'],
                    dataId: this.dataId,
                    dataName: this.dataName,
                    urlApi: "http://localhost:5000/create-api-model",
                    descriptionModel: this.descriptionModel,
                },
            });

        } catch (err) {
            console.log(err);
        }
    }

    async onClickDeleteModel(e) {
        try {
            const dialogDeleteModel = this.dialogService.open(DialogDeleteModelComponent, {
                context: {
                    objectIdDelete: e.rowData['objectId'],
                    nameObjectDelete: e.rowData['modelName'],
                    userIdLogin: this.userIdLogin
                }
            }
            );
            dialogDeleteModel.onClose.subscribe(async (reloadData) => {
                if (reloadData) {
                    const resultShow = await Axios({
                        method: "GET",
                        url: this.root_url + String("get-data-models"),
                        params: {
                            userId: this.userIdLogin,
                        },
                    });
                    this.showDataModels = resultShow.data["results"];
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    async onClickUseModel(e) {
        try {
            console.log(e);
        } catch (err) {
            console.log(err);
        }
    }


    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    formDialogCreateModel() {
        const dialogCreateModel = this.dialogService.open(DatasetsComponent, {
            context: {
                isDialog: true,
            }
        }
        );
        dialogCreateModel.onClose.subscribe(async (resultDataDialog) => {
            const resultShow = await Axios({
                method: "GET",
                url: this.root_url + String("get-data-models"),
                params: {
                    userId: this.userIdLogin,
                },
            });
            this.showDataModels = resultShow.data["results"];
        });
    }

    modelMxUse() {
        try {
            const dialogCreateModel = this.dialogService.open(DialogUseModelMxComponent, {
                context: {
                    modelId: "4OD3VzZPVw",
                    dataName: "DatasetObesity"
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    postRecord(){
        
    }
}
