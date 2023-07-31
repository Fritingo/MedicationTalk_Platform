// 接收 IoTtalk 資訊處理

var output_patient_barcode_bt = 0;
var output_pill_bt = 0;
var pill_detect = { 'Dilatrend': -1,
                    'Dilantin': -1,
                    'Requip': -1,
                    'Requip1': -1,
                    'Repaglinide': -1,
                    'Transamin': -1,
                    'Bokey': -1,
                    'Zocor': -1,
                    'FLU': -1,};

var syringe_value = {"AMIKACIN INJECTION 250MG/ML 'TAI YU'": -1,
                        "AMPOLIN INJECTION 500MG": -1,
                        "CEFAZOLIN INJECTION 1GM 'C.C.P.'": -1,
                        "CLEXANE INJECTION": -1,
                        "CORDARONE INJECTION": -1,
                        "Heparin Sodium Injection 5000 IU/ml 'Tai Yu'": -1,
                        "MILLISROL INJECTION": -1,
                        "Oxacillin Powder for Injection 'CYH'": -1,
                        "Progesterone Injection 'Chi Sheng'": -1,
                        "ROLIKAN INJECTION (SODIUM BICARBONATE)": -1,
                        "SODIUM BICARBONATE INJECTION 'CHI SHENG'": -1,
                        "Sirolac IV Injection 30 mg/ml 'ASTAR'": -1,};
var patient_barcode = '1234567890ABC'
var cognition = []

var client_uid = (Math.random() + 1).toString(36).substring(7) + (Math.random() + Math.random()).toString(36).substring(8);
console.log(client_uid);




$(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var profile = {
		    'dm_name': 'Medication',          
			'idf_list':[Barcode_I, Pill_Detect_I, Syringe_I],
			'odf_list':[Barcode_Result_O, Pill_Detect_Result_O, Syringe_Result_O],
		    'd_name': 'Platform_v2',
		    // 'd_name': 'Platform_Demo_anna',
        };

		// idf
        function Barcode_I(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function Pill_Detect_I(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function Syringe_I(data){
        // $('.ODF_value')[0].innerText=data[0];
        }

        // odf
        function Barcode_Result_O(data){
            console.log('Barcode_Result_O', data);
            if (data[0] == client_uid){
                var data_value = JSON.parse(data[1]);
                console.log(data_value);
                $.getJSON('https://fritingo.ddns.net/api/_patient', {
                barcode: data_value['barcode']
                }, function(data) {
                console.log(data);
                // var resp = JSON.parse(data)
                $('.ODF_value')[0].innerText = data['info'];
                var img = document.getElementById('barcode_scanner');
                img.src="pic/ok1.jpeg";
                $('.patient_barcode_hint')[0].innerText = "★ 辨識完成請繼續執行下一步＾＿＾";
             });
                // if (data_value['patient_info']){
                //     $('.ODF_value')[0].innerText = data_value['patient_info'];
                //     var img = document.getElementById('barcode_scanner');
                //     img.src="pic/ok1.jpeg";
                //     $('.patient_barcode_hint')[0].innerText = "★ 辨識完成請繼續執行下一步＾＿＾";
                // }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    
                // else if (data_value['medicine_info']){
                //     data_value = JSON.parse(data[1]);
                //     medicines[medicine_keys[document.getElementsByName("verification_button_id").value]]['verification'] = data_value['medicine_info'][0];
                //     createtbl(); 
                //     JumpToPage(0); 
                // }
            }
            
        }

        function Pill_Detect_Result_O(data){
            
            if (output_pill_bt > 0 && data[0] == client_uid){
                    var img = document.getElementById('pill_odf');
                    img.src="pic/ok1.jpeg";

                    pill_detect['Dilatrend'] = data[1];
                    pill_detect['Dilantin'] = data[8];
                    pill_detect['Requip'] = data[2];
                    pill_detect['Requip1'] = data[9];
                    pill_detect['Repaglinide'] = data[3];
                    pill_detect['Transamin'] = data[4];
                    pill_detect['Bokey'] = data[5];
                    pill_detect['Zocor'] = data[6];
                    pill_detect['FLU'] = data[7];
                    $('.pill_hint')[0].innerText = '★ 辨識完成請繼續執行下一步＾＿＾';

                    syringe_block = document.getElementById('syringe block');
                    syringe_block.style.display = "block";

                }
            
        }

        function Syringe_Result_O(data){
            console.log('Syringe_Result_O', data);
            console.log('Syringe_Result_O', data[2]);
            if(data[0] == client_uid){
                medicines[medicine_keys[document.getElementsByName("injection_button_id").value]]['injection'] += data[2];
                createtbl();
                JumpToPage(0);
            }
        }

        



        
      
/*******************************************************************/                
        function ida_init(){
	    console.log(profile.d_name);
	}
        var ida = {
            'ida_init': ida_init,
        }; 
        dai(profile,ida);     
});