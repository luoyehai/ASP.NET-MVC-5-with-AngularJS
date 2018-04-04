var app = angular.module('myFormApp', []);

app.controller('ReportController', function ($scope, $http, $location, $window) {
    $scope.url = '/Home'
    $scope.depts = [];
    $scope.basic = 0;
    $scope.priority = 0;
    $scope.document = 0;
    $scope.company = 0;
    $scope.dept = 0;
    $scope.line = 0;

    $scope.exportData = [];
    $scope.exportData.push(["EmployeeName", "SAP_Module", "Basic_Operation", "Priority_Daily_Work", "Document_Resource", "SAP_Environment"
                          , "Dept_Colleagues_SAP_ERP", "Line_Manager_SAP_ERP", "Overall_Rating","SAP_Question1", "SAP_Question2"
                          , "SAP_Question3", "SAP_Question4", "SAP_Question5", "SAP_Idea1", "SAP_Idea2", "SAP_Idea3", "SAP_Idea4", "SAP_Idea5"]);
    HTTPGetAvgScore();
    HTTPRankingbyDept();
    exportexcel();

    function exportexcel(){
        var oldurl = $scope.url + '/exporttoResult';
        $http.get(oldurl)
            .success(function (data, status, headers, config) {
                angular.forEach(data, function (value, key) {
                    var obj = [];
                    obj.push(value.EmployeeName);
                    obj.push(value.SAP_Module);
                    obj.push(value.Basic_Operation);
                    obj.push(value.Priority_Daily_Work);
                    obj.push(value.Document_Resource);
                    obj.push(value.SAP_Environment);
                    obj.push(value.Dept_Colleagues_SAP_ERP);
                    obj.push(value.Line_Manager_SAP_ERP);
                    obj.push(value.Overall_Rating);
                    obj.push(value.SAP_Question1);
                    obj.push(value.SAP_Question2);
                    obj.push(value.SAP_Question3);
                    obj.push(value.SAP_Question4);
                    obj.push(value.SAP_Question5);
                    obj.push(value.SAP_Idea1);
                    obj.push(value.SAP_Idea2);
                    obj.push(value.SAP_Idea3);
                    obj.push(value.SAP_Idea4);
                    obj.push(value.SAP_Idea5);                    
                    $scope.exportData.push(obj);
                });
            })
        .error(function (data, status, headers, config) {

        });
     }

    function HTTPGetAvgScore() {
        //Get the Avg score from database
        var oldurl = $scope.url+'/getAvgScore';
        $http.get(oldurl)
            .success(function (data, status, headers, config) {
                var basic = data[0].Basic_Operation;
                var priority = data[0].Priority_Daily_Work;
                var document = data[0].Document_Resource;
                var company = data[0].SAP_Environment;
                var dept = data[0].Dept_Colleagues_SAP_ERP;
                var line = data[0].Line_Manager_SAP_ERP;
                $scope.basic = (basic / 5) * 100;
                $scope.priority = (priority/5)*100;
                $scope.document = (document/5)*100;
                $scope.company = (company/5)*100;
                $scope.dept = (dept/5)*100;
                $scope.line = (line/5)*100;

            })
        .error(function (data, status, headers, config) {
            $scope.message = 'Unexpected Error while getting user login!!';
            $scope.result = "color-red";
            console.log($scope.message);
        });
    }

    function HTTPRankingbyDept() {
        
        var dept = "FI,CO,MM,PP,SD,WM,PM,TM,QM,BI,DMS";
        var para = { 'dept': dept };
        $http({
            method: 'POST',
            url: $scope.url+'/getRankingbyDept',
            data: para
        }).success(function (data, status, headers, config) {
            $scope.depts = data;
            
        }).error(function (data, status, headers, config) {
            $scope.message = 'Unexpected Error while getting ranking score by module!' + data.errors;
            $scope.result = "color-red";
            console.log($scope.message);
        });

        //var oldurl = '/Home/getRankingbyDept';
        //$http.get(oldurl,para)
        //    .success(function (data, status, headers, config) {
        //        alert("in");
        //    })
        //.error(function (data, status, headers, config) {
        //    alert("Failed");
        //});

    }

})

app.directive('excelExport', function () {
    return {
        restrict: 'A',
        scope: {
            fileName: "@",
            data: "&exportData"
        },
        replace: true,
        template: '<button class="export" ng-click="download()">Export to Excel <i class="fa fa-download"></i></button>',
        link: function (scope, element) {

            scope.download = function () {

                function datenum(v, date1904) {
                    if (date1904) v += 1462;
                    var epoch = Date.parse(v);
                    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
                };

                function getSheet(data, opts) {
                    var ws = {};
                    var range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
                    for (var R = 0; R != data.length; ++R) {
                        for (var C = 0; C != data[R].length; ++C) {
                            if (range.s.r > R) range.s.r = R;
                            if (range.s.c > C) range.s.c = C;
                            if (range.e.r < R) range.e.r = R;
                            if (range.e.c < C) range.e.c = C;
                            var cell = { v: data[R][C] };
                            if (cell.v == null) continue;
                            var cell_ref = XLSX.utils.encode_cell({ c: C, r: R });

                            if (typeof cell.v === 'number') cell.t = 'n';
                            else if (typeof cell.v === 'boolean') cell.t = 'b';
                            else if (cell.v instanceof Date) {
                                cell.t = 'n'; cell.z = XLSX.SSF._table[14];
                                cell.v = datenum(cell.v);
                            }
                            else cell.t = 's';

                            ws[cell_ref] = cell;
                        }
                    }
                    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
                    return ws;
                };

                function Workbook() {
                    if (!(this instanceof Workbook)) return new Workbook();
                    this.SheetNames = [];
                    this.Sheets = {};
                }

                var wb = new Workbook(), ws = getSheet(scope.data());
                /* add worksheet to workbook update filename directly */
                wb.SheetNames.push('report');
                wb.Sheets['report'] = ws;
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }

                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }),'RankingReport.xlsx');

            };

        }
    };
}
 );