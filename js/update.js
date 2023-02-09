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


// async function getvalue()
//     {
//         const idf_id = document.getElementById('IDF_ID');
//         const idf_name = document.getElementById('IDF_name');
//         const radios = document.getElementsByName('barcode');
//         if (idf_id.value != "")
//         {
//             var img = document.getElementById('id');
//             img.src="pic/ok1.jpeg";
//         }else
//         {
//             var img = document.getElementById('id');
//             img.src="./pic/no.png";
//         }
//         if (idf_name.value != "")
//         {
//             var img = document.getElementById('name');
//             img.src="pic/ok1.jpeg";
//         }else
//         {
//             var img = document.getElementById('name');
//             img.src="./pic/no.png";
//         }
//         if (radios[0].checked || radios[1].checked)
//         {

//             var img = document.getElementById('bar');
//             img.src="pic/ok1.jpeg";
//         }else
//         {
//             var img = document.getElementById('bar');
//             img.src="./pic/no.png";
//         }
//         if (radios[1].checked)
//         {
//             $('.bar_no')[0].innerText = '已更換病人資訊為:陳志明(男) 出生年月日: 37/06/17 病歷號: 02386145 身分證字號：A120857201';
//         }else
//         {
//             $('.bar_no')[0].innerText = '';
//         }

//         // check pill
//         for (var i=1;i<10;i++){
//             var pill_id = 'check' + i
//             console.log(pill_id)
//             var check_pill = document.getElementById('check' + i);
            
//             if (i != '3' && i != '6'){
//                 if(check_pill.checked){
//                     console.log('yes');
//                     var sheet = document.getElementById('sheet-yes' + i);
                    
//                     sheet.style.display = 'block';
                    
                
                    
//                 }else{
//                     var sheet = document.getElementById('sheet-yes' + i);
//                     sheet.style.display = 'none';
//                 }

//             }
            
//         }
        
//     }

// setInterval(getvalue, 1000);

function check_page(n){
    if (n === 1){
        const idf_id = document.getElementById('IDF_ID');
        const idf_name = document.getElementById('IDF_name');
        if (idf_id.value != "" && idf_name.value != ""){
            plusSlides(1);
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
        if (radios[0].checked || radios[1].checked)
        {
            plusSlides(1);
        }else
        {
            var img = document.getElementById('bar');
            img.src="pic/wrong.jpeg";
        }
        if ($('.barcode_value')[0].innerText == "_____________"){
            var img = document.getElementById('barcode_scanner');
            img.src="pic/wrong.jpeg";
        }
        
    }
    else if(n === 4){
        const radios = document.getElementsByName('barcode');
        var radios_ans;
        if (radios[0].checked)
        {
            radios_ans = 'yes';
        }else if (radios[1].checked)
        {
            radios_ans = 'no';
        }else
        {
            radios_ans = 'null';
        }

        const all_info = JSON.stringify({ id: document.getElementById('IDF_ID').value,
                                            name: document.getElementById('IDF_name').value,
                                            barcode: $('.ODF_value')[0].innerText,
                                            barcode_r: radios_ans,
                                            Dilatrend25: document.getElementById('Dilatrend 25mg/tab').item,
                                            Dilatrend25_r: document.getElementById('Dilatrend 25mg/tab r').value,
                                            Dilatrend25_r_no: document.getElementById('Dilatrend 25mg/tab r no').value,
                                            Dilantin: document.getElementById('Dilantin').item,
                                            Dilantin_r: document.getElementById('Dilantin r').value,
                                            // Dilantin_r_no: document.getElementById('Dilantin r no').value,
                                            Requip: document.getElementById('Requip F.C 0.25mg/tab').item,
                                            Requip_r: document.getElementById('Requip F.C 0.25mg/tab r').value,
                                            Requip_r_no: document.getElementById('Requip F.C 0.25mg/tab r no').value,
                                            Requip1: document.getElementById('Requip F.C 1 mg').item,
                                            Requip1_r: document.getElementById('Requip F.C 1 mg r').value,

                                            Repaglinide: document.getElementById('Repaglinide 1mg/tab').item,
                                            Repaglinide_r: document.getElementById('Repaglinide 1mg/tab r').value,
                                            Repaglinide_r_no: document.getElementById('Repaglinide 1mg/tab r no').value,
                                            Transamin: document.getElementById('Transamin 250mg/tab').item,
                                            Transamin_r: document.getElementById('Transamin 250mg/tab r').value,
                                            Transamin_r_no: document.getElementById('Transamin 250mg/tab r no').value,
                                            Bokey: document.getElementById('Bokey 100mg/tab').item,
                                            Bokey_r: document.getElementById('Bokey 100mg/tab r').value,
                                            Bokey_r_no: document.getElementById('Bokey 100mg/tab r no').value,
                                            Simvahexal: document.getElementById('Simvahexal 20 mg/tab').item,
                                            Simvahexal_r: document.getElementById('Simvahexal 20 mg/tab r').value,
                                            Simvahexal_r_no: document.getElementById('Simvahexal 20 mg/tab r no').value,
                                            FLU: document.getElementById('FLU-D (Fluconazole) 50mg/tab').item,
                                            FLU_r: document.getElementById('FLU-D (Fluconazole) 50mg/tab r').value,
                                            FLU_r_no: document.getElementById('FLU-D (Fluconazole) 50mg/tab r no').value,
                                            
                                             });
        dan.push('confirm', all_info);
        setTimeout(() => { window.location.href = 'http://140.113.110.21:1526/show/index.html'; }, 1000);
        // 
      
    }
    else{
        plusSlides(1);
    }
}

function check_bt(f){
    if (f === 'barcode'){
        dan.push('patient_barcode',[true]);
        // sleep(3000);
        output_patient_barcode_bt = output_patient_barcode_bt + 1;
    }
    else if(f === 'pill'){
        dan.push('pill_detect',[true]);
        output_pill_bt = output_pill_bt + 1;
        $('.pill_hint')[0].innerText = 'waiting...';
    }
}