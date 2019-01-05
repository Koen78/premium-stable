package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A MedCheck.
 */
@Entity
@Table(name = "med_check")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "medcheck")
public class MedCheck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "result_description")
    private String resultDescription;

    @Lob
    @Column(name = "pdf")
    private byte[] pdf;

    @Column(name = "pdf_content_type")
    private String pdfContentType;

    @ManyToOne
    @JsonIgnoreProperties("medChecks")
    private Horse horse;

    @OneToMany(mappedBy = "medCheck")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MedCheckDet> details = new HashSet<>();
    @OneToMany(mappedBy = "medCheck")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MedCheckXray> xrays = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public MedCheck date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public MedCheck shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getResultDescription() {
        return resultDescription;
    }

    public MedCheck resultDescription(String resultDescription) {
        this.resultDescription = resultDescription;
        return this;
    }

    public void setResultDescription(String resultDescription) {
        this.resultDescription = resultDescription;
    }

    public byte[] getPdf() {
        return pdf;
    }

    public MedCheck pdf(byte[] pdf) {
        this.pdf = pdf;
        return this;
    }

    public void setPdf(byte[] pdf) {
        this.pdf = pdf;
    }

    public String getPdfContentType() {
        return pdfContentType;
    }

    public MedCheck pdfContentType(String pdfContentType) {
        this.pdfContentType = pdfContentType;
        return this;
    }

    public void setPdfContentType(String pdfContentType) {
        this.pdfContentType = pdfContentType;
    }

    public Horse getHorse() {
        return horse;
    }

    public MedCheck horse(Horse horse) {
        this.horse = horse;
        return this;
    }

    public void setHorse(Horse horse) {
        this.horse = horse;
    }

    public Set<MedCheckDet> getDetails() {
        return details;
    }

    public MedCheck details(Set<MedCheckDet> medCheckDets) {
        this.details = medCheckDets;
        return this;
    }

    public MedCheck addDetails(MedCheckDet medCheckDet) {
        this.details.add(medCheckDet);
        medCheckDet.setMedCheck(this);
        return this;
    }

    public MedCheck removeDetails(MedCheckDet medCheckDet) {
        this.details.remove(medCheckDet);
        medCheckDet.setMedCheck(null);
        return this;
    }

    public void setDetails(Set<MedCheckDet> medCheckDets) {
        this.details = medCheckDets;
    }

    public Set<MedCheckXray> getXrays() {
        return xrays;
    }

    public MedCheck xrays(Set<MedCheckXray> medCheckXrays) {
        this.xrays = medCheckXrays;
        return this;
    }

    public MedCheck addXrays(MedCheckXray medCheckXray) {
        this.xrays.add(medCheckXray);
        medCheckXray.setMedCheck(this);
        return this;
    }

    public MedCheck removeXrays(MedCheckXray medCheckXray) {
        this.xrays.remove(medCheckXray);
        medCheckXray.setMedCheck(null);
        return this;
    }

    public void setXrays(Set<MedCheckXray> medCheckXrays) {
        this.xrays = medCheckXrays;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MedCheck medCheck = (MedCheck) o;
        if (medCheck.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medCheck.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedCheck{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", resultDescription='" + getResultDescription() + "'" +
            ", pdf='" + getPdf() + "'" +
            ", pdfContentType='" + getPdfContentType() + "'" +
            "}";
    }
}
