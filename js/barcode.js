function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            // Handle on success condition with the decoded message.
            console.log(`Scan result ${decodedText}`, decodedResult);
            $('.barcode_value')[0].innerText= decodedText;
            var img = document.getElementById('barcode_scanner');
            img.src="pic/ok1.jpeg";
            output_patient_barcode_bt = output_patient_barcode_bt+1;
            dan.push('Barcode-I',[document.getElementById('IDF_ID').value, decodedText]);
            // dan.push('Pill_Detect-I', [document.getElementById('IDF_ID').value, true]);
            // if (decodedText == '1234567890ABC'){
            //     $('.ODF_value')[0].innerText='陳志明(男) 出生年月日：52/9/27 病例號：11481701 身分證字號：A125152001';
            // }else{
            //     $('.ODF_value')[0].innerText='查無此病人資訊'
            // }

        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "reader", { fps: 10, qrbox: {width: 350, height: 150} });
    html5QrcodeScanner.render(onScanSuccess);
});

