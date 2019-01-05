package eu.premium.stable.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the MedCheck entity.
 */
public class MedCheckDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private String shortDescription;

    private String resultDescription;

    @Lob
    private byte[] pdf;
    private String pdfContentType;

    private Long horseId;

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

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getResultDescription() {
        return resultDescription;
    }

    public void setResultDescription(String resultDescription) {
        this.resultDescription = resultDescription;
    }

    public byte[] getPdf() {
        return pdf;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

    public String getPdfContentType() {
        return pdfContentType;
    }

    public void setPdfContentType(String pdfContentType) {
        this.pdfContentType = pdfContentType;
    }

    public Long getHorseId() {
        return horseId;
    }

    public void setHorseId(Long horseId) {
        this.horseId = horseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MedCheckDTO medCheckDTO = (MedCheckDTO) o;
        if (medCheckDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medCheckDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedCheckDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", resultDescription='" + getResultDescription() + "'" +
            ", pdf='" + getPdf() + "'" +
            ", horse=" + getHorseId() +
            "}";
    }
}
