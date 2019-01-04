package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Competition.
 */
@Entity
@Table(name = "competition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "competition")
public class Competition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "description")
    private String description;

    @Column(name = "result")
    private String result;

    @ManyToOne
    @JsonIgnoreProperties("competitions")
    private Horse horse;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Race race;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Competition date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public Competition description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getResult() {
        return result;
    }

    public Competition result(String result) {
        this.result = result;
        return this;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Horse getHorse() {
        return horse;
    }

    public Competition horse(Horse horse) {
        this.horse = horse;
        return this;
    }

    public void setHorse(Horse horse) {
        this.horse = horse;
    }

    public Race getRace() {
        return race;
    }

    public Competition race(Race race) {
        this.race = race;
        return this;
    }

    public void setRace(Race race) {
        this.race = race;
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
        Competition competition = (Competition) o;
        if (competition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), competition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Competition{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
