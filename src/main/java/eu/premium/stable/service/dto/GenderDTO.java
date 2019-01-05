package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Gender entity.
 */
public class GenderDTO implements Serializable {

    private Long id;

    private String gender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GenderDTO genderDTO = (GenderDTO) o;
        if (genderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), genderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GenderDTO{" +
            "id=" + getId() +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
