export const GET_COLUMNS_FROM = 'getColumnsFrom'
export const DEFAULT_PARAMS = {
    criterion: "entropy or gini",
    splitter: "best or random",
    maxDepth: "0 < int",
    minSamplesSplit: "0 < int",
    fitIntercept: "True or False",
    normalize: "True or False",
    varSmoothing: "float",
    nEstimators: "int",
    minSamples: "0 < int",
    C: "float",
    gamma: "0.0 < float < 1.0",
    degree: "0 < int"
}

export const CHECK_PARAMS_CREATE_MODEL = {
    errorLabel: "you must choose at least 1 label",
    errorFeature: "you must choose at least 1 feature",
    errorAlgorithm: "you must choose at least 1 algorithm",
}


export const COLUMNSDEFS_MANAGE_MODEL = [
    {
        headerName: "Model name",
        field: "modelName",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Datasets",
        field: "dataModel.dataName",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Algorithm",
        field: "algorithm.algorithmName",
        sortable: true,
        filter: true,
    },
];


export const COLUMNSDEFS_DATASETS = [
    // {
    //     headerName: "Dataset ID",
    //     field: "objectId",
    //     sortable: true,
    //     filter: true,
    // },
    // {
    //     headerName: "Create At",
    //     field: "createdAt",
    //     sortable: true,
    //     filter: true,
    // },
    // {
    //     headerName: "Update At",
    //     field: "updatedAt",
    //     sortable: true,
    //     filter: true,
    // },
    {
        headerName: "Data Name",
        field: "dataName",
        sortable: true,
        filter: true,
    },
];

export const COLDEF_AUTO_RESIZE = {
    filter: 'createdAt',
    floatingFilter: true,
    resizable: true,
};

export const delimiter = [",", ";", "tab"]


export const LOADING = `<div><span>loading...</span></div>`;

export const NO_ROW_AG_GRID = `<div><span>No data...</span></div>`;

