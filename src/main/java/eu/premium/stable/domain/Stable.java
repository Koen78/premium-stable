package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Stable entity.
 * @author Koen.
 */
@ApiModel(description = "Stable entity. @author Koen.")
@Entity
@Table(name = "stable")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "stable")
public class Stable implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "street")
    private String street;

    @Column(name = "house_number")
    private String houseNumber;

    @Column(name = "postalcode")
    private String postalcode;

    @Column(name = "city")
    private String city;

    @OneToMany(mappedBy = "stable")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Horse> horses = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private Country country;

    @ManyToMany(mappedBy = "stables")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Person> owners = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Stable description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStreet() {
        return street;
    }

    public Stable street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public Stable houseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
        return this;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public Stable postalcode(String postalcode) {
        this.postalcode = postalcode;
        return this;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getCity() {
        return city;
    }

    public Stable city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Set<Horse> getHorses() {
        return horses;
    }

    public Stable horses(Set<Horse> horses) {
        this.horses = horses;
        return this;
    }

    public Stable addHorses(Horse horse) {
        this.horses.add(horse);
        horse.setStable(this);
        return this;
    }

    public Stable removeHorses(Horse horse) {
        this.horses.remove(horse);
        horse.setStable(null);
        return this;
    }

    public void setHorses(Set<Horse> horses) {
        this.horses = horses;
    }

    public Country getCountry() {
        return country;
    }

    public Stable country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Set<Person> getOwners() {
        return owners;
    }

    public Stable owners(Set<Person> people) {
        this.owners = people;
        return this;
    }

    public Stable addOwners(Person person) {
        this.owners.add(person);
        person.getStables().add(this);
        return this;
    }

    public Stable removeOwners(Person person) {
        this.owners.remove(person);
        person.getStables().remove(this);
        return this;
    }

    public void setOwners(Set<Person> people) {
        this.owners = people;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Stable stable = (Stable) o;
        if (stable.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stable.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stable{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", street='" + getStreet() + "'" +
            ", houseNumber='" + getHouseNumber() + "'" +
            ", postalcode='" + getPostalcode() + "'" +
            ", city='" + getCity() + "'" +
            "}";
    }
}
