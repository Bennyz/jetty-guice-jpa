package io.benny.jetty.guice.services;

import io.benny.jetty.guice.entities.Person;

import javax.persistence.EntityManager;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.persist.Transactional;

public class PersonServiceImpl implements PersonService {

	private Provider<EntityManager> em;

	@Inject
	public PersonServiceImpl(Provider<EntityManager> em) {
		this.em = em;
	}
	
	@Override
	@Transactional
	public void savePerson(Person p) {
		em.get().persist(p);
	}

	@Override
	public Person findPerson(long id) {
		return em.get().find(Person.class, id);
	}

	@Override
	@Transactional
	public void deletePerson(Person p) {
		em.get().remove(p);
	}
}
