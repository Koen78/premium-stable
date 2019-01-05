package eu.premium.stable.service.impl;

import eu.premium.stable.service.LevelDressageService;
import eu.premium.stable.domain.LevelDressage;
import eu.premium.stable.repository.LevelDressageRepository;
import eu.premium.stable.repository.search.LevelDressageSearchRepository;
import eu.premium.stable.service.dto.LevelDressageDTO;
import eu.premium.stable.service.mapper.LevelDressageMapper;
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
 * Service Implementation for managing LevelDressage.
 */
@Service
@Transactional
public class LevelDressageServiceImpl implements LevelDressageService {

    private final Logger log = LoggerFactory.getLogger(LevelDressageServiceImpl.class);

    private final LevelDressageRepository levelDressageRepository;

    private final LevelDressageMapper levelDressageMapper;

    private final LevelDressageSearchRepository levelDressageSearchRepository;

    public LevelDressageServiceImpl(LevelDressageRepository levelDressageRepository, LevelDressageMapper levelDressageMapper, LevelDressageSearchRepository levelDressageSearchRepository) {
        this.levelDressageRepository = levelDressageRepository;
        this.levelDressageMapper = levelDressageMapper;
        this.levelDressageSearchRepository = levelDressageSearchRepository;
    }

    /**
     * Save a levelDressage.
     *
     * @param levelDressageDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LevelDressageDTO save(LevelDressageDTO levelDressageDTO) {
        log.debug("Request to save LevelDressage : {}", levelDressageDTO);

        LevelDressage levelDressage = levelDressageMapper.toEntity(levelDressageDTO);
        levelDressage = levelDressageRepository.save(levelDressage);
        LevelDressageDTO result = levelDressageMapper.toDto(levelDressage);
        levelDressageSearchRepository.save(levelDressage);
        return result;
    }

    /**
     * Get all the levelDressages.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelDressageDTO> findAll() {
        log.debug("Request to get all LevelDressages");
        return levelDressageRepository.findAll().stream()
            .map(levelDressageMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one levelDressage by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LevelDressageDTO> findOne(Long id) {
        log.debug("Request to get LevelDressage : {}", id);
        return levelDressageRepository.findById(id)
            .map(levelDressageMapper::toDto);
    }

    /**
     * Delete the levelDressage by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LevelDressage : {}", id);
        levelDressageRepository.deleteById(id);
        levelDressageSearchRepository.deleteById(id);
    }

    /**
     * Search for the levelDressage corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelDressageDTO> search(String query) {
        log.debug("Request to search LevelDressages for query {}", query);
        return StreamSupport
            .stream(levelDressageSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(levelDressageMapper::toDto)
            .collect(Collectors.toList());
    }
}
