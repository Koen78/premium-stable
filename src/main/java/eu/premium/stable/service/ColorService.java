package eu.premium.stable.service;

import eu.premium.stable.service.dto.ColorDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Color.
 */
public interface ColorService {

    /**
     * Save a color.
     *
     * @param colorDTO the entity to save
     * @return the persisted entity
     */
    ColorDTO save(ColorDTO colorDTO);

    /**
     * Get all the colors.
     *
     * @return the list of entities
     */
    List<ColorDTO> findAll();


    /**
     * Get the "id" color.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ColorDTO> findOne(Long id);

    /**
     * Delete the "id" color.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the color corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ColorDTO> search(String query);
}
