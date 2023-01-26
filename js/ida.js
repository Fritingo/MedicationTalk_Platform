var output_patient_barcode_bt = 0;
var output_pill_bt = 0;

 $(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var profile = {
		    'dm_name': 'medical_control',          
			'idf_list':[confirm, patient_barcode, pill_detect],
			'odf_list':[output_patient_barcode, output_pill],
		        'd_name': 'medical_control_page_1',
        };

		
        function confirm(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function patient_barcode(data){
            // $('.ODF_value')[0].innerText=data[0];
         }

        function pill_detect(data){
            // $('.ODF_value')[0].innerText=data[0];
        }

        
        function output_patient_barcode(data){
            // if (output_patient_barcode_bt > 0){
            //     var img = document.getElementById('bar_odf');
            //     img.src="pic/ok1.jpeg";
            //     if (data[0] == '1234567890ABC')
            //     {
            //         $('.ODF_value')[0].innerText='陳志明(男) 出生年月日：52/9/27 病例號：11481701 身分證字號：A125152001';
            //     }else{

            //         $('.ODF_value')[0].innerText=data[0];
            //     }
            // }
            
        }

        function output_pill(data){
            
            if (output_pill_bt > 0){
                var img = document.getElementById('pill_odf');
                img.src="pic/ok1.jpeg";
                document.getElementById('Dilatrend 25mg/tab').item = data[0];
                document.getElementById('Requip F.C 0.25mg/tab').item = data[1];
                document.getElementById('Repaglinide 1mg/tab').item = data[2];
                document.getElementById('Transamin 250mg/tab').item = data[3];
                document.getElementById('Bokey 100mg/tab').item = data[4];
                document.getElementById('Simvahexal 20 mg/tab').item = data[5];
                document.getElementById('FLU-D (Fluconazole) 50mg/tab').item = data[6];
                document.getElementById('Dilantin').item = data[7];
                document.getElementById('Requip F.C 1 mg').item = data[8];
                $('.pill_hint')[0].innerText = '★ 請將你有放入的藥丸填入放的原因，反之填入沒放的原因';
                // document.getElementById('Requip F.C 1 mg').textContent = data[8];
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
