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

var client_uid = (Math.random() + 1).toString(36).substring(7) + (Math.random() + Math.random()).toString(36).substring(8);
console.log(client_uid);


 $(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var profile = {
		    'dm_name': 'Medication_Platform',          
			'idf_list':[Barcode_I, Pill_Detect_I, Search_I, Sheet_I],
			'odf_list':[Patient_O, Pill_Detect_Result_O, Search_Result_O],
		        'd_name': 'Medication_Platform_0',
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
                if (data[0] == client_uid){
                    $('.ODF_value')[0].innerText = data[1];
                }
                
            }
        }

        function Pill_Detect_Result_O(data){
            console.log('Patient_O', data);
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
                    // document.getElementById('Dilatrend 25mg/tab').item = data[0];
                    // document.getElementById('Requip F.C 0.25mg/tab').item = data[1];
                    // document.getElementById('Repaglinide 1mg/tab').item = data[2];
                    // document.getElementById('Transamin 250mg/tab').item = data[3];
                    // document.getElementById('Bokey 100mg/tab').item = data[4];
                    // document.getElementById('Simvahexal 20 mg/tab').item = data[5];
                    // document.getElementById('FLU-D (Fluconazole) 50mg/tab').item = data[6];
                    // document.getElementById('Dilantin').item = data[7];
                    // document.getElementById('Requip F.C 1 mg').item = data[8];
                    $('.pill_hint')[0].innerText = '★ 辨識完成請繼續執行下一步＾＿＾';
                    
                }
            
        }

        function Search_Result_O(data){
            console.log('Search_O', data, client_uid);
            
            if (data[0] == client_uid){
                var data_value = JSON.parse(data[1]);;
                if ( data_value['operation'] == 'level'){
                    console.log('search level');
                    
                    loading_text = document.getElementById('analysis_loading')
                    loading_text.style.display = "none";
                    pieChart_view = document.getElementById('PieChart')
                    pieChart_view.style.display = "block";
                    
                    pieChart.data.datasets[0].data = data_value['level'];
                    
                    pieChart.update();
                    
                }
                else if(data_value['operation'] == 'history'){
                    console.log('search history');
                    loading_text = document.getElementById('history_loading')
                    loading_text.style.display = "none";
                    lineChart_view = document.getElementById('LineChart')
                    lineChart_view.style.display = "block";
                    
                    lineChart.data.datasets[0].data = data_value['history_data'];
                    history_label = data_value['history_label'].map(x => x.substring(5, 13))
                    lineChart.data.labels = history_label;

                    lineChart.options.plugins.title.text = document.getElementById('history_v').value + "的歷史成績紀錄"
                    console.log(lineChart.options.plugins.title.text);
                    lineChart.update();
                    
                }
                else if(data_value['operation'] == 'time_total'){
                    console.log('search time');
                    loading_text = document.getElementById('time_loading')
                    loading_text.style.display = "none";
                    barChart_view = document.getElementById('BarChart')
                    barChart_view.style.display = "block";
                    
                    barChart.data.datasets[0].data = data_value['each_q_score'];
                    // history_label = data_value['history_label'].map(x => x.substring(5, 13))
                    // barChart.data.labels = history_label;

                    // barChart.options.plugins.title.text = document.getElementById('history_v').value + "的歷史成績紀錄"
                    // console.log(barChart.options.plugins.title.text);
                    barChart.update();
                    
                }
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
