package eu.premium.stable.service;

import eu.premium.stable.service.dto.HorseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Horse.
 */
public interface HorseService {

    /**
     * Save a horse.
     *
     * @param horseDTO the entity to save
     * @return the persisted entity
     */
    HorseDTO save(HorseDTO horseDTO);

    /**
     * Get all the horses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<HorseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" horse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HorseDTO> findOne(Long id);

    /**
     * Delete the "id" horse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the horse corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<HorseDTO> search(String query, Pageable pageable);
}
