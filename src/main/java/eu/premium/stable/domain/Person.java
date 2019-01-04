package eu.premium.stable.domain;

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
 * Person entity.
 * @author Koen.
 */
@ApiModel(description = "Person entity. @author Koen.")
@Entity
@Table(name = "person")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JsonIgnoreProperties("")
    private LanguageParam languageParam;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "person_stables",
               joinColumns = @JoinColumn(name = "people_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "stables_id", referencedColumnName = "id"))
    private Set<Stable> stables = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "person_horses",
               joinColumns = @JoinColumn(name = "people_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "horses_id", referencedColumnName = "id"))
    private Set<Horse> horses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Person name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public Person mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public Person email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LanguageParam getLanguageParam() {
        return languageParam;
    }

    public Person languageParam(LanguageParam languageParam) {
        this.languageParam = languageParam;
        return this;
    }

    public void setLanguageParam(LanguageParam languageParam) {
        this.languageParam = languageParam;
    }

    public Set<Stable> getStables() {
        return stables;
    }

    public Person stables(Set<Stable> stables) {
        this.stables = stables;
        return this;
    }

    public Person addStables(Stable stable) {
        this.stables.add(stable);
        stable.getOwners().add(this);
        return this;
    }

    public Person removeStables(Stable stable) {
        this.stables.remove(stable);
        stable.getOwners().remove(this);
        return this;
    }

    public void setStables(Set<Stable> stables) {
        this.stables = stables;
    }

    public Set<Horse> getHorses() {
        return horses;
    }

    public Person horses(Set<Horse> horses) {
        this.horses = horses;
        return this;
    }

    public Person addHorses(Horse horse) {
        this.horses.add(horse);
        horse.getOwners().add(this);
        return this;
    }

    public Person removeHorses(Horse horse) {
        this.horses.remove(horse);
        horse.getOwners().remove(this);
        return this;
    }

    public void setHorses(Set<Horse> horses) {
        this.horses = horses;
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
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
