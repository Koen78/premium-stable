package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Person entity.
 */
public class PersonDTO implements Serializable {

    private Long id;

    private String name;

    private String mobile;

    private String email;

    private Long languageParamId;

    private Set<StableDTO> stables = new HashSet<>();

    private Set<HorseDTO> horses = new HashSet<>();

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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getLanguageParamId() {
        return languageParamId;
    }

    public void setLanguageParamId(Long languageParamId) {
        this.languageParamId = languageParamId;
    }

    public Set<StableDTO> getStables() {
        return stables;
    }

    public void setStables(Set<StableDTO> stables) {
        this.stables = stables;
    }

    public Set<HorseDTO> getHorses() {
        return horses;
    }

    public void setHorses(Set<HorseDTO> horses) {
        this.horses = horses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonDTO personDTO = (PersonDTO) o;
        if (personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", email='" + getEmail() + "'" +
            ", languageParam=" + getLanguageParamId() +
            "}";
    }
}
