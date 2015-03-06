package io.benny.jetty.guice.servlets;

import io.benny.jetty.guice.entities.Person;
import io.benny.jetty.guice.services.PersonService;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class RegisterServlet extends HttpServlet {
	@Inject
	PersonService personService;
	
	Logger logger = LoggerFactory.getLogger(RegisterServlet.class);
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String name = req.getParameter("name");
		String password = req.getParameter("password");
		String email = req.getParameter("email");
		int age = Integer.valueOf(req.getParameter("age"));
		
		
		Person p = new Person.Builder(name, name + "last", password.toCharArray())
											.age(age)
											.email(email)
											.build();
		logger.info("saving person");

		personService.savePerson(p);
		logger.info("saved person");

		logger.info("extracting person");
		Person person = personService.findPerson(p.getId());
		resp.getWriter().print("Hello " + person.getName());
	}
}