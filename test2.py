import json



def findnodes(d,q):
    print("节点{}".format(q))
    print("前12个时间片拥挤度：")
    for i in range(12):
        print(d["X"][0][q][i][0])
    print("后3个时间片拥挤度：")
    for i in range(3):
        print(d["reality"][q][i][0])


f = open("stgcn2.json","r")
s = f.read()
d = json.loads(s)
#1 207 12 2
# print(d["X"][0][30])
# print(d["reality"][30])
findnodes(d,30)
findnodes(d,105)
findnodes(d,106)
findnodes(d,32)
print(len(d["X"]))
print(len(d["X"][0]))
print(len(d["X"][0][0]))
print(len(d["X"][0][0][0]))


