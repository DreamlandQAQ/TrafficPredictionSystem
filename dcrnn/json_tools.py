#json文件处理
import json



#解析json
def json_analysis(jsonString):#j为json文件 分别为邻接矩阵207*207 特征矩阵1*207*12*2 经纬度207*2
    return json.loads(jsonString)


#def json_build(A,X): #A 207*207 X 207*2*1*34272



