package eu.premium.stable.service;

import eu.premium.stable.service.dto.LevelJumpingHisDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LevelJumpingHis.
 */
public interface LevelJumpingHisService {

    /**
     * Save a levelJumpingHis.
     *
     * @param levelJumpingHisDTO the entity to save
     * @return the persisted entity
     */
    LevelJumpingHisDTO save(LevelJumpingHisDTO levelJumpingHisDTO);

    /**
     * Get all the levelJumpingHis.
     *
     * @return the list of entities
     */
    List<LevelJumpingHisDTO> findAll();


    /**
     * Get the "id" levelJumpingHis.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LevelJumpingHisDTO> findOne(Long id);

    /**
     * Delete the "id" levelJumpingHis.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the levelJumpingHis corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LevelJumpingHisDTO> search(String query);
}
