package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the MedCheckXray entity.
 */
public class MedCheckXrayDTO implements Serializable {

    private Long id;

    private String description;

    @Lob
    private byte[] image;
    private String imageContentType;

    private Long medCheckId;

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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
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

        MedCheckXrayDTO medCheckXrayDTO = (MedCheckXrayDTO) o;
        if (medCheckXrayDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medCheckXrayDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedCheckXrayDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", medCheck=" + getMedCheckId() +
            "}";
    }
}
