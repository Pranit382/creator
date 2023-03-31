ZOHO.CREATOR.init()
    .then(function (data) {
        console.log('Getting all records');
        var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
        var idr = queryParams["ID"];

        // const QueryString = window.location.search; 
        // console.log(QueryString)


        config = {
            reportName: "All_Inquiry_Modules",
            id: idr

        }

        ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
            console.log(response.data);
            const myJSON = response.data;
            // console.log(myJSON.Dealership_Code);
            // document.getElementById("City").innerHTML = myJSON.City.display_value;
            document.getElementById("Dealership_Name1").innerHTML = myJSON.Dealership_Name1

            document.getElementById("Dealership_Code2").innerHTML = myJSON.Dealers_code1.display_value;
            document.getElementById("City").innerHTML = myJSON.City1
            document.getElementById("Status").innerHTML = myJSON.Status1;
            // //Technician 
            document.getElementById("Technician_Name").innerHTML = myJSON.Technician_Name1;
            document.getElementById("Position").innerHTML = myJSON.Position;
            document.getElementById("Contact_No").innerHTML = myJSON.Contac_No;

            // //Vehicle
            document.getElementById("VIN").innerHTML = myJSON.Vehicle1.display_value;
            document.getElementById("Engine_No").innerHTML = myJSON.Engine_No;
            document.getElementById("Mileage").innerHTML = myJSON.Milege;
            document.getElementById("Registration").innerHTML = myJSON.Registration;
            document.getElementById("Rego_Date").innerHTML = myJSON.Reg_Date;
            document.getElementById("Fuel_Type").innerHTML = myJSON.Fuel_Type;
            document.getElementById("Model_Description").innerHTML = myJSON.Model_Description1;
            document.getElementById("RO_Number").innerHTML = myJSON.Ro_No;
            document.getElementById("RO_Date").innerHTML = myJSON.Reg_Date;
            document.getElementById("Vehicle_Immoblised").innerHTML = myJSON.Vehicle_Immobilized;
            document.getElementById("Model_Code").innerHTML = myJSON.Model_Code;
            document.getElementById("Accessories").innerHTML = myJSON.Accessories;
            document.getElementById("Request_Type").innerHTML = myJSON.Request_Type;
            document.getElementById("Device_Classification").innerHTML = myJSON.Device_Classification;
            document.getElementById("Trouble_Code").innerHTML = myJSON.Trouble_Code.display_value;
            document.getElementById("Prority").innerHTML = myJSON.Priority;
            document.getElementById("Customer_Complaint_Symptom").innerHTML = myJSON.Customers;
            document.getElementById("Actual_Diagnosis_Fault_Finding_Possible_Cause").innerHTML = myJSON.Actual_Diagnosis_Fault_finding_Possible_cause;
            document.getElementById("Recommended_Repair").innerHTML = myJSON.Recommended_Repair;
            document.getElementById("Relevant_Repair_History").innerHTML = myJSON.Relevant_Repair_History;
            document.getElementById("Diagnosis_Investigation_Results").innerHTML = myJSON.Diagnosis_Investigation_Results;
            document.getElementById("Vehicle_Service_Repair_History_If_applicable").innerHTML = myJSON.Vehicle_Service_Repair_History_if_applicable;
            document.getElementById("AbcD").innerHTML = myJSON.Comments;
            document.getElementById("Activity_log").innerHTML = myJSON.A_Comm;
           
        });
        Comments_Fetch();
        Activity_Fetch();

    });



function OnChange() {

    var R = { Status1: "Solved" };
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var idr = queryParams["ID"];
    var config2 = {
        reportName: "All_Inquiry_Modules",
        id: idr,
        data: { data: R }
    }

    ZOHO.CREATOR.API.updateRecord(config2).then(function (response2) {
        location.reload();
        console.log("ok");
        const myJSON = response2.data;
    });
}
function OnSubmit() {

    var P = { Status1: "In progress" };
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var idr = queryParams["ID"];
    var config3 = {
        reportName: "All_Inquiry_Modules",
        id: idr,
        data: { data: P }
    }
    ZOHO.CREATOR.API.updateRecord(config3).then(function (response3) {
        location.reload();
        console.log("Record updated successfully");
        const myJSON = response3.data;
    });
}

function OnComment() {
    var AddData = document.getElementById("Comment_1").value;
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var idr = queryParams["ID"];
    var datafrom = { "IDs": idr, "Comments": AddData };
    var config5 = { formName: "Comment", data: { data: datafrom } }
    //add record API
    ZOHO.CREATOR.API.addRecord(config5).then(function (response) {
        location.reload();
        //callback block
    });
}

// Comments show in HTML 
// function Comments_Fetch(){
//    // var formData = { Comments: Comment_1 };
//     var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
//     var idr = queryParams["ID"];
//     var configp = {
//         reportName: "All_Comments",
//         id: idr,
//      //   data:  {data:formData} 
//     }
//         ZOHO.CREATOR.API.getRecordById(configp).then(function(response) {
//         location.reload();
//         const myJSON = response.data;
//         console.log(" ok successfully");
//     }); 
// }

function Comments_Fetch() {
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var id4 = queryParams["ID"];
    let crit_begin = "(";
    let string_name = "IDs==";
    let quotes = `\"`;
    let crit_end = ")";
    var crit_string = crit_begin + string_name + quotes + id4 + quotes + crit_end;
    var config = { reportName: "All_Comments", criteria: crit_string }
    ZOHO.CREATOR.API.getAllRecords(config).then(function (FinalResult) {
        const vintojson = FinalResult.data;
        console.log(FinalResult.data)
        FinalResultfn(vintojson)
        function FinalResultfn(data) {
            var table = document.getElementById('R1')

            for (var i = 0; i < data.length; i++) {
                var row = `<tr>
                                 <td>${data[i].Comments}</td>
                            </tr>`
                table.innerHTML += row
            }
        }

    });

}

function OnActivity() {
    var AddData = document.getElementById("Activity1").value;
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var idp = queryParams["ID"];
    var datafrom = { "Aid": idp, "A_Comm": AddData };
    var config5 = { formName: "Activity_Logs", data: { data: datafrom } }
    //add record API
    ZOHO.CREATOR.API.addRecord(config5).then(function (response) {
        location.reload();
        //callback block
    });
}

function Activity_Fetch() {
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var idab = queryParams["ID"];
    let crit_begin = "(";
    let string_name = "Aid==";
    let quotes = `\"`;
    let crit_end = ")";
    var crit_string = crit_begin + string_name + quotes + idab + quotes + crit_end;
    var config = { reportName: "All_Activity_Logs", criteria: crit_string }
    ZOHO.CREATOR.API.getAllRecords(config).then(function (FinalResult) {
        const vintojson = FinalResult.data;
        console.log(FinalResult.data)
        FinalResultfn(vintojson)
        function FinalResultfn(data) {
            var table = document.getElementById('AcLog')

            for (var i = 0; i < data.length; i++) {
                
                var row = `<tr>
                                 <td>${data[i].A_Comm}</td>
         <button  href="#staticBackdrop" type="button" OnClick ="OnEdit(${data[i].ID}n);OnFatchs()" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
             Edit
         </button>
          <button OnClick="DeleteRec(${data[i].ID}n)" type="Delete" value= "Delete" class="btn btn-success m-3">
             Delete
          </button>

                            </tr>`
                table.innerHTML += row
            
            }
        }

    });

}
        //Global Variable:-
        let EdZ;
        function OnEdit(ZA){
            EdZ=ZA;
        };



        function DeleteRec(Remove) {
              console.log(Remove);
            var config = {
                    reportName: "All_Activity_Logs",
                    criteria: "(ID==" + Remove + ")"
                        }
        ZOHO.CREATOR.API.deleteRecord(config).then(function (response) {
        location.reload();
        console.log("Record has been deleted");
                });
                }


        function OnUpdate1(){
                var AddData = document.getElementById("EditMsg").value;
                var AData = {A_Comm:AddData};
                var configl = { 
                         reportName : "All_Activity_Logs", 
                         id: EdZ,
                         data:{data:AData}
                        }
    
                        ZOHO.CREATOR.API.updateRecord(configl).then(function(response){
                        location.reload();
                           });
              }
            

              function OnFatchs(){
                    var configd = {
                        reportName : "All_Activity_Logs", 
                        id : EdZ,
                             } 
             
              ZOHO.CREATOR.API.getRecordById(configd).then(function(responsed){
                      const myJSON = responsed.data;
                      document.getElementById("EditMsg").innerHTML = myJSON.A_Comm;
                      console.log(responsed.data);
                         });
              }
            
    


