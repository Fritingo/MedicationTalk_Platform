 $(function(){
        csmapi.set_endpoint ('https://1.iottalk.tw');
        var mac_addr = 'c3ad38d013c8';
        var profile = {
		    'dm_name': 'medical_feedback',          
            'idf_list':[save],
            'odf_list':[show],
            'd_name': 'medical_show_page_1',
        };

		function save(){
            console.log('save');
        }
        
        function show(data){
            var score = 0;
            var datas = JSON.parse(data[0]);
            console.log('pull: ', datas);
            
            var id_name = 'ID：' + datas['id'] + ' 姓名：' + datas['name'];
            $('.ODF_ID')[0].innerText= id_name;

            // 1
            var img1 = document.getElementById('paitent img');
            if (datas['barcode_r'] == 'no') 
            {
                score = score + 1;
                img1.src="pic/ok.jpg";
            }else{
                img1.src="pic/wrong.jpeg";
            } 

            paitent_r = '掃描結果：' + datas['barcode'] + ',   您判斷是否正確：' + datas['barcode_r'];
            document.getElementById('paitent r').innerHTML = paitent_r;

            // 2
            var img2 = document.getElementById('2 img');
            if (datas['Dilatrend25'] == 0 && datas['Dilantin'] == 0) 
            {
                score = score + 1;
                img2.src="pic/ok.jpg";
            }else{
                img2.src="pic/wrong.jpeg";
            } 

            r2 = '您給 Dilatrend 25mg/tab 的理由：' + datas['Dilatrend25_r'];
            document.getElementById('2 r').innerHTML = r2;
            
            r2r = '您不給 Dilatrend 25mg/tab 的理由：' + datas['Dilatrend25_r_no'];
            document.getElementById('2 r 2').innerHTML = r2r;

            // 3
            var img3 = document.getElementById('3 img');
            if (datas['Requip'] == 0 && datas['Requip1'] == 0) 
            {
                score = score + 1;
                img3.src="pic/ok.jpg";
            }else{
                img3.src="pic/wrong.jpeg";
            } 

            r3 = '您給 Requip F.C 0.25mg/tab 的理由：' + datas['Requip_r'];
            document.getElementById('3 r').innerHTML = r3;
            r3r = '您不給 Requip F.C 0.25mg/tab 的理由：' + datas['Requip_r_no'];
            document.getElementById('3 r 3').innerHTML = r3r;

            // 4
            var img4 = document.getElementById('4 img');
            img4.src="pic/undone.png";
            
            // 5
            var img5 = document.getElementById('5 img');
            if (datas['Repaglinide'] == 0) 
            {
                score = score + 1;
                img5.src="pic/ok.jpg";
            }else{
                img5.src="pic/wrong.jpeg";
            } 

            r5 = '您給 Repaglinide 1mg/tab 的理由：' + datas['Repaglinide_r'];
            document.getElementById('5 r').innerHTML = r5;
            r5r = '您不給 Repaglinide 1mg/tab 的理由：' + datas['Repaglinide_r_no'];
            document.getElementById('5 r 5').innerHTML = r5r;

            // 6
            var img6 = document.getElementById('6 img');
            if (datas['Transamin'] == 0) 
            {
                score = score + 1;
                img6.src="pic/ok.jpg";
            }else{
                img6.src="pic/wrong.jpeg";
            } 

            r6 = '您給 Transamin 250mg/tab 的理由：' + datas['Transamin_r'];
            document.getElementById('6 r').innerHTML = r6;
            r6r = '您不給 Transamin 250mg/tab 的理由：' + datas['Transamin_r_no'];
            document.getElementById('6 r 6').innerHTML = r6r;
           
            // 7 
            var img7 = document.getElementById('7 img');
            img7.src="pic/undone.png";

            // 8
            var img8 = document.getElementById('8 img');
            if (datas['Bokey'] == 1) 
            {
                score = score + 1;
                img8.src="pic/ok.jpg";
            }else{
                img8.src="pic/wrong.jpeg";
            } 

            r8 = '您給 Bokey 100mg/tab 的理由：' + datas['Bokey_r'];
            document.getElementById('8 r').innerHTML = r8;
            r8r = '您不給 Bokey 100mg/tab 的理由：' + datas['Bokey_r_no'];
            document.getElementById('8 r 8').innerHTML = r8r;

            // 9
            var img9 = document.getElementById('9 img');
            if (datas['Simvahexal'] == 1) 
            {
                score = score + 1;
                img9.src="pic/ok.jpg";
            }else{
                img9.src="pic/wrong.jpeg";
            } 

            r9 = '您給 Simvahexal 20 mg/tab 的理由：' + datas['Simvahexal_r'];
            document.getElementById('9 r').innerHTML = r9;
            r9r = '您不給 Simvahexal 20 mg/tab 的理由：' + datas['Simvahexal_r_no'];
            document.getElementById('9 r 9').innerHTML = r9r;

            // 10
            var img10 = document.getElementById('10 img');
            if (datas['FLU'] == 0) 
            {
                score = score + 1;
                img10.src="pic/ok.jpg";
            }else{
                img10.src="pic/wrong.jpeg";
            } 

            r10 = '您給 FLU-D (Fluconazole) 50mg/tab 的理由：' + datas['FLU_r'];
            document.getElementById('10 r').innerHTML = r10;
            r10r = '您不給 FLU-D (Fluconazole) 50mg/tab 的理由：' + datas['FLU_r_no'];
            document.getElementById('10 r 10').innerHTML = r10r;
         

            // score
            document.getElementById('score').innerHTML = score;
            if (score >= 7)
            {
                document.getElementById('review').innerHTML = '高等';
            }else if(score >= 4)
            {
                document.getElementById('review').innerHTML = '中等';
            }else
            {
                document.getElementById('review').innerHTML = '低等';
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
