package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the LanguageParam entity.
 */
public class LanguageParamDTO implements Serializable {

    private Long id;

    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LanguageParamDTO languageParamDTO = (LanguageParamDTO) o;
        if (languageParamDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), languageParamDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LanguageParamDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
