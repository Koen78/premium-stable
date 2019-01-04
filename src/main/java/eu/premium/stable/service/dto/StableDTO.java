package eu.premium.stable.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Stable entity.
 */
public class StableDTO implements Serializable {

    private Long id;

    private String description;

    private String street;

    private String houseNumber;

    private String postalcode;

    private String city;

    private Long countryId;

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

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPostalcode() {
        return postalcode;
    }

    public void setPostalcode(String postalcode) {
        this.postalcode = postalcode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StableDTO stableDTO = (StableDTO) o;
        if (stableDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stableDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StableDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", street='" + getStreet() + "'" +
            ", houseNumber='" + getHouseNumber() + "'" +
            ", postalcode='" + getPostalcode() + "'" +
            ", city='" + getCity() + "'" +
            ", country=" + getCountryId() +
            "}";
    }
}
