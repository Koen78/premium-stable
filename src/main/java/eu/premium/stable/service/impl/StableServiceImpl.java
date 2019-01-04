package eu.premium.stable.service.impl;

import eu.premium.stable.service.StableService;
import eu.premium.stable.domain.Stable;
import eu.premium.stable.repository.StableRepository;
import eu.premium.stable.repository.search.StableSearchRepository;
import eu.premium.stable.service.dto.StableDTO;
import eu.premium.stable.service.mapper.StableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Stable.
 */
@Service
@Transactional
public class StableServiceImpl implements StableService {

    private final Logger log = LoggerFactory.getLogger(StableServiceImpl.class);

    private final StableRepository stableRepository;

    private final StableMapper stableMapper;

    private final StableSearchRepository stableSearchRepository;

    public StableServiceImpl(StableRepository stableRepository, StableMapper stableMapper, StableSearchRepository stableSearchRepository) {
        this.stableRepository = stableRepository;
        this.stableMapper = stableMapper;
        this.stableSearchRepository = stableSearchRepository;
    }

    /**
     * Save a stable.
     *
     * @param stableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public StableDTO save(StableDTO stableDTO) {
        log.debug("Request to save Stable : {}", stableDTO);

        Stable stable = stableMapper.toEntity(stableDTO);
        stable = stableRepository.save(stable);
        StableDTO result = stableMapper.toDto(stable);
        stableSearchRepository.save(stable);
        return result;
    }

    /**
     * Get all the stables.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StableDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stables");
        return stableRepository.findAll(pageable)
            .map(stableMapper::toDto);
    }


    /**
     * Get one stable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StableDTO> findOne(Long id) {
        log.debug("Request to get Stable : {}", id);
        return stableRepository.findById(id)
            .map(stableMapper::toDto);
    }

    /**
     * Delete the stable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Stable : {}", id);
        stableRepository.deleteById(id);
        stableSearchRepository.deleteById(id);
    }

    /**
     * Search for the stable corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StableDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Stables for query {}", query);
        return stableSearchRepository.search(queryStringQuery(query), pageable)
            .map(stableMapper::toDto);
    }
}
