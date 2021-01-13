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
        headerName: "Tên mô hình",
        field: "modelName",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Dữ liệu",
        field: "fromData",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Giải thuật",
        field: "algorithm.algorithmName",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Đánh giá (độ chính xác)",
        field: "evalution",
        sortable: true,
        filter: true,
    },
];


export const COLUMNSDEFS_DATASETS = [
    {
        headerName: "name",
        field: "name",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Giới tính",
        field: "gender",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Năm sinh",
        field: "yearOfBirth",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nghề nghiệp",
        field: "job",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Chiều cao",
        field: "height",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cân nặng",
        field: "weight",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Số bữa trong ngày",
        field: "mealOfTheDay",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn sáng/tuần",
        field: "breakfastOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn tối/tuần",
        field: "dinnerOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thức ăn nhanh/tuần",
        field: "fastFoodOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Rau củ trong bữa ăn",
        field: "vegetableInMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nguồn gốc thực phẩm",
        field: "sourceOfFood",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng nước/ngày",
        field: "waterOfTheDay",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng protein/bữa",
        field: "proteinOfMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể dục/tuần",
        field: "timeDoExcerciseForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể thao/tuần",
        field: "sportTimeForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Sử dụng rượu bia",
        field: "alcohol",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nước có ga",
        field: "sodaWater",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Hút thuốc lá",
        field: "nicotine",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian ngủ/ngày",
        field: "timeSleep",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Mắc bệnh mãn tính",
        field: "chronicDiseases",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Uống thuốc trị bệnh mãn tính",
        field: "chronicDiseasesMedicine",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cường độ lao động",
        field: "requireOfJob",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thu nhập",
        field: "income",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Phương tiện di chuyển",
        field: "transport",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Công viên ở nơi ở",
        field: "park",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian sử dụng thiết bị công nghệ/ngày",
        field: "timeUseTechEquip",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Sử dụng thuốc an thần",
        field: "sedative",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Trầm cảm, lo âu",
        field: "depression",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Tuổi",
        field: "age",
        sortable: true,
        filter: true,
    },
];


export const COLUMNSDEFS_DATASETS_P = [
    {
        headerName: "Số bữa trong ngày",
        field: "mealOfTheDay",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn sáng/tuần",
        field: "breakfastOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn tối/tuần",
        field: "dinnerOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thức ăn nhanh/tuần",
        field: "fastFoodOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Rau củ trong bữa ăn",
        field: "vegetableInMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng nước/ngày",
        field: "waterOfTheDay",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn thực phẩm giàu calo",
        field: "proteinOfMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể dục/tuần",
        field: "timeDoExcerciseForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể thao/tuần",
        field: "sportTimeForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Sử dụng rượu bia",
        field: "alcohol",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Hút thuốc lá",
        field: "nicotine",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian ngủ/ngày",
        field: "timeSleep",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cường độ lao động",
        field: "requireOfJob",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Công viên ở nơi ở",
        field: "park",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian sử dụng thiết bị công nghệ/ngày",
        field: "timeUseTechEquip",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Trầm cảm, lo âu",
        field: "depression",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nhãn (béo phì)",
        field: "obesity",
        sortable: true,
        filter: true,
    },
];


export const COLUMNSDEFS_DATASETS_MERGE = [
    {
        headerName: "name",
        field: "name",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Giới tính",
        field: "gender",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Giới tính (hậu xử lý)",
        field: "gender_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Năm sinh",
        field: "yearOfBirth",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Tuổi",
        field: "age_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nghề nghiệp",
        field: "job",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nghề nghiệp (hậu xử lý)",
        field: "job_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Chiều cao",
        field: "height_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cân nặng",
        field: "weight_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Số bữa trong ngày",
        field: "mealOfTheDay_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn sáng/tuần",
        field: "breakfastOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn sáng/tuần (hậu xử lý)",
        field: "breakfastOfTheWeek_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn tối/tuần",
        field: "dinnerOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Ăn tối/tuần (hậu xử lý)",
        field: "dinnerOfTheWeek_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thức ăn nhanh/tuần",
        field: "fastFoodOfTheWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thức ăn nhanh/tuần (hậu xử lý)",
        field: "fastFoodOfTheWeek_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Rau củ trong bữa ăn",
        field: "vegetableInMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Rau củ trong bữa ăn (hậu xử lý)",
        field: "vegetableInMeal_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nguồn gốc thực phẩm",
        field: "sourceOfFood",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nguồn gốc thực phẩm (hậu xử lý)",
        field: "sourceOfFood_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng nước/ngày",
        field: "waterOfTheDay",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng nước/ngày (hậu xử lý)",
        field: "waterOfTheDay_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng protein/bữa",
        field: "proteinOfMeal",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Lượng protein/bữa (hậu xử lý)",
        field: "proteinOfMeal_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể dục/tuần",
        field: "timeDoExcerciseForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể dục/tuần (hậu xử lý)",
        field: "timeDoExcerciseForWeek_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể thao/tuần",
        field: "sportTimeForWeek",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian thể thao/tuần (hậu xử lý)",
        field: "sportTimeForWeek_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Sử dụng rượu bia",
        field: "alcohol",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Sử dụng rượu bia (hậu xử lý)",
        field: "alcohol_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nước có ga",
        field: "sodaWater",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Nước có ga (hậu xử lý)",
        field: "sodaWater_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Hút thuốc lá",
        field: "nicotine",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Hút thuốc lá (hậu xử lý)",
        field: "nicotine_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian ngủ/ngày",
        field: "timeSleep",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian ngủ/ngày (hậu xử lý)",
        field: "timeSleep_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Mắc bệnh mãn tính",
        field: "chronicDiseases",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Mắc bệnh mãn tính (hậu xử lý)",
        field: "chronicDiseases_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Uống thuốc trị bệnh mãn tính",
        field: "chronicDiseasesMedicine",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Uống thuốc trị bệnh mãn tính (hậu xử lý)",
        field: "chronicDiseasesMedicine_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cường độ lao động",
        field: "requireOfJob",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cường độ lao động (hậu xử lý)",
        field: "requireOfJob_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thu nhập",
        field: "income_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Phương tiện di chuyển",
        field: "transport",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Phương tiện di chuyển (hậu xử lý)",
        field: "transport_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Công viên ở nơi ở",
        field: "park",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Công viên ở nơi ở (hậu xử lý)",
        field: "park_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Thời gian sử dụng thiết bị công nghệ/ngày",
        field: "timeUseTechEquip_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Dử dụng thuốc an thần",
        field: "sedative",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Dử dụng thuốc an thần (hậu xử lý)",
        field: "sedative_p",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Trầm cảm, lo âu",
        field: "depression",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Trầm cảm, lo âu(hậu xử lý) ",
        field: "depression_p",
        sortable: true,
        filter: true,
    },

];


export const COLUMNSDEFS_DATASET_OBESITY = [
    {
        headerName: "Tuổi",
        field: "age",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Giới tính",
        field: "gender",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Chiều cao",
        field: "height",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Cân nặng",
        field: "weight",
        sortable: true,
        filter: true,
    },
    {
        headerName: "CAEC (mức tiêu thụ thực phẩm giữa mỗi bữa ăn)",
        field: "CAEC",
        sortable: true,
        filter: true,
    },
    {
        headerName: "CALC (Tiêu thụ rượu)",
        field: "CALC",
        sortable: true,
        filter: true,
    },
    {
        headerName: "CH2O (Tiêu thụ nước hằng ngày)",
        field: "CH2O",
        sortable: true,
        filter: true,
    },
    {
        headerName: "FAF (Tần suất hoạt động thể chất)",
        field: "FAF",
        sortable: true,
        filter: true,
    },
    {
        headerName: "FAVC (Thường xuyên tiêu thụ thức phẩm giàu calo)",
        field: "FAVC",
        sortable: true,
        filter: true,
    },
    {
        headerName: "FCVC (Tần suất tiêu thụ rau)",
        field: "FCVC",
        sortable: true,
        filter: true,
    },
    {
        headerName: "FHWO (Có người nhà mắc bệnh béo phì)",
        field: "FHWO",
        sortable: true,
        filter: true,
    },
    {
        headerName: "MTRANS (Phương tiện di chuyển sử dụng)",
        field: "MTRANS",
        sortable: true,
        filter: true,
    },
    {
        headerName: "NCP (Số bữa ăn chính)",
        field: "NCP",
        sortable: true,
        filter: true,
    },
    {
        headerName: "SCC (Theo dõi lượng calo tiêu thụ)",
        field: "SCC",
        sortable: true,
        filter: true,
    },
    {
        headerName: "SMOKE (Có hút thuốc lá không)",
        field: "SMOKE",
        sortable: true,
        filter: true,
    },
    {
        headerName: "TUE (Thời gian sử dụng thiết bị công nghệ)",
        field: "TUE",
        sortable: true,
        filter: true,
    },
    {
        headerName: "Obesity (Tình trạng béo phì)",
        field: "NObeyesdad",
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

