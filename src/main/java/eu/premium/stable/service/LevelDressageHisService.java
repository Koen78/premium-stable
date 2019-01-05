package eu.premium.stable.service;

import eu.premium.stable.service.dto.LevelDressageHisDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LevelDressageHis.
 */
public interface LevelDressageHisService {

    /**
     * Save a levelDressageHis.
     *
     * @param levelDressageHisDTO the entity to save
     * @return the persisted entity
     */
    LevelDressageHisDTO save(LevelDressageHisDTO levelDressageHisDTO);

    /**
     * Get all the levelDressageHis.
     *
     * @return the list of entities
     */
    List<LevelDressageHisDTO> findAll();


    /**
     * Get the "id" levelDressageHis.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LevelDressageHisDTO> findOne(Long id);

    /**
     * Delete the "id" levelDressageHis.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the levelDressageHis corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LevelDressageHisDTO> search(String query);
}
