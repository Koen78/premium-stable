package eu.premium.stable.service;

import eu.premium.stable.service.dto.RaceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Race.
 */
public interface RaceService {

    /**
     * Save a race.
     *
     * @param raceDTO the entity to save
     * @return the persisted entity
     */
    RaceDTO save(RaceDTO raceDTO);

    /**
     * Get all the races.
     *
     * @return the list of entities
     */
    List<RaceDTO> findAll();


    /**
     * Get the "id" race.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RaceDTO> findOne(Long id);

    /**
     * Delete the "id" race.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the race corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<RaceDTO> search(String query);
}
