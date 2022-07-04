#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Aug 17 14:25:22 2021

@author: annechen
"""


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats
from sklearn.decomposition import PCA
from sklearn import linear_model

data = pd.read_csv('middleSchoolData.csv')  

#Q1-3

#get C  D U columns
data1 = data[["applications","acceptances","school_size"]]

#removing rows in data1 containing missing values
data_clean = data1.dropna()
datanp_clean =np.array(data_clean)

a = datanp_clean[:,0]
B = datanp_clean[:,1]


corr = stats.pearsonr(a, B)[0]

data_clean.plot.scatter(x="applications", y="acceptances")

from simple_linear_regress_func import simple_linear_regress_func

datainput = datanp_clean[:,[0,1]]

output = simple_linear_regress_func(datainput)
rSqr = output[2]

m = output[0]
b = output[1]

y_hat = m * a + b
plt.plot(y_hat,B,'o',markersize=.75) # y_hat, income
plt.xlabel('Prediction from raw application number model') 
plt.ylabel('Actual acceptance')  
plt.title('R^2: {:.3f}'.format(rSqr)) 

#r^2 for rate
C = datanp_clean[:,0]/datanp_clean[:,2]
datainput2 = np.column_stack((C,B))
output2 = simple_linear_regress_func(datainput2)
rSqr2 = output2[2]

m2 = output2[0]
b2 = output2[1]

y_hat2 = m2 * C + b2
plt.plot(y_hat2,B,'o',markersize=.75) # y_hat, income
plt.xlabel('Prediction from application rate model') 
plt.ylabel('Actual acceptance')  
plt.title('R^2: {:.3f}'.format(rSqr2)) 
#odds
prob = datanp_clean[:,1]/datanp_clean[:,0]
odds = prob/(1-prob)
index = np.arange(592)
plt.scatter(odds,index)
plt.ylabel("index")
plt.xlabel("odds")

#Q4

clean = np.array(data.dropna())
cleaner = np.array(clean[:,2:],dtype=float)

cleanest1 = cleaner[:,9:15]
cleanest2 = cleaner[:,19:]
cleanest = np.column_stack((cleanest1,cleanest2))

r = np.corrcoef(cleanest,rowvar=False)
plt.imshow(r) 
plt.colorbar()

zscoredData1 = stats.zscore(cleanest1)
pca = PCA().fit(zscoredData1)
eigVals = pca.explained_variance_
loadings = pca.components_
rotatedData = pca.fit_transform(zscoredData1)
covarExplained = eigVals/sum(eigVals)*100

numClasses = 6
plt.bar(np.linspace(1,6,6),eigVals)
plt.xlabel('Principal component')
plt.ylabel('Eigenvalue')
plt.title('Student Perception')
plt.plot([0,numClasses],[1,1],color='red',linewidth=1)

zscoredData2 = stats.zscore(cleanest2)
pca = PCA().fit(zscoredData2)

eigVals = pca.explained_variance_

loadings2 = pca.components_
rotatedData = pca.fit_transform(zscoredData2)
covarExplained = eigVals/sum(eigVals)*100

numClasses = 3
plt.bar(np.linspace(1,3,3),eigVals)
plt.xlabel('Principal component')
plt.ylabel('Eigenvalue')
plt.title('Student Achievement')
plt.plot([0,numClasses],[1,1],color='red',linewidth=1)


x = zscoredData1[:,2]
y = zscoredData2[:,0]


plt.plot(x, y, 'o')

m, b = np.polyfit(x, y, 1)
corr = stats.pearsonr(x,y)[0]

plt.plot(x, m*x + b)

size = cleaner[:,3]
ach = cleaner[:,-3]
size_ = []
large=[]
small=[]
median = np.median(size)
i=0
for s in size:
    if s> median or s == median:
        size_.append(1)
        large.append(ach[i])
    else:
        size_.append(0)
        small.append(ach[i])
    i = i+1
plt.scatter(ach,size_)
plt.xlabel("achievement in test")
plt.ylabel("class size")

from scipy.stats import mannwhitneyu
stat, p = mannwhitneyu(small, large)

apply = cleaner[:,0]
acc = cleaner[:,1]
rate = acc/apply
spend = cleaner[:,2]
plt.scatter(size,rate)
plt.xlabel("class size")
plt.ylabel("acceptance rate")

median2 = np.median(spend)
i=0
rich=[]
poor=[]
for s in spend:
    if s> median2 or s == median2:
        
        rich.append(spend[i])
    else:
        poor.append(spend[i])
    i = i+1

stat, p = stats.kruskal(rich, poor,large,small)
print("stats=",stat,"pvalue=",p)


admi = np.array(data["acceptances"])
school = np.arange(594)
sorted_admi=np.sort(admi)[::-1]

plt.bar(school,sorted_admi)
plt.xlabel("index of school")
plt.ylabel("acceptance number")

su = np.sum(admi)
su_ = 0.9*su
sum_=0
s=0
for num in sorted_admi:
    if(sum_> su_ ):
        break
    elif(sum_==su_ ):
        break
    sum_+=num
    s+=1

from sklearn.cluster import KMeans

r = np.corrcoef(cleaner,rowvar=False)
plt.imshow(r) 
plt.colorbar()


cleaner = stats.zscore(cleaner)
# Run the PCA:
pca = PCA().fit(cleaner)

# eigValues: Vector of eigenvalues in decreasing order of magnitude
eigValues = pca.explained_variance_ 

# loadings: Weights per factor in terms of the original data. Where do the
# principal components point, in terms of the 6 predictors?
loadings = pca.components_ # sorted by explained_variance_

# rotated data: Simply the transformed data - we had 2000 students (rows) in
# terms of 6 predictors (columns), now we have 2000 students in terms of 6
# predictors ordered by decreasing eigenvalue
origDataNewCoordinates = pca.fit_transform(cleaner)

numPredictors = 22
plt.bar(np.linspace(1,numPredictors,numPredictors),eigValues)
plt.title('Scree plot')
plt.xlabel('Principal Components')
plt.ylabel('Eigenvalues')

from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_samples, silhouette_score

numClusters = 9 # how many clusters are we looping over? (from 2 to 10)
Q = np.empty([numClusters,1]) # init container to store sums
Q[:] = np.NaN # convert to NaN

X = np.transpose(np.array([origDataNewCoordinates[:,0],origDataNewCoordinates[:,1]]))


# Compute kMeans:
for ii in range(2, 11): # Loop through each cluster (from 2 to 10!)
    kMeans = KMeans(n_clusters = int(ii)).fit(X) # compute kmeans
    cId = kMeans.labels_ # vector of cluster IDs that the row belongs to
    cCoords = kMeans.cluster_centers_ # coordinate location for center of each cluster
    s = silhouette_samples(X,cId) # compute the mean silhouette coefficient of all samples
    Q[ii-2] = sum(s) # take sum
    # Plot data:

    plt.subplot(3,3,ii-1) 
    plt.hist(s,bins=20) 
    plt.xlim(-0.2,1)
    plt.ylim(0,500)
    plt.xlabel('Silhouette score')
    plt.ylabel('Count')
    plt.title('Sum: {}'.format(int(Q[ii-2]))) 

plt.plot(np.linspace(2,10,numClusters),Q)
plt.xlabel('Number of clusters')
plt.ylabel('Sum of silhouette scores')

kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
y_kmeans = kmeans.predict(X)

plt.scatter(X[:, 0], X[:, 1], c=y_kmeans, s=50, cmap='viridis')

centers = kmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='black', s=200, alpha=0.5);



        
