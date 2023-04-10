import time, random, requests
import DAN , os
import threading

#================iottalk===============
ServerURL = 'https://1.iottalk.tw'      #with non-secure connection
#ServerURL = 'https://DomainName' #with SSL connection
Reg_addr = 'Medication_Platform_3' #if None, Reg_addr = MAC address
DAN.profile['d_name'] = 'Medication_Platform_3'


DAN.device_registration_with_retry(ServerURL, Reg_addr)

while True:
    try:
        #IDF_data = random.uniform(1, 10)
        #DAN.push ('Dummy_Sensor', IDF_data) #Push data to an input device feature "Dummy_Sensor"

        #==================================
        pill_detect_check = DAN.pull('Pill_Detect_Result-O')#Pull data from an output device feature "Dummy_Control"
        print(pill_detect_check)
        
        

    except Exception as e:
        print(e)
        if str(e).find('mac_addr not found:') != -1:
            print('Reg_addr is not found. Try to re-register...')
            DAN.device_registration_with_retry(ServerURL, Reg_addr)
        else:
            print('Connection failed due to unknow reasons.')
            time.sleep(1)    

    time.sleep(0.2)