package agents;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import jade.core.AID;
import jade.core.Agent;
import jade.core.behaviours.OneShotBehaviour;
import jade.core.behaviours.ParallelBehaviour;
import jade.lang.acl.ACLMessage;

public class ClusteringAgent extends Agent{
	@Override
	protected void setup() {
		ParallelBehaviour parallelBehaviour = new ParallelBehaviour();
		addBehaviour(parallelBehaviour);
		parallelBehaviour.addSubBehaviour(new OneShotBehaviour() {
			
			@Override
			public void action() {
				Client client = ClientBuilder.newClient();
				WebTarget target = client.target("http://127.0.0.1:5000/visualisation/clusterTest");
				String result = target.request(javax.ws.rs.core.MediaType.APPLICATION_JSON).get(String.class);
				ACLMessage aclMessage = new ACLMessage(ACLMessage.INFORM);
				aclMessage.addReceiver(new AID("DbRecoder", AID.ISLOCALNAME));
				aclMessage.setContent(result);					
				aclMessage.setOntology("clusteringTest");
				System.out.println(result);
				send(aclMessage);
				
			}
		});
		
	}
}
