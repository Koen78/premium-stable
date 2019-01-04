package eu.premium.stable.service.impl;

import eu.premium.stable.service.LevelDressageHisService;
import eu.premium.stable.domain.LevelDressageHis;
import eu.premium.stable.repository.LevelDressageHisRepository;
import eu.premium.stable.repository.search.LevelDressageHisSearchRepository;
import eu.premium.stable.service.dto.LevelDressageHisDTO;
import eu.premium.stable.service.mapper.LevelDressageHisMapper;
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
 * Service Implementation for managing LevelDressageHis.
 */
@Service
@Transactional
public class LevelDressageHisServiceImpl implements LevelDressageHisService {

    private final Logger log = LoggerFactory.getLogger(LevelDressageHisServiceImpl.class);

    private final LevelDressageHisRepository levelDressageHisRepository;

    private final LevelDressageHisMapper levelDressageHisMapper;

    private final LevelDressageHisSearchRepository levelDressageHisSearchRepository;

    public LevelDressageHisServiceImpl(LevelDressageHisRepository levelDressageHisRepository, LevelDressageHisMapper levelDressageHisMapper, LevelDressageHisSearchRepository levelDressageHisSearchRepository) {
        this.levelDressageHisRepository = levelDressageHisRepository;
        this.levelDressageHisMapper = levelDressageHisMapper;
        this.levelDressageHisSearchRepository = levelDressageHisSearchRepository;
    }

    /**
     * Save a levelDressageHis.
     *
     * @param levelDressageHisDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LevelDressageHisDTO save(LevelDressageHisDTO levelDressageHisDTO) {
        log.debug("Request to save LevelDressageHis : {}", levelDressageHisDTO);

        LevelDressageHis levelDressageHis = levelDressageHisMapper.toEntity(levelDressageHisDTO);
        levelDressageHis = levelDressageHisRepository.save(levelDressageHis);
        LevelDressageHisDTO result = levelDressageHisMapper.toDto(levelDressageHis);
        levelDressageHisSearchRepository.save(levelDressageHis);
        return result;
    }

    /**
     * Get all the levelDressageHis.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelDressageHisDTO> findAll() {
        log.debug("Request to get all LevelDressageHis");
        return levelDressageHisRepository.findAll().stream()
            .map(levelDressageHisMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one levelDressageHis by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LevelDressageHisDTO> findOne(Long id) {
        log.debug("Request to get LevelDressageHis : {}", id);
        return levelDressageHisRepository.findById(id)
            .map(levelDressageHisMapper::toDto);
    }

    /**
     * Delete the levelDressageHis by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LevelDressageHis : {}", id);
        levelDressageHisRepository.deleteById(id);
        levelDressageHisSearchRepository.deleteById(id);
    }

    /**
     * Search for the levelDressageHis corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelDressageHisDTO> search(String query) {
        log.debug("Request to search LevelDressageHis for query {}", query);
        return StreamSupport
            .stream(levelDressageHisSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(levelDressageHisMapper::toDto)
            .collect(Collectors.toList());
    }
}
