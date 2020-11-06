import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns

urlAge = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\population_by_country_2020.csv"
urlEtat = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\countries-aggregated.csv"

datasetEtat = pd.read_csv(urlEtat)
datasetEtat = datasetEtat[['Country', 'Confirmed', 'Recovered', 'Deaths']]
datasetEtat = datasetEtat.groupby(['Country']).max()

datasetAge = pd.read_csv(urlAge)
datasetAge = datasetAge[['Country (or dependency)', 'Med. Age']

datasetAge = datasetAge.rename(columns={'Country (or dependency)':'Country', 'Med. Age': 'AverageAge'})
print("++++++++++++++")
print(datasetAge.loc[:,'AverageAge'].values)
datasetAge = datasetAge[datasetAge.AverageAge.apply(lambda x: x.isnumeric())]
print("*******")
datasetAge[['AverageAge']] = datasetAge[['AverageAge']].apply(pd.to_numeric)
print(datasetAge.loc[:,'AverageAge'].values)
data = pd.merge(datasetAge, datasetEtat, on='Country')

print(data.columns)

wcss = []

x = data.loc[:, ['AverageAge', 'Confirmed', 'Recovered', 'Deaths']].values

for i in range(1, 15):
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    kmeans.fit(x)
    wcss.append(kmeans.inertia_)
plt.figure(figsize=(10,5))
sns.lineplot(range(1, 15), wcss, marker='o', color='red')
plt.title('elbow methode')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show() ##### 5

kmeans = KMeans(n_clusters = 5, init = 'k-means++', random_state = 42)
y_kmeans = kmeans.fit_predict(x)
print(y_kmeans)
data = data.assign(cluster = y_kmeans+1)


# country_cluster = data.loc[:, ['Country', 'cluster']].values

# print(data.columns)
# print(data.loc[:, 'AverageAge'].values)
mean_clusters = pd.DataFrame(round(data.groupby('cluster').mean(), 1))
print(mean_clusters)
