package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Color entity.
 */
public class ColorDTO implements Serializable {

    private Long id;

    private String color;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ColorDTO colorDTO = (ColorDTO) o;
        if (colorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), colorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ColorDTO{" +
            "id=" + getId() +
            ", color='" + getColor() + "'" +
            "}";
    }
}
