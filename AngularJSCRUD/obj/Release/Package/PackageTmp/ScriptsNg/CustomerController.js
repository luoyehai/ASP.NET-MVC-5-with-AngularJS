angular.module('myFormApp', [])
    .controller('CustomerController', function ($scope, $http, $location, $window) {
        $scope.Rating = {};
        $scope.Rating.EmployeeName = $("#employeename").val();
        $scope.Rating.Overall_Rating = 0;
        $scope.Rating.CreateOn = new Date();
        GetLogin();
        $scope.Rating.BasicOperselected = null;
        $scope.Rating.Priorityselected = null;
        $scope.Rating.Documentselected = null;
        $scope.Rating.ComppanySAPelected = null;
        $scope.Rating.DeptColleagueselected = null;
        $scope.Rating.Managerselected = null;
        $scope.SAPModuleS = [
                { title: 'FI', checked: false },
                { title: 'CO', checked: false },
                { title: 'MM', checked: false },
                { title: 'SD', checked: false },
                { title: 'WM', checked: false },
                { title: 'PM', checked: false },
                { title: 'TM', checked: false },
                { title: 'QM', checked: false },
                { title: 'BI', checked: false },
                { title: 'DMS', checked: false }
        ];
        $scope.RatingsBasic = [
            { title: 'Poor', checked: false, value:1 },
            { title: 'Fair', checked: false, value:2},
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.RatingsPriority = [
            { title: 'Poor', checked: false, value: 1 },
            { title: 'Fair', checked: false, value: 2 },
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.RatingsDocument = [
            { title: 'Poor', checked: false, value: 1 },
            { title: 'Fair', checked: false, value: 2 },
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.RatingsCompany = [
            { title: 'Poor', checked: false, value: 1 },
            { title: 'Fair', checked: false, value: 2 },
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.RatingsDept = [
            { title: 'Poor', checked: false, value: 1 },
            { title: 'Fair', checked: false, value: 2 },
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.RatingsLine = [
            { title: 'Poor', checked: false, value: 1 },
            { title: 'Fair', checked: false, value: 2 },
            { title: 'Satisfatory', checked: false, value: 3 },
            { title: 'Good', checked: false, value: 4 },
            { title: 'Excellent', checked: false, value: 5 }
        ];
        $scope.updateSAPModuleSelection = function (position, SAPModuleS, title) {
            $scope.Rating.SAP_Module = $scope.GetCheckedValue(position, SAPModuleS, title);
        }   
        //basic Operation
        $scope.updateBasicOperSelection = function (position, RatingBasic, RatingsBasic, value) {
            $scope.Rating.Basic_Operation = $scope.GetCheckedRatingValue(position, RatingBasic, RatingsBasic, value);
            $scope.changeratingnumber();
        }
        //Priority in your daily work
        $scope.updatePrioritySelection = function (position, RatingPriority, RatingsPriority, value) {
            $scope.Rating.Priority_Daily_Work = $scope.GetCheckedRatingValue(position, RatingPriority, RatingsPriority, value);
            $scope.changeratingnumber();
        }
        //Document Resource
        $scope.updateDocumentSelection = function (position, RatingDocument, RatingsDocument, value) {
            $scope.Rating.Document_Resource = $scope.GetCheckedRatingValue(position, RatingDocument, RatingsDocument, value);
            $scope.changeratingnumber();
        }
        //Company SAP Learning Environment
        $scope.updateCompanySAPSelection = function (position, RatingCompany, RatingsCompany, value) {
            $scope.Rating.SAP_Environment = $scope.GetCheckedRatingValue(position, RatingCompany, RatingsCompany, value);
            $scope.changeratingnumber();
        }
        //Same Dept Colleagues SAP ERP skill
        $scope.updateDeptColleaguesSelection = function (position, RatingDept, RatingsDept, value) {
            $scope.Rating.Dept_Colleagues_SAP_ERP = $scope.GetCheckedRatingValue(position, RatingDept, RatingsDept, value);
            $scope.changeratingnumber();
        }
        //Line manager SAP ERP skill
        $scope.updateManagerSAPSelection = function (position, RatingLine, RatingsLine, value) {
            $scope.Rating.Line_Manager_SAP_ERP = $scope.GetCheckedRatingValue(position, RatingLine, RatingsLine, value);
            $scope.changeratingnumber();
        }
        //rating number
        $scope.changeratingnumber = function () {
            var basic = 0;
            var priority = 0;
            var docu = 0;
            var company = 0;
            var dept = 0;
            var manager = 0;
            var result = 0;
            basic = getcheckvalue($scope.Rating.Basic_Operation, basic);
            priority = getcheckvalue($scope.Rating.Priority_Daily_Work, priority);
            docu = getcheckvalue($scope.Rating.Document_Resource, docu);
            company = getcheckvalue($scope.Rating.SAP_Environment, company);
            dept = getcheckvalue($scope.Rating.Dept_Colleagues_SAP_ERP, dept);
            manager = getcheckvalue($scope.Rating.Line_Manager_SAP_ERP, manager);

            result = basic + priority + docu + company + dept + manager;
            result = result / 6;
            result = parseFloat(Math.round(result * 100) / 100).toFixed(2);
            $scope.Rating.Overall_Rating = parseFloat(result);

        }
        function getcheckvalue(localvalue, number) {
            if (localvalue == null ) {
                number = 0;
            }
            else {
                number = localvalue;
            }
            return number;
        }
        $scope.GetCheckedValue = function (position, SAPModuleS, title) {
            angular.forEach(SAPModuleS,
                function (SAPModule, index) {
                    if (position != index)
                        SAPModule.checked = false;
                    result = title;
                });
            return result;
        }
        $scope.GetCheckedRatingValue = function (position, parrating, parRatings, value) {
            angular.forEach(parRatings,
                function (parrating, index) {
                    if (position != index)
                        parrating.checked = false;
                    result = value;
                });
            return result;
        }
        $scope.submitform = function () {
            var keepgoing = true;
            keepgoing = $scope.ValidateForm();
            if (keepgoing) {
                $scope.UpdateSurveyinDB();
            }
            
        }
        $scope.ValidateForm = function () {
            var keepgoing = true;
            //Check check box
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.SAP_Module, "SAP Module");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.Basic_Operation, "Basic Operation");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.Priority_Daily_Work, "Priority in your daily work");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.Document_Resource, "Document Resource");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.SAP_Environment, "Company SAP Learning Environment");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.Dept_Colleagues_SAP_ERP, "Same Dept Colleagues SAP ERP skill");
            }
            if (keepgoing) {
                keepgoing = $scope.checkcheckbox($scope.Rating.Line_Manager_SAP_ERP, "Line manager SAP ERP skill");
            }

             //check text area
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Question1, "SAP Question 1");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Question2, "SAP Question 2");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Question3, "SAP Question 3");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Question4, "SAP Question 4");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Question5, "SAP Question 5");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Idea1, "SAP idea 1");
            }
            if (keepgoing) {
                $scope.checktextarea($scope.Rating.SAP_Idea2, "SAP idea 2");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Idea3, "SAP idea 3");
            }
            if (keepgoing) {
                keepgoing = $scope.checktextarea($scope.Rating.SAP_Idea4, "SAP idea 4");
            }
            if (keepgoing) {
                keepgoing =$scope.checktextarea($scope.Rating.SAP_Idea5, "SAP idea 5");
            }
            return keepgoing;
        }
        $scope.checktextarea = function (textvalue, questiondetail) {
            //if (textvalue == null || textvalue.trim().length < 1 || textvalue =='undefined') {
            //    $window.alert("Please fill in the " + questiondetail);
            //    return false;
            //}
           if (textvalue == null) {
                $window.alert("Please fill in the " + questiondetail);
                return false;
            }
           return true;
        }
        $scope.checkcheckbox = function (checkvalue, questiondetail) {
            if (checkvalue == null ) {
                $window.alert("Please check the  " + questiondetail);
                return false;
            }
            return true;
        }

        function GetLogin() {
            var oldurl = 'test/Home/getLogin';
            //var url = '@Url.Action("getLogin", "Home")'
            $http.get(oldurl)
                .success(function (data, status, headers, config) {
                    $scope.Rating.EmployeeName = data;
            })
            .error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error while getting user login!!';
                $scope.result = "color-red";
                console.log($scope.message);
                });

        };
        $scope.UpdateSurveyinDB = function () {
            $http({
                method: 'POST',
                url: 'test/Home/SaveRating',
                data: $scope.Rating
            }).success(function (data, status, headers, config) {
                if (data.success === true) {
                    $window.alert("Successfully submitted! Thanks");
                    $scope.Rating = {};
                }
                else {
                    $scope.message = 'Unexpected Error while updating the rating!';
                    console.log($scope.message);
                }
            }).error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error while saving data!!' + data.errors;
                $scope.result = "color-red";
                console.log($scope.message);
            });
        }

    }).config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
    });