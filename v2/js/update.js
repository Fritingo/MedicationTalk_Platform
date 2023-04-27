// 各項事件處理

// start
window.alert("介面介紹\n ‘檢定：填完學號、姓名並按下開始檢定’ \n ‘左上角🔍：分析學習紀錄’ \n ’右上角圖示：操作說明‘");

// page1

const idf_id = document.getElementById('IDF_ID');
idf_id.addEventListener('change', function (e) {
    if (idf_id.value != "")
        {
            var img = document.getElementById('id');
            img.src="pic/ok1.jpeg";
        }else
        {
            var img = document.getElementById('id');
            img.src="./pic/no.png";
        }
}, false);

const i_name = document.getElementById('IDF_name');
i_name.addEventListener('change', function (e) {
    if (idf_id.value != "")
        {
            var img = document.getElementById('name');
            img.src="pic/ok1.jpeg";
        }else
        {
            var img = document.getElementById('name');
            img.src="./pic/no.png";
        }
}, false);

// page2
const radio1 = document.getElementById('radio1');
radio1.addEventListener('change', function (e) {
    var img = document.getElementById('bar');
    img.src="pic/ok1.jpeg";

    $('.bar_no')[0].innerText = '';
    
}, false);

const radio2 = document.getElementById('radio2');
radio2.addEventListener('change', function (e) {

    var img = document.getElementById('bar');
    img.src="pic/ok1.jpeg";

    $('.bar_no')[0].innerText = '已更換病人資訊為:陳志明(男) 出生年月日: 37/06/17 病歷號: 02386145 身分證字號：A120857201';
}, false);

//page3

// 病人狀況顯示
var show_patient_state = document.getElementById('patient_state')
var patient_state_show = document.getElementById('patient_state_v');

show_patient_state.addEventListener('change', function (e) {
    
    if(show_patient_state.checked){

        patient_state_show.style.display = 'block';

    }else{

        patient_state_show.style.display = 'none';

    }

}, false);

// check pill
var check_list = [];

// MAR 與給藥學習單
for (let i=0; i<10; i++){
    check_list.push(document.getElementById('check' + (i + 1)));
}

var listener_list = [];

for (let i=0; i<10; i++){

    listener_list.push(check_list[i].addEventListener('change', function(e){
        
        let sheet = document.getElementById('sheet-yes' + (i+1));
        let sheet_no = document.getElementById('sheet-no' + (i+1));
        
        if(check_list[i].checked){

            sheet.style.display = 'block';
            sheet_no.style.display = 'none';

        }else{

            sheet.style.display = 'none';
            sheet_no.style.display = 'block';

        }
        if (i==2){ // "Millisrol inj 5mg/10ml/amp"
            create_json('Millisrol inj 5mg/10ml/amp', check_list[i].checked);
        }
        else if(i == 5){ // "Ampicillin 2000mg 500mg/vail"
            create_json('Ampicillin 2000mg 500mg/vail', check_list[i].checked);
        };

    }))
 
}


// page 4 -> feedback.py

var correctness = [];
var reason = [];


function check_page(n){
    if (n === 1){
        const idf_id = document.getElementById('IDF_ID');
        const idf_name = document.getElementById('IDF_name');
        if (idf_id.value != "" && idf_name.value != ""){
            plusSlides(1);
            window.alert("您即將進入給藥情境\n [請依照指示操作]");

            // set syringe URL 
            subFeature = document.getElementById('iframe_syringe')
            subFeature.src = subFeature.src + 'device_0/' + client_uid
            console.log(subFeature.src)
        }
        else if(idf_id.value == "" && idf_name.value == ""){
            var img1 = document.getElementById('id');
            img1.src="pic/wrong.jpeg";
            var img2 = document.getElementById('name');
            img2.src="pic/wrong.jpeg";
        }
        else if(idf_id.value != ""){
            var img = document.getElementById('name');
            img.src="pic/wrong.jpeg";
        }
        else if(idf_name.value != ""){
            var img = document.getElementById('id');
            img.src="pic/wrong.jpeg";
        }
    }
    else if(n === 2){
        const radios = document.getElementsByName('barcode');
        if ((radios[0].checked || radios[1].checked) && $('.patient_barcode_hint')[0].innerText == '★ 辨識完成請繼續執行下一步＾＿＾')
        {
            plusSlides(1);
            window.alert("開始給藥\n [請依照指示操作]");

        }else if(!(radios[0].checked || radios[1].checked))
        {
            var img = document.getElementById('bar');
            img.src="pic/wrong.jpeg";
        }
        if ($('.patient_barcode_hint')[0].innerText == '請到Barcode機的螢幕上操作'){
            var img = document.getElementById('barcode_scanner');
            img.src="pic/wrong.jpeg";
        }
        
    }
    else if(n === 3){
        correctness = [];
        reason = [];
        if (pill_detect['Dilatrend'] == -1){ // if get value it will not be -1 -> usually nothing is 0
            var img = document.getElementById('pill_odf');
            img.src="pic/wrong.jpeg";
            // console.log(pill_detect)
        }

        feedback();

        let empty_textbox = 0;

        for(let i = 0; i < reason.length; i++){
            if (reason[i] == "" || reason[i] == " "){
                empty_textbox = 1;
                var img = document.getElementById('pill_text');
                img.src="pic/wrong.jpeg";
                break;
            }
        }
        
        if (window.confirm("確定送出檢定?\n 送出後會給您一些建議與檢討並與後台做數據分析～～")) {
            feedback();
        
            let empty_textbox = 0;

            for(let i = 0; i < reason.length; i++){
                if (reason[i] == "" || reason[i] == " "){
                    empty_textbox = 1;
                    var img = document.getElementById('pill_text');
                    img.src="pic/wrong.jpeg";
                    break;
                }
            }   
            // console.log(pill_detect);
    
            if (empty_textbox == 0 && pill_detect['Dilatrend'] != -1){
                var img = document.getElementById('pill_text');
                img.src="pic/ok1.jpeg";
    
                pills_num = Object.values(pill_detect)
                $.post("https://fritingo.ddns.net/api/_sheet_user", {  id: document.getElementById('IDF_ID').value,
                                                                        name: document.getElementById('IDF_name').value,
                })  

                $.post("https://fritingo.ddns.net/api/_sheet_pill", {  pills_1: pills_num[0],
                                                                    pills_2: pills_num[1],
                                                                    pills_3: pills_num[2],
                                                                    pills_4: pills_num[3],
                                                                    pills_5: pills_num[4],
                                                                    pills_6: pills_num[5],
                                                                    pills_7: pills_num[6],
                                                                    pills_8: pills_num[7],
                                                                    pills_9: pills_num[8],
                                                                    pic: client_uid,
                })

                $.post("https://fritingo.ddns.net/api/_sheet_feedback", {  reason_1: reason[0],
                                                                    reason_2: reason[1],
                                                                    reason_3: reason[2],
                                                                    reason_4: reason[3],
                                                                    reason_5: reason[4],
                                                                    reason_6: reason[5],
                                                                    reason_7: reason[6],
                                                                    reason_8: reason[7],
                                                                    reason_9: reason[8],
                                                                    reason_10: reason[9],
                })

                $.post("https://fritingo.ddns.net/api/_sheet_cognition", {    patient_barcode: patient_barcode,
                                                                                student_cognition_1: cognition[0],
                                                                                student_cognition_2: cognition[1],
                                                                                student_cognition_3: cognition[2],
                                                                                student_cognition_4: cognition[3],
                                                                                student_cognition_5: cognition[4],
                                                                                student_cognition_6: cognition[5],
                                                                                student_cognition_7: cognition[6],
                                                                                student_cognition_8: cognition[7],
                                                                                student_cognition_9: cognition[8],
                                                                                student_cognition_10: cognition[9],                                 
                })

                $.post("https://fritingo.ddns.net/api/_sheet_record", {  id: document.getElementById('IDF_ID').value,
                                                                    ans_1: correctness[0],
                                                                    ans_2: correctness[1],
                                                                    ans_3: correctness[2],
                                                                    ans_4: correctness[3],
                                                                    ans_5: correctness[4],
                                                                    ans_6: correctness[5],
                                                                    ans_7: correctness[6],
                                                                    ans_8: correctness[7],
                                                                    ans_9: correctness[8],
                                                                    ans_10: correctness[9],
                })

                plusSlides(1);
            }
            
        }
 
      
    }
    else if(n === 4){
        console.log('analysis');
        $.getJSON('https://fritingo.ddns.net/api/_level', {
            }, function(data) {
                console.log(data);
                console.log('search level');
                    
                loading_text = document.getElementById('analysis_loading');
                loading_text.style.display = "none";
                pieChart_view = document.getElementById('PieChart');
                pieChart_view.style.display = "block";
                
                pieChart.data.datasets[0].data = data['level'];
                
                pieChart.update();
            });
   
        currentSlide(5);
    }
    else{
        location.reload()
    }
    $("html, body").animate(
        {
          scrollTop: 0
        },
        500 // 回頂部時間為 500 毫秒
      );
}

function check_bt(f){
    if (f === 'barcode'){
        $('.patient_barcode_hint')[0].innerText = '請到Barcode機的螢幕上操作';
        dan.push('Barcode-I', [client_uid, 'Device_Demo', 'patient', true]);
        
        
        output_patient_barcode_bt = output_patient_barcode_bt + 1;
    }
    else if(f === 'pill'){
        dan.push('Pill_Detect-I', [client_uid, 'Device_Demo', true]);
        output_pill_bt = output_pill_bt + 1;
        $('.pill_hint')[0].innerText = 'waiting...';
    }
    else if(f === 'history'){
        loading_text = document.getElementById('history_loading')
        loading_text.style.display = "block";
        $.getJSON('https://fritingo.ddns.net/api/_history', {
            user_id: document.getElementById('history_v').value
            }, function(data) {
                console.log(data);
                console.log('search history');
                loading_text = document.getElementById('history_loading');
                loading_text.style.display = "none";
                lineChart_view = document.getElementById('LineChart');
                lineChart_view.style.display = "block";
                
                lineChart.data.datasets[0].data = data['history_data'];
                history_label = data['history_label'].map(x => x.substring(5, 11));
                lineChart.data.labels = history_label;

                lineChart.options.plugins.title.text = document.getElementById('history_v').value + "的歷史成績紀錄";
                console.log(lineChart.options.plugins.title.text);
                lineChart.update();
            });

    }
    else if(f === 'time'){
        loading_text = document.getElementById('time_loading')
        loading_text.style.display = "block";
        $.getJSON('https://fritingo.ddns.net/api/_time_total', {
            
            start_date: moment(document.getElementById('start_date').value).format('YYYY-MM-DD HH:MM:SS'),
            end_date: moment(document.getElementById('end_date').value).format('YYYY-MM-DD HH:MM:SS')
            }, function(data) {
                console.log('search time');
                loading_text = document.getElementById('time_loading');
                loading_text.style.display = "none";
                barChart_view = document.getElementById('BarChart');
                barChart_view.style.display = "block";
                
                barChart.data.datasets[0].data = data['each_q_score'];
               
                barChart.update();
            });
    }
}