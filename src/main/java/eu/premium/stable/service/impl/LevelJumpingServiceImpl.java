package eu.premium.stable.service.impl;

import eu.premium.stable.service.LevelJumpingService;
import eu.premium.stable.domain.LevelJumping;
import eu.premium.stable.repository.LevelJumpingRepository;
import eu.premium.stable.repository.search.LevelJumpingSearchRepository;
import eu.premium.stable.service.dto.LevelJumpingDTO;
import eu.premium.stable.service.mapper.LevelJumpingMapper;
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
 * Service Implementation for managing LevelJumping.
 */
@Service
@Transactional
public class LevelJumpingServiceImpl implements LevelJumpingService {

    private final Logger log = LoggerFactory.getLogger(LevelJumpingServiceImpl.class);

    private final LevelJumpingRepository levelJumpingRepository;

    private final LevelJumpingMapper levelJumpingMapper;

    private final LevelJumpingSearchRepository levelJumpingSearchRepository;

    public LevelJumpingServiceImpl(LevelJumpingRepository levelJumpingRepository, LevelJumpingMapper levelJumpingMapper, LevelJumpingSearchRepository levelJumpingSearchRepository) {
        this.levelJumpingRepository = levelJumpingRepository;
        this.levelJumpingMapper = levelJumpingMapper;
        this.levelJumpingSearchRepository = levelJumpingSearchRepository;
    }

    /**
     * Save a levelJumping.
     *
     * @param levelJumpingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LevelJumpingDTO save(LevelJumpingDTO levelJumpingDTO) {
        log.debug("Request to save LevelJumping : {}", levelJumpingDTO);

        LevelJumping levelJumping = levelJumpingMapper.toEntity(levelJumpingDTO);
        levelJumping = levelJumpingRepository.save(levelJumping);
        LevelJumpingDTO result = levelJumpingMapper.toDto(levelJumping);
        levelJumpingSearchRepository.save(levelJumping);
        return result;
    }

    /**
     * Get all the levelJumpings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelJumpingDTO> findAll() {
        log.debug("Request to get all LevelJumpings");
        return levelJumpingRepository.findAll().stream()
            .map(levelJumpingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one levelJumping by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<LevelJumpingDTO> findOne(Long id) {
        log.debug("Request to get LevelJumping : {}", id);
        return levelJumpingRepository.findById(id)
            .map(levelJumpingMapper::toDto);
    }

    /**
     * Delete the levelJumping by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete LevelJumping : {}", id);
        levelJumpingRepository.deleteById(id);
        levelJumpingSearchRepository.deleteById(id);
    }

    /**
     * Search for the levelJumping corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<LevelJumpingDTO> search(String query) {
        log.debug("Request to search LevelJumpings for query {}", query);
        return StreamSupport
            .stream(levelJumpingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(levelJumpingMapper::toDto)
            .collect(Collectors.toList());
    }
}
