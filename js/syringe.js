var medicines = {};
var med_order;

function create_json(med, checked){
    if(checked){
        medicines[med] = {
            verification:null,
            dilution:0,
            injection:0,
            way:null
        }
    }
    else{
        delete medicines[med];
    }
    createtbl();
}


var medicine_keys
function createtbl() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.border = "3";
    table.appendChild(thead);
    table.appendChild(tbody);
    var globaldiv = document.getElementById("medtable");
    if (globaldiv) {
        globaldiv.innerHTML = "";
        globaldiv.appendChild(table);
    }
    // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "No.";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "藥劑名稱";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "驗證藥物";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "稀釋總量";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "施打總量";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "給藥途徑";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    thead.appendChild(row_1);

    
    medicine_keys = Object.keys(medicines);
    for (i=0; i<medicine_keys.length; i++) {
        // Creating and adding data to second row of the table
        let row_2 = document.createElement('tr');
        let row_2_data_1 = document.createElement('td');
        row_2_data_1.style.textAlign = "center";
        row_2_data_1.innerHTML = i+1;
        let row_2_data_2 = document.createElement('td');
        row_2_data_2.innerHTML = medicine_keys[i];
        row_2_data_2.style.textAlign = "center";
        let row_2_data_3 = document.createElement('td');
        row_2_data_3.style.textAlign = "center";
        if (medicines[medicine_keys[i]]['verification'] != null){
            row_2_data_3.innerHTML = "已掃描";
        }
        else{
            row_2_data_3.innerHTML = '<button name="syringe_verification" style="color: white;font-family:verdana;font-size:18px;border-radius: 10px;background-color: green;text-align:center;" onclick="JumpToPage(1);Getbutton_id(1,'+i+');Getbutton_id(2, '+i+');Getbutton_id(6, '+i+');Getbutton_id(3, '+i+');Barcode(1)">驗證</button>';
            row_2_data_3.style.textAlign = "center";
        }
        
        let row_2_data_4 = document.createElement('td');
        row_2_data_4.style.textAlign = "center";
        //下面這邊要刪
        if (medicines[medicine_keys[i]]['dilution'] == 0){
            row_2_data_4.innerHTML = '尚未輸入';
            // row_2_data_4.innerHTML = '<button name="delution_amount" button style="color: white;font-family:verdana;font-size:18px;border-radius: 10px;background-color: green;text-align:center;" onclick="JumpToPage(6);Getbutton_id(6, '+i+'); Getbutton_id(3, '+i+')">稀釋</button>';
        }
        else{
            row_2_data_4.innerHTML = medicines[medicine_keys[i]]['dilution'] + "/ml";
        }

        let row_2_data_5 = document.createElement('td');
        row_2_data_5.style.textAlign = "center";
        if (medicines[medicine_keys[i]]['injection']==0){
            row_2_data_5.innerHTML = '尚未辨識';
        }
        else{
            row_2_data_5.innerHTML = medicines[medicine_keys[i]]['injection'] + "/ml  " ;
        }
  
        
        
        let row_2_data_6 = document.createElement('td');
        
        var way_result = ""
        if (medicines[medicine_keys[i]]['way'] != null){
            row_2_data_6.innerHTML = medicines[medicine_keys[i]]['way'];
            row_2_data_6.style.textAlign = "center";
        }
        else{
            row_2_data_6.innerHTML = '尚未選擇';
            row_2_data_6.style.textAlign = "center";
        }

        row_2.appendChild(row_2_data_1);
        row_2.appendChild(row_2_data_2);
        row_2.appendChild(row_2_data_3);
        row_2.appendChild(row_2_data_4);
        row_2.appendChild(row_2_data_5);
        row_2.appendChild(row_2_data_6);
        tbody.appendChild(row_2);
    }
    
}
window.addEventListener("load",createtbl);


function JumpToPage(page) {
    switch(page){
        case 0:
            document.getElementById("page0").hidden = false;
            document.getElementById("page1").hidden = true;
            document.getElementById("page2").hidden = true;
            document.getElementById("page3").hidden = true;
            document.getElementById("page6").hidden = true;
            break;
        case 1:
            document.getElementById("page0").hidden = true;
            document.getElementById("page1").hidden = false;
            document.getElementById("page2").hidden = true;
            document.getElementById("page3").hidden = true;
            document.getElementById("page6").hidden = true;
            break;
        case 2:
            document.getElementById("page0").hidden = true;
            document.getElementById("page1").hidden = true;
            document.getElementById("page2").hidden = false;
            document.getElementById("page3").hidden = true;
            document.getElementById("page6").hidden = true;
            break;
        case 3:
            document.getElementById("page0").hidden = true;
            document.getElementById("page1").hidden = true;
            document.getElementById("page2").hidden = true;
            document.getElementById("page6").hidden = true;
            document.getElementById("page3").hidden = false;
            break;
        case 6:
            document.getElementById("page0").hidden = true;
            document.getElementById("page1").hidden = true;
            document.getElementById("page2").hidden = true;
            document.getElementById("page3").hidden = true;
            document.getElementById("page6").hidden = false;
            break;
    }
    
}




function tabSW(evt, tab_ID) {
// 声明所有变量
var i, tabcontent, tablinks;

// 使用 class="tabcontent" 获取所有元素并隐藏它们
tabcontent = document.getElementsByClassName("tabcontent");
for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
}

// 获取所有带有 class="tablinks" 的元素并删除类 "active"
tablinks = document.getElementsByClassName("tablinks");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
}

// 显示当前选项卡，并添加"活动"选项卡 类到打开选项卡的按钮
document.getElementById(tab_ID).style.display = "block";
evt.currentTarget.className += " active";
}

function Getbutton_id(page_type, button_id){
    if(page_type=='2'){  //劑量
        document.getElementsByName("injection_button_id").value= button_id;
    }
    else if(page_type=='3'){  //給藥途徑
        document.getElementsByName("way_button_id").value= button_id;
    }
    else if (page_type=='6'){ //稀釋
        document.getElementsByName("dilution_button_id").value = button_id;
    }
    else if(page_type=='1'){
        document.getElementsByName("verification_button_id").value = button_id;
    }

    }

      


function GetOption(p){

    if(p==2){
        // medicines[medicine_keys[document.getElementsByName("injection_button_id").value]]['injection'].push($("select[name='syringe_type']").val());
    }
    else if(p==3){
        if($('input[name=injection_info_site]:checked').val()!='-'){
            medicines[medicine_keys[document.getElementsByName("way_button_id").value]]['way'] = [$('input[name=injection_info]:checked').val(), $('input[name=injection_info_site]:checked').val()]; 
        }
        else{
            medicines[medicine_keys[document.getElementsByName("way_button_id").value]]['way'] = [$('input[name=injection_info]:checked').val()]; 
        }       
    }
    else if(p==6){
        medicines[medicine_keys[document.getElementsByName("dilution_button_id").value]]['dilution'] = $('input[name="syringe_diluent_value"]').val();
        // console.log($('input[name="syringe_diluent_value"]').val());

    }
    else if(p==1){
        // medicines[medicine_keys[document.getElementsByName("verification_button_id").value]]['verification'] = 'barcode';
    }

    console.log(medicines[medicine_keys[0]]);
    console.log(medicines[medicine_keys[1]]);

    createtbl();
    }

function Barcode(on_off){
    dan.push('Barcode-I',[client_uid,'Device_Demo','syringe', on_off]);
}


function Syringe_recognition(){
    dan.push('Syringe-I',[client_uid,'Device_Demo', $("select[name='syringe_type']").val(), 1]);
}