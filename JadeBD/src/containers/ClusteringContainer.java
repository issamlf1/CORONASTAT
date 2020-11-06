package containers;

import jade.core.ProfileImpl;
import jade.core.Runtime;
import jade.wrapper.AgentContainer;
import jade.wrapper.AgentController;
import jade.wrapper.StaleProxyException;

public class ClusteringContainer {
	public static void main(String[] args) throws Exception {
		Runtime runtime = Runtime.instance();
		ProfileImpl profileImpl = new ProfileImpl();
		profileImpl.setParameter(ProfileImpl.MAIN_HOST, "localhost");
		AgentContainer container = runtime.createAgentContainer(profileImpl);
		AgentController controller = container.createNewAgent("ClusteringTest", "agents.ClusteringAgent",new Object[] {});
		AgentController controller1 = container.createNewAgent("ClusteringAge", "agents.ClusterAgeAgent",new Object[] {});
		controller.start();
		controller1.start();
	}
}
