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

// check pill
var check_list = [];

for (let i=1; i<10; i++){
    check_list.push(document.getElementById('check' + i));
}

var listener_list = [];
for (let i=0; i<9; i++){
    if (i != '2' && i != '5'){
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
        }))
    
    }
}

// for (var i=1;i<10;i++){
//     var pill_id = 'check' + i
//     console.log(pill_id)
//     var check_pill = document.getElementById('check' + i);
    
//     if (i != '3' && i != '6'){
//         if(check_pill.checked){
//             console.log('yes');
//             var sheet = document.getElementById('sheet-yes' + i);
            
//             sheet.style.display = 'block';
            
        
            
//         }else{
//             var sheet = document.getElementById('sheet-yes' + i);
//             sheet.style.display = 'none';
//         }

//     }
    
// }




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
var correctness = [];
var reason = [];


function check_page(n){
    if (n === 1){
        const idf_id = document.getElementById('IDF_ID');
        const idf_name = document.getElementById('IDF_name');
        if (idf_id.value != "" && idf_name.value != ""){

            plusSlides(1);
            $("html, body").animate(
                {
                  scrollTop: 0
                },
                500 // 回頂部時間為 500 毫秒
              );
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
            $("html, body").animate(
                {
                  scrollTop: 0
                },
                500 // 回頂部時間為 500 毫秒
              );
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
    else if(n === 3){
        feedback();
        console.log(correctness);
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
        
        console.log(pill_detect);
        const all_info = JSON.stringify({   class: 4,
                                            id: document.getElementById('IDF_ID').value,
                                            name: document.getElementById('IDF_name').value,
                                            barcode1: $('.barcode_value')[0].innerText,
                                            select1: radios_ans,
                                            correctness1: correctness[0],
                                            check2: document.getElementById('check1').checked,
                                            Dilatrend: pill_detect['Dilatrend'],
                                            Dilantin: pill_detect['Dilantin'],
                                            correctness2: correctness[1],
                                            reason2: reason[0],
                                            check3:  document.getElementById('check2').checked,
                                            Requip: pill_detect['Requip'],
                                            Requip1: pill_detect['Requip1'],
                                            correctness3: correctness[2],
                                            reason3: reason[1],
                                            check4: document.getElementById('check3').checked,
                                            correctness4: correctness[3],
                                            check5: document.getElementById('check4').checked,
                                            Repaglinide: pill_detect['Repaglinide'],
                                            correctness5: correctness[4],
                                            reason5: reason[2],
                                            check6: document.getElementById('check5').checked,
                                            Transamin: pill_detect['Transamin'],
                                            correctness6: correctness[5],
                                            reason6: reason[3],
                                            check7: document.getElementById('check6').checked,
                                            correctness7: correctness[6],
                                            check8: document.getElementById('check7').checked,
                                            Bokey: pill_detect['Bokey'],
                                            correctness8: correctness[7],
                                            reason8: reason[4],
                                            check9: document.getElementById('check8').checked,
                                            Simvahexal: pill_detect['Zocor'],
                                            correctness9: correctness[8],
                                            reason9: reason[5],
                                            check10: document.getElementById('check9').checked,
                                            FLU: pill_detect['FLU'],
                                            correctness10: correctness[9],
                                            reason10: reason[6],
                                            uid: client_uid,
                                             });
        dan.push('Sheet-I', all_info);
        
        plusSlides(1);
        $("html, body").animate(
            {
              scrollTop: 0
            },
            500 // 回頂部時間為 500 毫秒
          );
        // setTimeout(() => { window.location.href = 'http://140.113.110.21:1526/show/index.html'; }, 1000);
        // 
      
    }
    else if(n === 4){
        console.log('analysis');
        currentSlide(5);
    }
    else{
        location.reload()
    }
}

function check_bt(f){
    if (f === 'barcode'){
        // dan.push('Barcode_I',[true]);
        // sleep(3000);
        output_patient_barcode_bt = output_patient_barcode_bt + 1;
    }
    else if(f === 'pill'){
        dan.push('Pill_Detect-I', [client_uid, true]);
        output_pill_bt = output_pill_bt + 1;
        $('.pill_hint')[0].innerText = 'waiting...';
    }
}