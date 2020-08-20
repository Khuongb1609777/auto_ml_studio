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
    errorLabel: "you must choose at least 1 option (label)",
    errorFeature: "you must choose at least 1 option (feature)",
    errorAlgorithm: "you must choose at least 1 option (algorithm)",
}


export const COLUMNSDEFS_MANAGE_MODEL = [
    {
        headerName: "Model ID",
        field: "objectId",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Create At",
        field: "createdAt",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Datasets",
        field: "idDataModel",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Algorithm",
        field: "athmAndDataName",
        sortable: true,
        filter: true,
    },
];


export const COLUMNSDEFS_DATASETS = [
    {
        headerName: "Dataset ID",
        field: "objectId",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Create At",
        field: "createdAt",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Update At",
        field: "updatedAt",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Data Name",
        field: "dataName",
        sortable: true,
        filter: true,
    },
];