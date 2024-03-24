from flask import Flask, request, jsonify
import pickle
import xgboost as xgb
import pandas as pd
# from typing import Final 
# from telegram import Bot, Update
# from telegram.ext import Application,CommandHandler, MessageHandler, filters, ContextTypes
import requests

from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app, support_credentials=True)
samples=pd.read_csv("./merged.csv")



def telegram_notifier(message = "Maintainence needed"):
    TOKEN = ""
    CHAT_ID = ""
    url = f"https://api.telegram.org/bot{TOKEN}/sendMessage?chat_id={CHAT_ID}&text={message}"
    res2 = requests.post(url)
    # print(res2)

    
    # app = PyTgCalls(TOKEN)
    # app.start()
    # app.join_group_call(
    #     CHAT_ID,
    #     MediaStream(
    #         'http://docs.evostream.com/sample_content/assets/sintel1m720p.mp4',
    #     )
    # )
    # idle()


ans=[]
for i in range(len(samples)):
    ans.append(samples.iloc[i].tolist())


with open("xgb.pkl","rb") as file:
    model=pickle.load(file)
@app.route('/predict', methods=['GET','POST'])
def calculate():
    global time,ans
    # Check if the request contains JSON data
    if not request.is_json:
        try:
            # Get the array of numbers from the request JSON data
            time+=1
            # print("time is:",time)
            
            numbers=ans[time]
            numbers2=ans[time]
            # print("number  is:",numbers)
            # print("number 2 is:",numbers2)
            numbers = pd.DataFrame([numbers], columns=['engine_no', 'op_setting_1', 'op_setting_2', 'op_setting_3', 'sensor_1',
       'sensor_2', 'sensor_3', 'sensor_4', 'sensor_5', 'sensor_6', 'sensor_7',
       'sensor_8', 'sensor_9', 'sensor_10', 'sensor_11', 'sensor_12',
       'sensor_13', 'sensor_14', 'sensor_15', 'sensor_16', 'sensor_17',
       'sensor_18', 'sensor_19', 'sensor_20', 'sensor_21'])
            
            pred=model.predict(numbers)    
            print("pres is: ",pred)  
            ans1=pred[0]
            # ans1=2
            if ans1<0:
                ans1=0
            if ans1<0.4:
                telegram_notifier("Quick maintainence needed")
                
                
            return jsonify({'rul':str(round(ans1*144,0)),'s_data':numbers2,'time':time}), 200
        except KeyError:
            return jsonify({'error': 'Invalid JSON data. Please provide an array of numbers in the "numbers" field.'}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Request data must be in JSON format.'}), 400

@app.route('/getsensor',methods=['GET', 'POST'])
def get_sensor_data():
    global time
    time+=1
    return jsonify({'s_data':ans[time]}), 200
if __name__ == '__main__':
    time=0
    app.run(debug=True)
