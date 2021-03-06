package com.team19.carmicroservice.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class CarClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable=false)
    private String name;

    @OneToMany(mappedBy = "carClass", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Car> cars;

    @Column(name = "removed")
    private boolean removed;

    public CarClass() {
    }

    public CarClass(Long id, String name, boolean removed) {
        this.id = id;
        this.name = name;
        this.removed = false;
        this.cars = new HashSet<>();
    }

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

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    public boolean isRemoved() {
        return removed;
    }

    public void setRemoved(boolean removed) {
        this.removed = removed;
    }
}
