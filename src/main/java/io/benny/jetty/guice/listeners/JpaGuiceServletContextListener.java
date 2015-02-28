package io.benny.jetty.guice.listeners;

import io.benny.jetty.guice.services.PersonService;
import io.benny.jetty.guice.services.PersonServiceImpl;
import io.benny.jetty.guice.servlets.RegisterServlet;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.persist.PersistFilter;
import com.google.inject.persist.jpa.JpaPersistModule;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

public class JpaGuiceServletContextListener extends GuiceServletContextListener {

	@Override
	protected Injector getInjector() {
		// TODO Auto-generated method stub
		return Guice.createInjector(new ServletModule() {
			@Override
			protected void configureServlets() {
				install(new JpaPersistModule("JettyJpa"));
				bind(PersonService.class).to(PersonServiceImpl.class);
				filter("/*").through(PersistFilter.class);
				serve("/RegisterServlet").with(RegisterServlet.class);
			}
		});
	}
}
