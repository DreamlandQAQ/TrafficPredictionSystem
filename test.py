import json

f_d_5=open("dcrnn5.csv",'r')
d5=f_d_5.read().split(',')
f_d_10=open("dcrnn10.csv",'r')
d10=f_d_10.read().split(',')
f_d_15=open("dcrnn15.csv",'r')
d15=f_d_15.read().split(',')

f_r_5=open("reality5.csv",'r')
r5=f_r_5.read().split(',')
f_r_10=open("reality10.csv",'r')
r10=f_r_10.read().split(',')
f_r_15=open("reality15.csv",'r')
r15=f_r_15.read().split(',')

f_s_5=open("stgcn5.csv",'r')
s5=f_s_5.read().split(',')
f_s_10=open("stgcn10.csv",'r')
s10=f_s_10.read().split(',')
f_s_15=open("stgcn15.csv",'r')
s15=f_s_15.read().split(',')

a1=[]
a2=[]
b1=[]
b2=[]
c1=[]
c2=[]


for i in range(207):
    t1=abs(float(r5[i]) - float(s5[i]))
    t2 = abs(float(r10[i]) - float(s10[i]))
    t3 = abs(float(r15[i]) - float(s15[i]))

    t4 = abs(float(r5[i]) - float(d5[i]))
    t5 = abs(float(r10[i]) - float(d10[i]))
    t6 = abs(float(r15[i]) - float(d15[i]))

    a1.append(t1)
    a2.append(t2)
    b1.append(t3)
    b2.append(t4)
    c1.append(t5)
    c2.append(t6)

f1=open("5min_abs.csv","w")
f2=open("10min_abs.csv","w")
f3=open("15min_abs.csv","w")
for i in range(207):
    if(i != 206):
        f1.write(str(a1[i])+',')
    else:
        f1.write(str(a1[i]) + '\n')
for i in range(207):
    if(i != 206):
        f1.write(str(a2[i])+',')
    else:
        f1.write(str(a2[i]) + '\n')
##
for i in range(207):
    if(i != 206):
        f2.write(str(b1[i])+',')
    else:
        f2.write(str(b1[i]) + '\n')
for i in range(207):
    if(i != 206):
        f2.write(str(b2[i])+',')
    else:
        f2.write(str(b2[i]) + '\n')
##
for i in range(207):
    if(i != 206):
        f3.write(str(c1[i])+',')
    else:
        f3.write(str(c1[i]) + '\n')
for i in range(207):
    if(i != 206):
        f3.write(str(c2[i])+',')
    else:
        f3.write(str(c2[i]) + '\n')