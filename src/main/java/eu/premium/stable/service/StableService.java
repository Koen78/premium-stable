package eu.premium.stable.service;

import eu.premium.stable.service.dto.StableDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Stable.
 */
public interface StableService {

    /**
     * Save a stable.
     *
     * @param stableDTO the entity to save
     * @return the persisted entity
     */
    StableDTO save(StableDTO stableDTO);

    /**
     * Get all the stables.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StableDTO> findAll(Pageable pageable);


    /**
     * Get the "id" stable.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<StableDTO> findOne(Long id);

    /**
     * Delete the "id" stable.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the stable corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StableDTO> search(String query, Pageable pageable);
}
