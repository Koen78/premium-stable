package eu.premium.stable.service;

import eu.premium.stable.service.dto.LevelJumpingDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LevelJumping.
 */
public interface LevelJumpingService {

    /**
     * Save a levelJumping.
     *
     * @param levelJumpingDTO the entity to save
     * @return the persisted entity
     */
    LevelJumpingDTO save(LevelJumpingDTO levelJumpingDTO);

    /**
     * Get all the levelJumpings.
     *
     * @return the list of entities
     */
    List<LevelJumpingDTO> findAll();


    /**
     * Get the "id" levelJumping.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LevelJumpingDTO> findOne(Long id);

    /**
     * Delete the "id" levelJumping.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the levelJumping corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LevelJumpingDTO> search(String query);
}
