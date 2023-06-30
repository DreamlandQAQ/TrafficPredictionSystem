import json
import json_tools
import numpy as np
from utils import generate_dataset, load_metr_la_data, get_normalized_adj
import torch

#数据预处理
def data_pretreat(A,X):
    adj = []

    # adj初始化大小为207*207
    for i in range(207):
        t = []
        for j in range(207):
            t.append(0)
        adj.append(t)

    for i in range(len(A)):
        for j in range(len(A[0])):
            adj[i][j]=A[i][j]
    adj = np.array(adj)
    adj = get_normalized_adj(adj)
    adj = torch.from_numpy(adj)
    adj = adj.to(torch.float32)

    X = np.array(X)
    X = X.reshape(1,X.size)
    while(X.size < 1*207*12*2):
        X=np.append(X,0)

    X = X.reshape(1, 207, 12, 2)

    X = torch.from_numpy(X)
    X = X.to(torch.float32)
    return adj,X


#传入1 207 12 2
#传出12 1 414 类型为torch.Tensor
def dcrnn_x_reshape(X):
    X_dcrnn = []

    for timecut_num in range(12):
        for node_num in range(207):
            X_dcrnn.append(X[0][node_num][timecut_num][0])
            X_dcrnn.append(X[0][node_num][timecut_num][1])
    X_dcrnn = np.array(X_dcrnn)
    X_dcrnn = X_dcrnn.reshape(12,1,414)

    X_dcrnn = torch.from_numpy(X_dcrnn)
    X_dcrnn = X_dcrnn.to(torch.float32)
    return X_dcrnn