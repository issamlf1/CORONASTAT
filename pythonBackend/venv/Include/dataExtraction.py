import pandas as pd
from bs4 import BeautifulSoup as soup
from urllib.request import urlopen, Request
from flask import jsonify
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import numpy as np
#change the url
url = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\countries-aggregated.csv"
urlAge = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\population_by_country_2020.csv"
urlTest = r"C:\Users\lanfouf\Desktop\issamLanfouf\projetMachineLearning\Data\full-list-total-tests-for-covid-19.csv"

dataset = pd.read_csv(url)
datasetAge = pd.read_csv(urlAge)
datasetTest = pd.read_csv(urlTest)

# typeofdata : Confirmed, Recovered, Deaths
def getData(typeofdata ,countryName):#
    data = dataset[['Country', typeofdata]]
    data = data.groupby('Country')
    array = data.get_group(countryName)[typeofdata].values
    return array
def getMaxOfAll(country):
    data = dataset[['Country', 'Confirmed', 'Recovered', 'Deaths']]
    data = data.groupby(['Country']).max()
    print(data.loc[country])
    data = data.loc[country].values
    print(data)
    return data
def getNewData(country):
    url = "https://www.worldometers.info/coronavirus/country/"+country
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    page_byte = urlopen(req).read()
    webpage = page_byte.decode('utf-8')
    page_soupe = soup(webpage, "html.parser")
    containers = page_soupe.findAll("div", {"class": "maincounter-number"})
    container2 = page_soupe.find("div",{"class":"content-inner"})
    lastUpdate = container2.find("div",{"style":"font-size:13px; color:#999; text-align:center"}).text
    data = []
    data1 = []
    data2 = []
    for i in range(0, 3):
        data.append(containers[i].span.text)
    for i in range(3):
        data1.append(data[i].strip())

    for i in range(0, 3):
        data2.append(data1[i].replace(",", "."))

    return data2, lastUpdate
def getRegionsData():
    cityName = []
    affectedNumbers = []
    somme = 0
    lastUpdate = ""
    url = "https://m.le360.ma/covidmaroc/"

    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    page_byte = urlopen(req).read()
    webpage = page_byte.decode('utf-8')
    page_soupe = soup(webpage, "html.parser")
    containers = page_soupe.findAll("tbody")
    getTr = containers[0].findAll("tr")

    for i in range(0, len(getTr)):
        cityName.append(getTr[i].find("td", {"class": "font-weight-bold"}).text.replace("\u200b\u200b","").replace("é","e").replace("è","e").replace("â","a").replace("\u200b",""))
        affectedNumbers.append(getTr[i].find("td", {"align": "center"}).text)
        somme = somme + int(affectedNumbers[i])
    lastUpdate = page_soupe.find("small", {"class": "d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"}).text.replace("              Dernière vérification","Last update").replace("à","at").replace("\n","")
    return cityName, affectedNumbers, lastUpdate, somme

def getStatistiqueMonde():
    url = "https://www.worldometers.info/coronavirus"
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    page_byte = urlopen(req).read()
    webpage = page_byte.decode('utf-8')
    page_soupe = soup(webpage, "html.parser")
    containers = page_soupe.findAll("div", {"class": "maincounter-number"})
    data = []
    data1 = []
    data2 = []
    for i in range(0, 3):
        data.append(containers[i].span.text)
    for i in range(3):
        data1.append(data[i].strip())

    for i in range(0, 3):
        data2.append(data1[i].replace(",", "."))
    print(data2)
    return data2
def getDataClusterAge():
    datasetLocal = dataset[['Country', 'Confirmed', 'Recovered', 'Deaths']]
    datasetLocal = datasetLocal[['Country', 'Confirmed', 'Recovered', 'Deaths']]
    datasetLocal = datasetLocal.groupby(['Country']).max()
    datasetAgeLocal = datasetAge[['Country (or dependency)', 'Med. Age']]
    datasetAgeLocal = datasetAgeLocal.rename(columns={'Country (or dependency)': 'Country', 'Med. Age': 'AverageAge'})
    datasetAgeLocal = datasetAgeLocal[datasetAgeLocal.AverageAge.apply(lambda x: x.isnumeric())]
    datasetAgeLocal[['AverageAge']] = datasetAgeLocal[['AverageAge']].apply(pd.to_numeric)
    data = pd.merge(datasetAgeLocal, datasetLocal, on='Country')
    x = data.loc[:, ['AverageAge', 'Confirmed', 'Recovered', 'Deaths']].values
    x = StandardScaler().fit_transform(x)
    pca = PCA(n_components=2)
    np.set_printoptions(suppress=True)
    x = pca.fit_transform(x)
    kmeans = KMeans(n_clusters=5, init='k-means++', random_state=42)
    y_kmeans = kmeans.fit_predict(x)
    data = data.assign(cluster=y_kmeans + 1)
    principalDataframe = pd.DataFrame(data=x, columns=['PC1', 'PC2'])
    principalDataframe = principalDataframe.assign(cluster=y_kmeans + 1)
    mean_clusters = pd.DataFrame(round(data.groupby('cluster').mean(), 1))
    countries = data.loc[:,"Country"].values
    normilised = principalDataframe.values
    for i in range(len(principalDataframe.values)):
        for j in range(2):
            normilised[i][j] = normalisationAge(principalDataframe.values[i][j])
    normilised = pd.DataFrame(data=normilised, columns=['PC1', 'PC2','cluster'])
    return countries, normilised.loc[:,'PC1'].values,normilised.loc[:,'PC2'].values,normilised.loc[:,'cluster'].values, mean_clusters.values
def getDataClusterTest():
    datasetTestLocal = datasetTest[['Entity', 'Total tests']]
    datasetTestLocal = datasetTestLocal.rename(columns={'Entity': 'Country'})
    datasetTestLocal = datasetTestLocal.groupby(['Country']).max()
    datasetLocal = dataset[['Country', 'Confirmed', 'Recovered', 'Deaths']]
    datasetLocal = datasetLocal.groupby(['Country']).max()
    data = pd.merge(datasetLocal, datasetTestLocal, on='Country')
    data = data.reset_index()
    x = data.loc[:, ['Confirmed', 'Recovered', 'Deaths', 'Total tests']].values
    x = StandardScaler().fit_transform(x)
    pca = PCA(n_components=2)
    np.set_printoptions(suppress=True)
    x = pca.fit_transform(x)
    kmeans = KMeans(n_clusters=4, init='k-means++', random_state=42)
    y_kmeans = kmeans.fit_predict(x)
    data = data.assign(cluster=y_kmeans + 1)
    principalDataframe = pd.DataFrame(data=x, columns=['PC1', 'PC2'])
    principalDataframe = principalDataframe.assign(cluster=y_kmeans + 1)
    mean_clusters = pd.DataFrame(round(data.groupby('cluster').mean(), 1))
    countries = data.loc[:,"Country"].values
    normilised = principalDataframe.values
    for i in range(len(principalDataframe.values)):
        for j in range(2):
            normilised[i][j] = normalisationTest(principalDataframe.values[i][j])
    normilised = pd.DataFrame(data=normilised, columns=['PC1', 'PC2', 'cluster'])
    return countries, normilised.loc[:, 'PC1'].values, normilised.loc[:, 'PC2'].values, normilised.loc[:,'cluster'].values, mean_clusters.values

def normalisationAge(OldValue):
    OldRange = (10 +2)
    NewValue=0
    if (OldRange == 0):
        NewValue = NewMin
    else:
        NewRange = (30 - 5)
        NewValue = (((OldValue +2) * NewRange) / OldRange) + 5
    return NewValue
def normalisationTest(OldValue):
    OldRange = (7 +3)
    NewValue=0
    if (OldRange == 0):
        NewValue = NewMin
    else:
        NewRange = (30 - 5)
        NewValue = (((OldValue +2) * NewRange) / OldRange) + 5
    return NewValue
if __name__ == "__main__":
   # print( getDataClusterAge()[0])
   # print( getDataClusterAge()[1])
   # print( getDataClusterAge()[2])
   print(getDataClusterTest())





