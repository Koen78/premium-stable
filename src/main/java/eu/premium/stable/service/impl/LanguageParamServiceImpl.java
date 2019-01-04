package eu.premium.stable.service.impl;

import eu.premium.stable.service.LanguageParamService;
import eu.premium.stable.domain.LanguageParam;
import eu.premium.stable.repository.LanguageParamRepository;
import eu.premium.stable.repository.search.LanguageParamSearchRepository;
import eu.premium.stable.service.dto.LanguageParamDTO;
import eu.premium.stable.service.mapper.LanguageParamMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing LanguageParam.
 */
@Service
@Transactional
public class LanguageParamServiceImpl implements LanguageParamService {

    private final Logger log = LoggerFactory.getLogger(LanguageParamServiceImpl.class);

    private final LanguageParamRepository languageParamRepository;

    private final LanguageParamMapper languageParamMapper;

    private final LanguageParamSearchRepository languageParamSearchRepository;

    public LanguageParamServiceImpl(LanguageParamRepository languageParamRepository, LanguageParamMapper languageParamMapper, LanguageParamSearchRepository languageParamSearchRepository) {
        this.languageParamRepository = languageParamRepository;
        this.languageParamMapper = languageParamMapper;
        this.languageParamSearchRepository = languageParamSearchRepository;
    }

    /**
     * Save a languageParam.
     *
     * @param languageParamDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LanguageParamDTO save(LanguageParamDTO languageParamDTO) {
        log.debug("Request to save LanguageParam : {}", languageParamDTO);

        LanguageParam languageParam = languageParamMapper.toEntity(languageParamDTO);
        languageParam = languageParamRepository.save(languageParam);
        LanguageParamDTO result = languageParamMapper.toDto(languageParam);
        languageParamSearchRepository.save(languageParam);
        return result;
    }

    /**
     * Get all the languageParams.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LanguageParamDTO> findAll() {
        log.debug("Request to get all LanguageParams");
        return languageParamRepository.findAll().stream()
            .map(languageParamMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one languageParam by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LanguageParamDTO> findOne(Long id) {
        log.debug("Request to get LanguageParam : {}", id);
        return languageParamRepository.findById(id)
            .map(languageParamMapper::toDto);
    }

    /**
     * Delete the languageParam by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LanguageParam : {}", id);
        languageParamRepository.deleteById(id);
        languageParamSearchRepository.deleteById(id);
    }

    /**
     * Search for the languageParam corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LanguageParamDTO> search(String query) {
        log.debug("Request to search LanguageParams for query {}", query);
        return StreamSupport
            .stream(languageParamSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(languageParamMapper::toDto)
            .collect(Collectors.toList());
    }
}
