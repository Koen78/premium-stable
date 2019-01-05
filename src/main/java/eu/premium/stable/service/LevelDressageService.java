package eu.premium.stable.service;

import eu.premium.stable.service.dto.LevelDressageDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LevelDressage.
 */
public interface LevelDressageService {

    /**
     * Save a levelDressage.
     *
     * @param levelDressageDTO the entity to save
     * @return the persisted entity
     */
    LevelDressageDTO save(LevelDressageDTO levelDressageDTO);

    /**
     * Get all the levelDressages.
     *
     * @return the list of entities
     */
    List<LevelDressageDTO> findAll();


    /**
     * Get the "id" levelDressage.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LevelDressageDTO> findOne(Long id);

    /**
     * Delete the "id" levelDressage.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the levelDressage corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LevelDressageDTO> search(String query);
}
