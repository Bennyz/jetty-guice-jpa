package io.benny.jetty.guice.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="people")
public class Person {

	@Id
	@GeneratedValue
	private long id;
	
	private final String name;
	
	private final String lastName;
	
	private int age;
	
	private String email;
	
	private final char[] password;

	private Person(Builder builder) {
		this.name = builder.name;
		this.lastName = builder.lastName;
		this.password = builder.password;
		this.age = builder.age;
		this.email = builder.email;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getLastName() {
		return lastName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getEmail() {
		return email;
	}


	public char[] getPassword() {
		return password;
	}

	public static class Builder {
		private final String lastName;
		private final String name;
		private final char[] password;
		private int age;
		private String email;
		
		public Builder(String name, String lastName, char[] password) {
			this.name = name;
			this.lastName = lastName;
			this.password = password;
		}
		
		public Builder age(int age) {
			this.age = age;
			return this;
		}
		
		public Builder email(String email) {
			this.email = email;
			return this;
		}
		
		public Person build() {
			return new Person(this);
		}
	}
}