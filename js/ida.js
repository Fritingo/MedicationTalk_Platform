var output_patient_barcode_bt = 0;
var output_pill_bt = 0;
var pill_detect = { 'Dilatrend':'none',
                    'Dilantin':'none',
                    'Requip':'none',
                    'Requip1':'none',
                    'Repaglinide':'none',
                    'Transamin':'none',
                    'Bokey':'none',
                    'Zocor':'none',
                    'FLU':'none',};


 $(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var profile = {
		    'dm_name': 'Medication_Platform',          
			'idf_list':[Barcode_I, Pill_Detect_I, Search_I, Sheet_I],
			'odf_list':[Patient_O, Pill_Detect_Result_O, Search_Result_O],
		        'd_name': 'medical_control_page_1',
        };

		// idf
        function Barcode_I(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function Pill_Detect_I(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function Search_I(data){
            // $('.ODF_value')[0].innerText=data[0];
        }

        function Sheet_I(data){
            // $('.ODF_value')[0].innerText=data[0];
        }

        // odf
        function Patient_O(data){
            console.log('Patient_O', data);
            if (output_patient_barcode_bt != 0){
                if (data[0] == document.getElementById('IDF_ID').value){
                    $('.ODF_value')[0].innerText = data[1];
                }
                
            }
        }

        function Pill_Detect_Result_O(data){
            console.log('Patient_O', data);
            if (output_pill_bt > 0 && data[0] == document.getElementById('IDF_ID').value){
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
                    // document.getElementById('Dilatrend 25mg/tab').item = data[0];
                    // document.getElementById('Requip F.C 0.25mg/tab').item = data[1];
                    // document.getElementById('Repaglinide 1mg/tab').item = data[2];
                    // document.getElementById('Transamin 250mg/tab').item = data[3];
                    // document.getElementById('Bokey 100mg/tab').item = data[4];
                    // document.getElementById('Simvahexal 20 mg/tab').item = data[5];
                    // document.getElementById('FLU-D (Fluconazole) 50mg/tab').item = data[6];
                    // document.getElementById('Dilantin').item = data[7];
                    // document.getElementById('Requip F.C 1 mg').item = data[8];
                    $('.pill_hint')[0].innerText = '★ 請將你有放入的藥丸填入放的原因，反之填入沒放的原因';
                    
                }
            
        }

        function Search_Result_O(data){
            console.log('Patient_O', data);
            
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
