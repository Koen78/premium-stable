package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the MedCheckDet entity.
 */
public class MedCheckDetDTO implements Serializable {

    private Long id;

    private String code;

    private String result;

    private Long medCheckId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Long getMedCheckId() {
        return medCheckId;
    }

    public void setMedCheckId(Long medCheckId) {
        this.medCheckId = medCheckId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MedCheckDetDTO medCheckDetDTO = (MedCheckDetDTO) o;
        if (medCheckDetDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medCheckDetDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedCheckDetDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", result='" + getResult() + "'" +
            ", medCheck=" + getMedCheckId() +
            "}";
    }
}
