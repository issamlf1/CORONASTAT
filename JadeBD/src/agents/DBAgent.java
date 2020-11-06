package agents;

import java.util.HashMap;
import java.util.Map;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.util.JSON;

import jade.core.Agent;
import jade.core.behaviours.CyclicBehaviour;
import jade.core.behaviours.ParallelBehaviour;
import jade.lang.acl.ACLMessage;
import jade.lang.acl.MessageTemplate;

public class DBAgent extends Agent{
	@Override
	protected void setup() {
		ParallelBehaviour parallelBehaviour = new ParallelBehaviour();
		addBehaviour(parallelBehaviour);
		parallelBehaviour.addSubBehaviour(new CyclicBehaviour() {
			
			@Override
			public void action() {
				MessageTemplate msgTemplate_nature = MessageTemplate.MatchOntology("nature");
				MessageTemplate msgTemplate_economy= MessageTemplate.MatchOntology("economy");
				MessageTemplate msgTemplate_politics = MessageTemplate.MatchOntology("politics");
				MessageTemplate msgTemplate_Mhealth= MessageTemplate.MatchOntology("mentalhealth");
				MessageTemplate msgTemplate_ClusteringTest= MessageTemplate.MatchOntology("clusteringTest");
				MessageTemplate msgTemplate_ClusteringAge= MessageTemplate.MatchOntology("clusteringAge");
				ACLMessage nature_message = receive(msgTemplate_nature);
				ACLMessage economy_message = receive(msgTemplate_economy);
				ACLMessage politics_message = receive(msgTemplate_politics);
				ACLMessage Mhealth_message = receive(msgTemplate_Mhealth);
				ACLMessage clusterTest_message = receive(msgTemplate_ClusteringTest);
				ACLMessage clusterAge_message = receive(msgTemplate_ClusteringAge);
				
				if(nature_message != null) {
					String result = nature_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("scrapingDB");
					DBCollection collection = database.getCollection("nature");
					DBObject dbObject = (DBObject) JSON.parse(result);
					collection.insert(dbObject);
				}
				else if(economy_message != null) {
					String result = economy_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("scrapingDB");
					DBCollection collection = database.getCollection("economy");
					DBObject dbObject = (DBObject) JSON.parse(result);
					collection.insert(dbObject);
				}
				else if (politics_message != null) {
					String result = politics_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("scrapingDB");
					DBCollection collection = database.getCollection("politics");
					DBObject dbObject = (DBObject) JSON.parse(result);
					
					collection.insert(dbObject);
				}
				else if (Mhealth_message != null) {
					String result = Mhealth_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("scrapingDB");
					DBCollection collection = database.getCollection("mentalhealth");
					DBObject dbObject = (DBObject) JSON.parse(result);
					collection.insert(dbObject);
				}
				else if (clusterTest_message != null) {
					String result = clusterTest_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("ClusteringDB");
					DBCollection collection = database.getCollection("clusteringTest");
					DBObject dbObject = (DBObject) JSON.parse(result);
					collection.insert(dbObject);
				}
				else if (clusterAge_message != null) {
					String result = clusterAge_message.getContent();
					MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://localhost:27017"));
					DB database = mongoClient.getDB("ClusteringDB");
					DBCollection collection = database.getCollection("clusteringAge");
					DBObject dbObject = (DBObject) JSON.parse(result);
					collection.insert(dbObject);
				}
				else {
					block();
				}
			}
		});
	}

}
