package eu.premium.stable.service.impl;

import eu.premium.stable.service.LevelJumpingHisService;
import eu.premium.stable.domain.LevelJumpingHis;
import eu.premium.stable.repository.LevelJumpingHisRepository;
import eu.premium.stable.repository.search.LevelJumpingHisSearchRepository;
import eu.premium.stable.service.dto.LevelJumpingHisDTO;
import eu.premium.stable.service.mapper.LevelJumpingHisMapper;
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
 * Service Implementation for managing LevelJumpingHis.
 */
@Service
@Transactional
public class LevelJumpingHisServiceImpl implements LevelJumpingHisService {

    private final Logger log = LoggerFactory.getLogger(LevelJumpingHisServiceImpl.class);

    private final LevelJumpingHisRepository levelJumpingHisRepository;

    private final LevelJumpingHisMapper levelJumpingHisMapper;

    private final LevelJumpingHisSearchRepository levelJumpingHisSearchRepository;

    public LevelJumpingHisServiceImpl(LevelJumpingHisRepository levelJumpingHisRepository, LevelJumpingHisMapper levelJumpingHisMapper, LevelJumpingHisSearchRepository levelJumpingHisSearchRepository) {
        this.levelJumpingHisRepository = levelJumpingHisRepository;
        this.levelJumpingHisMapper = levelJumpingHisMapper;
        this.levelJumpingHisSearchRepository = levelJumpingHisSearchRepository;
    }

    /**
     * Save a levelJumpingHis.
     *
     * @param levelJumpingHisDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LevelJumpingHisDTO save(LevelJumpingHisDTO levelJumpingHisDTO) {
        log.debug("Request to save LevelJumpingHis : {}", levelJumpingHisDTO);

        LevelJumpingHis levelJumpingHis = levelJumpingHisMapper.toEntity(levelJumpingHisDTO);
        levelJumpingHis = levelJumpingHisRepository.save(levelJumpingHis);
        LevelJumpingHisDTO result = levelJumpingHisMapper.toDto(levelJumpingHis);
        levelJumpingHisSearchRepository.save(levelJumpingHis);
        return result;
    }

    /**
     * Get all the levelJumpingHis.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelJumpingHisDTO> findAll() {
        log.debug("Request to get all LevelJumpingHis");
        return levelJumpingHisRepository.findAll().stream()
            .map(levelJumpingHisMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one levelJumpingHis by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LevelJumpingHisDTO> findOne(Long id) {
        log.debug("Request to get LevelJumpingHis : {}", id);
        return levelJumpingHisRepository.findById(id)
            .map(levelJumpingHisMapper::toDto);
    }

    /**
     * Delete the levelJumpingHis by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LevelJumpingHis : {}", id);
        levelJumpingHisRepository.deleteById(id);
        levelJumpingHisSearchRepository.deleteById(id);
    }

    /**
     * Search for the levelJumpingHis corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelJumpingHisDTO> search(String query) {
        log.debug("Request to search LevelJumpingHis for query {}", query);
        return StreamSupport
            .stream(levelJumpingHisSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(levelJumpingHisMapper::toDto)
            .collect(Collectors.toList());
    }
}
