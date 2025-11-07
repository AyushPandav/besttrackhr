package com.example.employeemanagement.model;

<<<<<<< HEAD
import javax.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private int age;

    @ManyToOne
    private Department department;

    // Constructors
    public Employee() {}

    public Employee(String firstName, String lastName, String email, int age, Department department) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.department = department;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}
=======
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;

/**
 * This class represents an Employee entity. Each employee has an ID, first name, last name, email,
 * department, and age.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

  /** The ID of the employee. It is unique and generated automatically. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** The first name of the employee. */
  private String firstName;

  /** The last name of the employee. */
  private String lastName;

  /** The email of the employee. */
  private String email;

  /** The department of the employee. */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "department_id", nullable = false)
  @JsonBackReference
  private Department department;

  /** The age of the employee. */
  private int age;
}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
