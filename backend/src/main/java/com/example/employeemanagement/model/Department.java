package com.example.employeemanagement.model;

<<<<<<< HEAD
import javax.persistence.*;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Constructors
    public Department() {}

    public Department(String name) {
        this.name = name;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
=======
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;

/** This class represents a Department entity. Each department has an ID and a name. */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departments")
public class Department {

  /** The ID of the department. It is unique and generated automatically. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** The name of the department. */
  private String name;

  /** The list of employees in the department. */
  @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Employee> employees;
}
>>>>>>> f4d881223632636ee078eaa1e2745af6795c2e3d
