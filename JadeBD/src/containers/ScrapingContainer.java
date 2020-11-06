package containers;

import jade.core.ProfileImpl;
import jade.core.Runtime;
import jade.wrapper.AgentContainer;
import jade.wrapper.AgentController;
import jade.wrapper.StaleProxyException;

public class ScrapingContainer {

	public static void main(String[] args) throws Exception {
		Runtime runtime = Runtime.instance();
		ProfileImpl profileImpl = new ProfileImpl();
		profileImpl.setParameter(ProfileImpl.MAIN_HOST, "localhost");
		AgentContainer container = runtime.createAgentContainer(profileImpl);
		AgentController controller = container.createNewAgent("NatureScrapper", "agents.NatureScrapingAgent",new Object[] {});
		AgentController controller1 = container.createNewAgent("EconScrapper", "agents.EconScrapingAgent",new Object[] {});
		AgentController controller2 = container.createNewAgent("PoliticScrapper", "agents.PoliticScrapingAgent",new Object[] {});
		AgentController controller3 = container.createNewAgent("MhealthScrapper", "agents.MhealthScrapingAgent",new Object[] {});
		controller.start();
		controller1.start();
		controller2.start();
		controller3.start();
		
	}

}
