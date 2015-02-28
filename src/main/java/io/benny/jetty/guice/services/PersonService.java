package io.benny.jetty.guice.services;

import io.benny.jetty.guice.entities.Person;

public interface PersonService {
	public void savePerson(Person p);
	public Person findPerson(long id);
	public void deletePerson(Person p);
}
