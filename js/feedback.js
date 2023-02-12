// $(function(){

// })


function feedback(){
    var score = 0;
    
    var id_name = 'ID：' + document.getElementById('IDF_ID').value + ' 姓名：' + document.getElementById('IDF_name').value;
    $('.ODF_ID')[0].innerText= id_name;

    // 1
    const radios = document.getElementsByName('barcode');
    var img1 = document.getElementById('1 img');
    
    if (radios[1].checked){
        score = score + 1;
        img1.src="pic/ok_w.png";
        paitent_r = '掃描結果：' + $('.ODF_value')[0].innerText + ',   您判斷是否正確： Yes';
    }else{
        img1.src="pic/wrong_w.png";
        paitent_r = '掃描結果：' + $('.ODF_value')[0].innerText + ',   您判斷是否正確： No';
    }
    
    document.getElementById('paitent r').innerHTML = paitent_r;


    // 2
    var img2 = document.getElementById('2 img');
    // if (datas['Dilatrend25'] == 0 && datas['Dilantin'] == 0) 
    if (!document.getElementById('check1').checked){
        score = score + 1;
        img2.src="pic/ok_w.png";
        r2r = '您不給 Dilatrend 25mg/tab 的理由：' + document.getElementById('Dilatrend 25mg/tab r no').value;
        document.getElementById('2 r 2').innerHTML = r2r;
    }else{
        img2.src="pic/wrong_w.png";
        r2 = '您給 Dilatrend 25mg/tab 的理由：' + document.getElementById('Dilatrend 25mg/tab r').value;
        document.getElementById('2 r').innerHTML = r2;
    }

    
    // 3
    var img3 = document.getElementById('3 img');
     
    if (!document.getElementById('check2').checked){
        score = score + 1;
        img3.src="pic/ok_w.png";
        r3r = '您不給 Requip F.C 0.25mg/tab 的理由：' + document.getElementById('Requip F.C 0.25mg/tab r no').value;
        document.getElementById('3 r 3').innerHTML = r3r;

    }else{
        img3.src="pic/wrong_w.png";
        r3 = '您給 Requip F.C 0.25mg/tab 的理由：' + document.getElementById('Requip F.C 0.25mg/tab r').value;
        document.getElementById('3 r').innerHTML = r3;
    }


    // 4
    var img4 = document.getElementById('4 img');
    img4.src="pic/undone.png";


    // 5
    var img5 = document.getElementById('5 img');
    
    if (!document.getElementById('check4').checked){
        score = score + 1;
        img5.src="pic/ok_w.png";
        r5r = '您不給 Repaglinide 1mg/tab 的理由：' + document.getElementById('Repaglinide 1mg/tab r no').value;
        document.getElementById('5 r 5').innerHTML = r5r;

    }else{
        img5.src="pic/wrong_w.png";
        r5 = '您給 Repaglinide 1mg/tab 的理由：' + document.getElementById('Repaglinide 1mg/tab r').value;
        document.getElementById('5 r').innerHTML = r5;
    }


    // 6
    var img6 = document.getElementById('6 img');
    
    if (!document.getElementById('check5').checked){
        score = score + 1;
        img6.src="pic/ok_w.png";
        r6r = '您不給 Transamin 250mg/tab 的理由：' + document.getElementById('Transamin 250mg/tab r no').value;
        document.getElementById('6 r 6').innerHTML = r6r;

    }else{
        img6.src="pic/wrong_w.png";
        r6 = '您給 Transamin 250mg/tab 的理由：' + document.getElementById('Transamin 250mg/tab r').value;
        document.getElementById('6 r').innerHTML = r6;
    }


    // 7 
    var img7 = document.getElementById('7 img');
    img7.src="pic/undone.png";


    // 8
    var img8 = document.getElementById('8 img');
    
    if (document.getElementById('check7').checked){
        score = score + 1;
        img8.src="pic/ok_w.png";
        r8 = '您給 Bokey 100mg/tab 的理由：' + document.getElementById('Bokey 100mg/tab r').value;
        document.getElementById('8 r').innerHTML = r8;
        
    }else{
        img8.src="pic/wrong_w.png";
        r8r = '您不給 Bokey 100mg/tab 的理由：' + document.getElementById('Bokey 100mg/tab r no').value;
        document.getElementById('8 r 8').innerHTML = r8r;

    }


    // 9
    var img9 = document.getElementById('9 img');
    
    if (document.getElementById('check8').checked){
        score = score + 1;
        img9.src="pic/ok_w.png";
        r9 = '您給 Simvahexal 20 mg/tab 的理由：' + document.getElementById('Simvahexal 20 mg/tab r').value;
        document.getElementById('9 r').innerHTML = r9;
        
    }else{
        img9.src="pic/wrong_w.png";
        r9r = '您不給 Simvahexal 20 mg/tab 的理由：' + document.getElementById('Simvahexal 20 mg/tab r no').value;
        document.getElementById('9 r 9').innerHTML = r9r;

    }


    // 9
    var img10 = document.getElementById('10 img');
    
    if (!document.getElementById('check9').checked){
        score = score + 1;
        img10.src="pic/ok_w.png";
        r10r = '您不給 FLU-D (Fluconazole) 50mg/tab 的理由：' + document.getElementById('FLU-D (Fluconazole) 50mg/tab r no').value;
        document.getElementById('10 r 10').innerHTML = r10r;
    }else{
        img10.src="pic/wrong_w.png";
        r10 = '您給 FLU-D (Fluconazole) 50mg/tab 的理由：' + document.getElementById('FLU-D (Fluconazole) 50mg/tab r').value;
        document.getElementById('10 r').innerHTML = r10;
    
    }

}   