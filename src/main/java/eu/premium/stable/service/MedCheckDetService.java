package eu.premium.stable.service;

import eu.premium.stable.service.dto.MedCheckDetDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MedCheckDet.
 */
public interface MedCheckDetService {

    /**
     * Save a medCheckDet.
     *
     * @param medCheckDetDTO the entity to save
     * @return the persisted entity
     */
    MedCheckDetDTO save(MedCheckDetDTO medCheckDetDTO);

    /**
     * Get all the medCheckDets.
     *
     * @return the list of entities
     */
    List<MedCheckDetDTO> findAll();


    /**
     * Get the "id" medCheckDet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MedCheckDetDTO> findOne(Long id);

    /**
     * Delete the "id" medCheckDet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the medCheckDet corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MedCheckDetDTO> search(String query);
}
