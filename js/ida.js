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

var client_uid = (Math.random() + 1).toString(36).substring(7) + (Math.random() + Math.random()).toString(36).substring(8);
console.log(client_uid);




 $(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var profile = {
		    'dm_name': 'Medication_Platform',          
			'idf_list':[Barcode_I, Pill_Detect_I, Search_I, Sheet_I],
			'odf_list':[Patient_O, Pill_Detect_Result_O, Search_Result_O, Syringe_O],
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
                    $('.pill_hint')[0].innerText = '★ 辨識完成請繼續執行下一步＾＿＾';

                    syringe_block = document.getElementById('syringe block')
                    syringe_block.style.display = "block";

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

        function Syringe_O(data){
            var syringe_raw = JSON.parse(data[0]);
            console.log(syringe_raw['UID'],syringe_raw);
            if (syringe_raw['UID'] == client_uid){
                console.log(syringe_raw["AMIKACIN INJECTION 250MG/ML 'TAI YU'"]);
                syringe_value["AMIKACIN INJECTION 250MG/ML 'TAI YU'"] = syringe_raw["AMIKACIN INJECTION 250MG/ML 'TAI YU'"];
                syringe_value["AMPOLIN INJECTION 500MG"] = syringe_raw["AMPOLIN INJECTION 500MG"];
                syringe_value["CEFAZOLIN INJECTION 1GM 'C.C.P.'"] = syringe_raw["CEFAZOLIN INJECTION 1GM 'C.C.P.'"];
                syringe_value["CLEXANE INJECTION"] = syringe_raw["CLEXANE INJECTION"];
                syringe_value[ "CORDARONE INJECTION"] = syringe_raw[ "CORDARONE INJECTION"];
                syringe_value[ "Heparin Sodium Injection 5000 IU/ml 'Tai Yu'"] = syringe_raw[ "Heparin Sodium Injection 5000 IU/ml 'Tai Yu'"];
                syringe_value["MILLISROL INJECTION"] = syringe_raw["MILLISROL INJECTION"];
                syringe_value["Oxacillin Powder for Injection 'CYH'"] = syringe_raw["Oxacillin Powder for Injection 'CYH'"];
                syringe_value["Progesterone Injection 'Chi Sheng'"] = syringe_raw["Progesterone Injection 'Chi Sheng'"];
                syringe_value["ROLIKAN INJECTION (SODIUM BICARBONATE)"] = syringe_raw["ROLIKAN INJECTION (SODIUM BICARBONATE)"];
                syringe_value["SODIUM BICARBONATE INJECTION 'CHI SHENG'"] = syringe_raw["SODIUM BICARBONATE INJECTION 'CHI SHENG'"];
                syringe_value["Sirolac IV Injection 30 mg/ml 'ASTAR'"] = syringe_raw["Sirolac IV Injection 30 mg/ml 'ASTAR'"];
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