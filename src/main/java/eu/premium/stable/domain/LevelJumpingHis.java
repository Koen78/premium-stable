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
 * Race LevelJumpingHis.
 * @author Koen.
 */
@ApiModel(description = "Race LevelJumpingHis. @author Koen.")
@Entity
@Table(name = "level_jumping_his")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "leveljumpinghis")
public class LevelJumpingHis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    @JsonIgnoreProperties("levelJumpingHisses")
    private Horse horse;

    @ManyToOne
    @JsonIgnoreProperties("")
    private LevelJumping levelJumping;

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

    public LevelJumpingHis date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Horse getHorse() {
        return horse;
    }

    public LevelJumpingHis horse(Horse horse) {
        this.horse = horse;
        return this;
    }

    public void setHorse(Horse horse) {
        this.horse = horse;
    }

    public LevelJumping getLevelJumping() {
        return levelJumping;
    }

    public LevelJumpingHis levelJumping(LevelJumping levelJumping) {
        this.levelJumping = levelJumping;
        return this;
    }

    public void setLevelJumping(LevelJumping levelJumping) {
        this.levelJumping = levelJumping;
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
        LevelJumpingHis levelJumpingHis = (LevelJumpingHis) o;
        if (levelJumpingHis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), levelJumpingHis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LevelJumpingHis{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
