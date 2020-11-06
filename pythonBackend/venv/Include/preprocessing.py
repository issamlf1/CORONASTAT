import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import PCA
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler



urlTest = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\full-list-total-tests-for-covid-19.csv"
urlEtat = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\countries-aggregated.csv"

datasetTest = pd.read_csv(urlTest)
datasetEtat = pd.read_csv(urlEtat)


datasetTest = datasetTest[['Entity', 'Total tests']]
datasetTest = datasetTest.rename(columns={'Entity':'Country'})
datasetTest = datasetTest.groupby(['Country']).max()

datasetEtat = datasetEtat[['Country', 'Confirmed', 'Recovered', 'Deaths']]
datasetEtat = datasetEtat.groupby(['Country']).max()

data = pd.merge(datasetEtat, datasetTest, on='Country')
data = data.reset_index()
# print(data.isnull())
wcss = []
x = data.loc[:, ['Confirmed', 'Recovered', 'Deaths']].values
y = data.loc[:, ['Total tests']].values
x1 = StandardScaler().fit_transform(x)



kmeans = KMeans(n_clusters = 4, init = 'k-means++', random_state = 42)
y_kmeans = kmeans.fit_predict(x)

data = data.assign(cluster = y_kmeans+1)

country_cluster = data.loc[:, ['Country', 'cluster']].values

mean_clusters = pd.DataFrame(round(data.groupby('cluster').mean(), 1))

def clustering():
    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(x1)
    principalDataframe = pd.DataFrame(data = principalComponents, columns = ['PC1','PC2'])
    data = pd.merge(datasetEtat, datasetTest, on='Country')
    data = data.reset_index()



    targetDataframe = data[['Total tests']]
    newDataframe = pd.concat([principalDataframe, targetDataframe],axis = 1)
    lastData =newDataframe.assign(cluster = y_kmeans+1,country=data['Country'])
    dictdata = []
    for i in  range(len(lastData['country'].values)):
            dictdata.append({"x" :float(normalisation(lastData['PC1'].values[i])),"y" :float(normalisation(lastData['PC2'].values[i])),"country" :lastData['country'].values[i],"cluster" :int(lastData['cluster'].values[i])})
    return dictdata
# plt.scatter(principalDataframe.PC1, principalDataframe.PC2)
# plt.title('PC1 against PC2')
# plt.xlabel('PC1')
# plt.ylabel('PC2')
# data =data.assign(cluster = y_kmeans+1)
# fig = plt.figure(figsize = (8,8))
# ax = fig.add_subplot(1,1,1)
# ax.set_xlabel('PC1')
# ax.set_ylabel('PC2')
# ax.set_title('Plot of PC1 vs PC2', fontsize = 20)
# targets = [1,2,3,4]
# colors = ['red', 'green', 'blue','black']
# for target, color in zip(targets,colors):
#     indicesToKeep = data['cluster'] == target
#     ax.scatter(newDataframe.loc[indicesToKeep, 'PC1']
#                , newDataframe.loc[indicesToKeep, 'PC2']
#                , c = color
#                , s = 50)
# ax.grid()
# plt.show()
def normalisation(OldValue):
    OldRange = (7 +2)
    NewValue=0
    if (OldRange == 0):
        NewValue = NewMin
    else:
        NewRange = (30 - 5)
        NewValue = (((OldValue +2) * NewRange) / OldRange) + 5
    return NewValue

if __name__ == "__main__":
    print(clustering())