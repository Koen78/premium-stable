package eu.premium.stable.service;

import eu.premium.stable.service.dto.MedCheckXrayDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MedCheckXray.
 */
public interface MedCheckXrayService {

    /**
     * Save a medCheckXray.
     *
     * @param medCheckXrayDTO the entity to save
     * @return the persisted entity
     */
    MedCheckXrayDTO save(MedCheckXrayDTO medCheckXrayDTO);

    /**
     * Get all the medCheckXrays.
     *
     * @return the list of entities
     */
    List<MedCheckXrayDTO> findAll();


    /**
     * Get the "id" medCheckXray.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MedCheckXrayDTO> findOne(Long id);

    /**
     * Delete the "id" medCheckXray.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the medCheckXray corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MedCheckXrayDTO> search(String query);
}
