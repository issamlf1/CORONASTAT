package agents;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.core.behaviours.ParallelBehaviour;
import jade.core.behaviours.TickerBehaviour;
import jade.lang.acl.ACLMessage;

public class EconScrapingAgent extends Agent{
	@Override
	protected void setup() {
		// TODO Auto-generated method stub
		ParallelBehaviour parallelBehaviour = new ParallelBehaviour();
		addBehaviour(parallelBehaviour);
		parallelBehaviour.addSubBehaviour(new OneShotBehaviour() {
			
			@Override
			public void action() {
				// TODO Auto-generated method stub
				Client client = ClientBuilder.newClient();
				WebTarget target = client.target("http://127.0.0.1:5000/analysesentiment/covid19/covid19/economy");
				String result = target.request(javax.ws.rs.core.MediaType.APPLICATION_JSON).get(String.class);
				ACLMessage aclMessage = new ACLMessage(ACLMessage.INFORM);
				aclMessage.addReceiver(new AID("DbRecoder", AID.ISLOCALNAME));
				aclMessage.setContent(result);					
				aclMessage.setOntology("economy");
				send(aclMessage);
			}
		});
		parallelBehaviour.addSubBehaviour(new TickerBehaviour(this,300000) {
			
			@Override
			protected void onTick() {
				Client client = ClientBuilder.newClient();
				WebTarget target = client.target("http://127.0.0.1:5000/analysesentiment/covid19/covid19/economy");
				String result = target.request(javax.ws.rs.core.MediaType.APPLICATION_JSON).get(String.class);
				ACLMessage aclMessage = new ACLMessage(ACLMessage.INFORM);
				aclMessage.addReceiver(new AID("DbRecoder", AID.ISLOCALNAME));
				aclMessage.setContent(result);					
				aclMessage.setOntology("economy");
				send(aclMessage);
				
			}
		});
	}
}
