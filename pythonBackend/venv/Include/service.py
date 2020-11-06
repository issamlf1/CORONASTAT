from flask import Flask, jsonify
import dataExtraction as dataEx
from flask_cors import CORS,cross_origin
from analyseSentiment import twitterDataExtaraction
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/scrapingDB"
mongo = PyMongo(app)
db = mongo.db
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# Visualisation service part

@app.route('/visualisation/confirmed/<string:country>')
@cross_origin()
def confirmedCases(country):
    array = dataEx.getData("Confirmed",country).tolist()
    return jsonify({"confirmed" : array})

@app.route('/visualisation/recovered/<string:country>')
@cross_origin()
def recoveredCases(country):
    array = dataEx.getData("Recovered", country).tolist()
    return jsonify({"recovered": array})

@app.route('/visualisation/death/<string:country>')
@cross_origin()
def deathCases(country):
    array = dataEx.getData("Deaths", country).tolist()
    return jsonify({"deaths": array})
@app.route('/visualisation/maxofall/<string:country>')
@cross_origin()
def maxofall(country):
    array = dataEx.getMaxOfAll(country).tolist()
    return jsonify({"confirmed" : array[0], "recovered" : array[1], "death" : array[2]})
@app.route('/visualisation/newdata/<string:country>')
@cross_origin()
def NewData(country):
    array = dataEx.getNewData(country)[0]
    lastUpdate = dataEx.getNewData(country)[1]
    return jsonify({"totalCases" :array[0], "death" :array[1], "recovered" :array[2], "lastUpdate" :lastUpdate})
@app.route('/visualisation/regionsData')
@cross_origin()
def dataByregion():
    array = dataEx.getRegionsData()
    return jsonify({"regions":array[0], "affectedNum": array[1], "update": array[2], "somme":array[3]})

@app.route('/visualisation/StatistiqueMonde')
@cross_origin()
def getStatistiqueMonde():
    array = dataEx.getStatistiqueMonde()
    return jsonify({"totalCases": array[0], "death": array[1], "recovered": array[2]})

@app.route('/visualisation/clusterAge')
@cross_origin()
def getClusterAge():
    array = dataEx.getDataClusterAge()
    return jsonify({"countries": array[0].tolist(), "x": array[1].tolist(),"y":array[2].tolist(), "cluster": array[3].tolist()})

@app.route('/visualisation/clusterTest')
@cross_origin()
def getClusterTest():
    array = dataEx.getDataClusterTest()
    print(array)
    return jsonify({"countries": array[0].tolist(), "x": array[1].tolist(),"y":array[2].tolist(), "cluster": array[3].tolist()})

@app.route('/visualisation/ageClusterMean')
@cross_origin()
def getMeanClusterAge():
    array = dataEx.getDataClusterAge()[4]
    print(array)
    return jsonify({"meanClusters": array.tolist()})
@app.route('/visualisation/testClusterMean')
@cross_origin()
def getMeanClusterTest():
    array = dataEx.getDataClusterTest()[4]
    return jsonify({"meanClusters": array.tolist()})



@app.route("/analysesentiment/covid19/", defaults={'tags': '#covid19','tags2': ''})
@app.route('/analysesentiment/covid19/<string:tags>/<string:tags2>')
@cross_origin()
def analyseSentiment(tags,tags2):
    array = twitterDataExtaraction(tags,tags2)
    return jsonify({"neutral": array[0], "negative": array[1], "positive": array[2]})


@app.route('/mongodb/nature')
@cross_origin()
def getNature():
    cursor = db.nature.find().skip(db.nature.count_documents({}) - 1)
    return jsonify({"neutral": cursor[0]['neutral'], "negative": cursor[0]['negative'], "positive": cursor[0]['positive']})

@app.route('/mongodb/economy')
@cross_origin()
def getEconomy():
    cursor = db.economy.find().skip(db.economy.count_documents({}) - 1)
    return jsonify({"neutral": cursor[0]['neutral'], "negative": cursor[0]['negative'], "positive": cursor[0]['positive']})


@app.route('/mongodb/mentalhealth')
@cross_origin()
def getMentalhealth():
    cursor = db.mentalhealth.find().skip(db.mentalhealth.count_documents({}) - 1)
    return jsonify({"neutral": cursor[0]['neutral'], "negative": cursor[0]['negative'], "positive": cursor[0]['positive']})


@app.route('/mongodb/politics')
@cross_origin()
def getPolitics():
    cursor = db.politics.find().skip(db.politics.count_documents({}) - 1)
    return jsonify({"neutral": cursor[0]['neutral'], "negative": cursor[0]['negative'], "positive": cursor[0]['positive']})

@app.route('/visualisation/clusteringAge')
@cross_origin()
def getClusteringAge():
    app.config["MONGO_URI"] = "mongodb://localhost:27017/ClusteringDB"
    mongo = PyMongo(app)
    db = mongo.db
    array = db.clusteringAge.find().skip(db.clusteringAge.count_documents({}) - 1)
    return jsonify({"countries": array[0]['countries'], "x": array[0]['x'],"y":array[0]['y'], "cluster": array[0]['cluster']})


@app.route('/visualisation/clusteringTest')
@cross_origin()
def getClusteringTest():
    app.config["MONGO_URI"] = "mongodb://localhost:27017/ClusteringDB"
    mongo = PyMongo(app)
    db = mongo.db
    array = db.clusteringTest.find().skip(db.clusteringTest.count_documents({}) - 1)
    return jsonify(
        {"countries": array[0]['countries'], "x": array[0]['x'], "y": array[0]['y'], "cluster": array[0]['cluster']})

if __name__ == "__main__":
    app.run(debug=True)