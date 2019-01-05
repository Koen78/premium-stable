package eu.premium.stable.service;

import eu.premium.stable.service.dto.MedCheckDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MedCheck.
 */
public interface MedCheckService {

    /**
     * Save a medCheck.
     *
     * @param medCheckDTO the entity to save
     * @return the persisted entity
     */
    MedCheckDTO save(MedCheckDTO medCheckDTO);

    /**
     * Get all the medChecks.
     *
     * @return the list of entities
     */
    List<MedCheckDTO> findAll();


    /**
     * Get the "id" medCheck.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MedCheckDTO> findOne(Long id);

    /**
     * Delete the "id" medCheck.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the medCheck corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MedCheckDTO> search(String query);
}
