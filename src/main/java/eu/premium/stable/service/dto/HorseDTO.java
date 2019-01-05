package eu.premium.stable.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Horse entity.
 */
public class HorseDTO implements Serializable {

    private Long id;

    private String name;

    private LocalDate birthday;

    private String descentFather;

    private String descentMother;

    private String height;

    private String comment;

    private Long stableId;

    private Long levelDressageId;

    private Long levelJumpingId;

    private Long genderId;

    private Long colorId;

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

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getDescentFather() {
        return descentFather;
    }

    public void setDescentFather(String descentFather) {
        this.descentFather = descentFather;
    }

    public String getDescentMother() {
        return descentMother;
    }

    public void setDescentMother(String descentMother) {
        this.descentMother = descentMother;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Long getStableId() {
        return stableId;
    }

    public void setStableId(Long stableId) {
        this.stableId = stableId;
    }

    public Long getLevelDressageId() {
        return levelDressageId;
    }

    public void setLevelDressageId(Long levelDressageId) {
        this.levelDressageId = levelDressageId;
    }

    public Long getLevelJumpingId() {
        return levelJumpingId;
    }

    public void setLevelJumpingId(Long levelJumpingId) {
        this.levelJumpingId = levelJumpingId;
    }

    public Long getGenderId() {
        return genderId;
    }

    public void setGenderId(Long genderId) {
        this.genderId = genderId;
    }

    public Long getColorId() {
        return colorId;
    }

    public void setColorId(Long colorId) {
        this.colorId = colorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HorseDTO horseDTO = (HorseDTO) o;
        if (horseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), horseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HorseDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", descentFather='" + getDescentFather() + "'" +
            ", descentMother='" + getDescentMother() + "'" +
            ", height='" + getHeight() + "'" +
            ", comment='" + getComment() + "'" +
            ", stable=" + getStableId() +
            ", levelDressage=" + getLevelDressageId() +
            ", levelJumping=" + getLevelJumpingId() +
            ", gender=" + getGenderId() +
            ", color=" + getColorId() +
            "}";
    }
}
