package eu.premium.stable.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A MedCheckDet.
 */
@Entity
@Table(name = "med_check_det")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "medcheckdet")
public class MedCheckDet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "result")
    private String result;

    @ManyToOne
    @JsonIgnoreProperties("details")
    private MedCheck medCheck;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public MedCheckDet code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getResult() {
        return result;
    }

    public MedCheckDet result(String result) {
        this.result = result;
        return this;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public MedCheck getMedCheck() {
        return medCheck;
    }

    public MedCheckDet medCheck(MedCheck medCheck) {
        this.medCheck = medCheck;
        return this;
    }

    public void setMedCheck(MedCheck medCheck) {
        this.medCheck = medCheck;
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
        MedCheckDet medCheckDet = (MedCheckDet) o;
        if (medCheckDet.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), medCheckDet.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MedCheckDet{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
