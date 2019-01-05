package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * Race LevelDressuurHis.
 * @author Koen.
 */
@ApiModel(description = "Race LevelDressuurHis. @author Koen.")
@Entity
@Table(name = "level_dressage_his")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "leveldressagehis")
public class LevelDressageHis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("levelDressageHisses")
    private Horse horse;

    @ManyToOne
    @JsonIgnoreProperties("")
    private LevelDressage levelDressage;

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

    public LevelDressageHis date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Horse getHorse() {
        return horse;
    }

    public LevelDressageHis horse(Horse horse) {
        this.horse = horse;
        return this;
    }

    public void setHorse(Horse horse) {
        this.horse = horse;
    }

    public LevelDressage getLevelDressage() {
        return levelDressage;
    }

    public LevelDressageHis levelDressage(LevelDressage levelDressage) {
        this.levelDressage = levelDressage;
        return this;
    }

    public void setLevelDressage(LevelDressage levelDressage) {
        this.levelDressage = levelDressage;
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
        LevelDressageHis levelDressageHis = (LevelDressageHis) o;
        if (levelDressageHis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), levelDressageHis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LevelDressageHis{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
