package eu.premium.stable.service;

import eu.premium.stable.service.dto.CompetitionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Competition.
 */
public interface CompetitionService {

    /**
     * Save a competition.
     *
     * @param competitionDTO the entity to save
     * @return the persisted entity
     */
    CompetitionDTO save(CompetitionDTO competitionDTO);

    /**
     * Get all the competitions.
     *
     * @return the list of entities
     */
    List<CompetitionDTO> findAll();


    /**
     * Get the "id" competition.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CompetitionDTO> findOne(Long id);

    /**
     * Delete the "id" competition.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the competition corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CompetitionDTO> search(String query);
}
