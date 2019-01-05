package eu.premium.stable.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the LevelDressageHis entity.
 */
public class LevelDressageHisDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private Long horseId;

    private Long levelDressageId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getHorseId() {
        return horseId;
    }

    public void setHorseId(Long horseId) {
        this.horseId = horseId;
    }

    public Long getLevelDressageId() {
        return levelDressageId;
    }

    public void setLevelDressageId(Long levelDressageId) {
        this.levelDressageId = levelDressageId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LevelDressageHisDTO levelDressageHisDTO = (LevelDressageHisDTO) o;
        if (levelDressageHisDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), levelDressageHisDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LevelDressageHisDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", horse=" + getHorseId() +
            ", levelDressage=" + getLevelDressageId() +
            "}";
    }
}
