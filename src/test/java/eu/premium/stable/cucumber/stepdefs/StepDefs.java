package eu.premium.stable.cucumber.stepdefs;

import eu.premium.stable.PremiumStableApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = PremiumStableApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
