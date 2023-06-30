#后端服务器
import os
import time

from sanic import Sanic
from sanic import response
import json_tools
import tools
from dcrnn.lib import utils
import yaml
from dcrnn.model.pytorch.dcrnn_supervisor import DCRNNSupervisor
import torch
import csv

STGCN_MODEL_PATH = "models/stgcn_29.pth"
CONF_PATH = 'dcrnn\data\model\dcrnn_la.yaml'
CONF_PATH2 = 'dcrnn\data\model\pretrained\METR-LA\config.yaml'
DCRNN_MODEL_PATH = 'dcrnn\models\epo5.tar'
LOG_DIR = 'dcrnn\logs'

app = Sanic("SERVER")

#前端静态位置捆绑
app.static("/static/", "./static", content_type="text/javascript")
app.static("/", "index.html", content_type="text/html")
app.static("/old", "index_old.html", content_type="text/html")
app.static("/comparison", "model_comparison.html", content_type="text/html")
app.static("/icons/", "./icons", content_type="image/png")

@app.post("/stgcn")
async def stgcn(request):
    ana_data_start = time.clock()
    d = json_tools.json_analysis(request.body)#解析前端传来的json
    adj, X = tools.data_pretreat(d["A"], d["X"])#数据预处理
    ana_data_end = time.clock()
    print('stgcn模型数据解析共用时:{}'.format(ana_data_end - ana_data_start))

    model_build_start = time.clock()
    model = torch.load(STGCN_MODEL_PATH)
    model_build_end = time.clock()
    print('stgcn模型完成加载,共用时:{}'.format(model_build_end - model_build_start))

    model_work_start = time.clock()
    predict = model(adj, X)#将数据传入模型，进行预测
    print('stgcn predict shape : {}'.format(predict.shape))
    model_work_end = time.clock()
    print('stgcn模型完成预测,共用时:{}'.format(model_work_end - model_work_start))

    a = {}
    a["result"] = predict.tolist()#将预测结果写入json


    # f2 = open('1.csv','w')
    # for j in range(3):
    #     for i in range(207):
    #         if (i != 206):
    #             f2.write(str(a["result"][0][i][j]) + ',')
    #         else:
    #             f2.write(str(a["result"][0][i][j]) + '\n')



    return response.json(body=a)


@app.post("/dcrnn")
async def dcrnn(request):
    os.chdir(os.getcwd() + '\dcrnn')

    ana_data_start = time.clock()
    d = json_tools.json_analysis(request.body)#解析前端传来的json
    adj, X = tools.data_pretreat(d["A"], d["X"])#数据预处理
    X=tools.dcrnn_x_reshape(X)
    ana_data_end = time.clock()
    print('dcrnn模型数据解析共用时:{}'.format(ana_data_end - ana_data_start))

    model_build_start = time.clock()
    supervisor = DCRNNSupervisor(adj, **supervisor_config)
    model_build_end = time.clock()
    print('dcrnn模型完成加载,共用时:{}'.format(model_build_end - model_build_start))


    model_work_start = time.clock()
    predict =supervisor.predict(X)#将数据传入模型，进行预测
    predict = tools.dcrnn_predict_result_reshape(predict)
    print('dcrnn predict shape : {}'.format(predict.shape))
    model_work_end = time.clock()
    print('dcrnn模型完成预测,共用时:{}'.format(model_work_end - model_work_start))


    a = {}
    a["result"] = predict.tolist()#将预测结果写入json
    os.chdir('..')
    # f2 = open('2.csv', 'w')
    # for j in range(3):
    #     for i in range(207):
    #         if (i != 206):
    #             f2.write(str(a["result"][0][i][j]) + ',')
    #         else:
    #             f2.write(str(a["result"][0][i][j]) + '\n')
    return response.json(body=a)

if __name__ == "__main__":
    f = open(CONF_PATH, 'r')
    supervisor_config = yaml.load(f, Loader=yaml.FullLoader)
    model_kwargs = supervisor_config.get('model')
    # print(model_kwargs)
    log_level = supervisor_config.get('log_level', 'INFO')
    logger = utils.get_logger(LOG_DIR, __name__, 'info.log', level=log_level)




    app.run(host="127.0.0.1", port=8080)
