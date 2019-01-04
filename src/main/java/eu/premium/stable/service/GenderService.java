package eu.premium.stable.service;

import eu.premium.stable.service.dto.GenderDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Gender.
 */
public interface GenderService {

    /**
     * Save a gender.
     *
     * @param genderDTO the entity to save
     * @return the persisted entity
     */
    GenderDTO save(GenderDTO genderDTO);

    /**
     * Get all the genders.
     *
     * @return the list of entities
     */
    List<GenderDTO> findAll();


    /**
     * Get the "id" gender.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GenderDTO> findOne(Long id);

    /**
     * Delete the "id" gender.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the gender corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<GenderDTO> search(String query);
}
