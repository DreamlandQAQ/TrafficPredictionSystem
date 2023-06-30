from lib import utils
import yaml
import numpy as np
import tools
import json
from model.pytorch.dcrnn_supervisor import DCRNNSupervisor
import torch

import os



device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
CONF_PATH = 'data\model\dcrnn_la.yaml'
CONF_PATH2 = 'data\model\pretrained\METR-LA\config.yaml'
DCRNN_MODEL_PATH = 'models\epo1.tar'


json_file = open('stgcn2.json','r')
d = json.load(json_file)
adj, X = tools.data_pretreat(d["A"], d["X"]) #数据预处理


f=open(CONF_PATH,'r')
supervisor_config = yaml.load(f,Loader=yaml.FullLoader)
model_kwargs = supervisor_config.get('model')
#print(model_kwargs)
log_level = supervisor_config.get('log_level', 'INFO')
log_dir='test/log'
logger = utils.get_logger(log_dir, __name__, 'info.log', level=log_level)


adj = np.array(adj)

#dcrnn_model 要传的参数为12*32*414，其中414：每相邻的两个为一个节点的特征，比如0和1位置上的为节点0的两个特征
# dcrnn_model = DCRNNModel(adj,logger,**model_kwargs)
# print(dcrnn_model.state_dict())
# checkpoint = torch.load(DCRNN_MODEL_PATH, map_location='cpu')

#print(checkpoint)
#dcrnn_model.load_state_dict(checkpoint['model_state_dict'])

X_dcrnn = tools.dcrnn_x_reshape(X).to(device="cpu")


#output = dcrnn_model(X_dcrnn)




supervisor = DCRNNSupervisor(adj,**supervisor_config)
torch.save(supervisor.dcrnn_model,'models/dcrnn_1')

print(supervisor.predict(X_dcrnn).to(device="cpu"))