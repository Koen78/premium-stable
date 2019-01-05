package eu.premium.stable.service;

import eu.premium.stable.service.dto.EquineSpeciesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing EquineSpecies.
 */
public interface EquineSpeciesService {

    /**
     * Save a equineSpecies.
     *
     * @param equineSpeciesDTO the entity to save
     * @return the persisted entity
     */
    EquineSpeciesDTO save(EquineSpeciesDTO equineSpeciesDTO);

    /**
     * Get all the equineSpecies.
     *
     * @return the list of entities
     */
    List<EquineSpeciesDTO> findAll();


    /**
     * Get the "id" equineSpecies.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<EquineSpeciesDTO> findOne(Long id);

    /**
     * Delete the "id" equineSpecies.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the equineSpecies corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<EquineSpeciesDTO> search(String query);
}
