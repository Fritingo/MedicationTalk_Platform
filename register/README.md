說明
----
此多執行序 Dummy Device 為供 IoTtalk v1 實驗用，
可設定 執行數量、封包大小、傳送頻率

安裝相關套件
----
```shell
pip install -r requirements.txt
```

基本用法
--------
```python
python DAI.py <your_v1_server_host>
```

進階用法
--------
同 `python DAI.py -h` 說明：

```shell
usage: DAI.py [-h] [-d mean variance] [-t mean variance] url [numbers]

url: IoTtalk server 的完整路徑，ex: http://iottalk_server_ip:9999
numbers:  generator 的數量，預設為1
-d mean variance: data 的長度，使用 gamma distribution，預設 mean = 1, variance = 1，此值並不等同於整個 payload 的長度
-t mean variance: 每筆之間的間隔(秒)，使用 gamma distribution，預設 mean = 0.2, variance = 0.04
```

範例： `python DAI.py http://127.0.0.1:9999 100 -d 50 10`
就會連線到 IoTtalk v1 主機 127.0.0.1 並產生 100 個 generator，data 長度的 mean 為 50 個 char，時間間隔的 mean 為 0.2 秒。

