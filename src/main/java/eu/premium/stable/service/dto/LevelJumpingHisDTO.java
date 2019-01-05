package eu.premium.stable.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the LevelJumpingHis entity.
 */
public class LevelJumpingHisDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private Long horseId;

    private Long levelJumpingId;

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

    public Long getLevelJumpingId() {
        return levelJumpingId;
    }

    public void setLevelJumpingId(Long levelJumpingId) {
        this.levelJumpingId = levelJumpingId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LevelJumpingHisDTO levelJumpingHisDTO = (LevelJumpingHisDTO) o;
        if (levelJumpingHisDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), levelJumpingHisDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LevelJumpingHisDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", horse=" + getHorseId() +
            ", levelJumping=" + getLevelJumpingId() +
            "}";
    }
}
