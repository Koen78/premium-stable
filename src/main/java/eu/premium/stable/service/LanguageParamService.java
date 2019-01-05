package eu.premium.stable.service;

import eu.premium.stable.service.dto.LanguageParamDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing LanguageParam.
 */
public interface LanguageParamService {

    /**
     * Save a languageParam.
     *
     * @param languageParamDTO the entity to save
     * @return the persisted entity
     */
    LanguageParamDTO save(LanguageParamDTO languageParamDTO);

    /**
     * Get all the languageParams.
     *
     * @return the list of entities
     */
    List<LanguageParamDTO> findAll();


    /**
     * Get the "id" languageParam.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<LanguageParamDTO> findOne(Long id);

    /**
     * Delete the "id" languageParam.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the languageParam corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<LanguageParamDTO> search(String query);
}
