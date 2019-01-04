package eu.premium.stable.service.impl;

import eu.premium.stable.service.MedCheckService;
import eu.premium.stable.domain.MedCheck;
import eu.premium.stable.repository.MedCheckRepository;
import eu.premium.stable.repository.search.MedCheckSearchRepository;
import eu.premium.stable.service.dto.MedCheckDTO;
import eu.premium.stable.service.mapper.MedCheckMapper;
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
 * Service Implementation for managing MedCheck.
 */
@Service
@Transactional
public class MedCheckServiceImpl implements MedCheckService {

    private final Logger log = LoggerFactory.getLogger(MedCheckServiceImpl.class);

    private final MedCheckRepository medCheckRepository;

    private final MedCheckMapper medCheckMapper;

    private final MedCheckSearchRepository medCheckSearchRepository;

    public MedCheckServiceImpl(MedCheckRepository medCheckRepository, MedCheckMapper medCheckMapper, MedCheckSearchRepository medCheckSearchRepository) {
        this.medCheckRepository = medCheckRepository;
        this.medCheckMapper = medCheckMapper;
        this.medCheckSearchRepository = medCheckSearchRepository;
    }

    /**
     * Save a medCheck.
     *
     * @param medCheckDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedCheckDTO save(MedCheckDTO medCheckDTO) {
        log.debug("Request to save MedCheck : {}", medCheckDTO);

        MedCheck medCheck = medCheckMapper.toEntity(medCheckDTO);
        medCheck = medCheckRepository.save(medCheck);
        MedCheckDTO result = medCheckMapper.toDto(medCheck);
        medCheckSearchRepository.save(medCheck);
        return result;
    }

    /**
     * Get all the medChecks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckDTO> findAll() {
        log.debug("Request to get all MedChecks");
        return medCheckRepository.findAll().stream()
            .map(medCheckMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one medCheck by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MedCheckDTO> findOne(Long id) {
        log.debug("Request to get MedCheck : {}", id);
        return medCheckRepository.findById(id)
            .map(medCheckMapper::toDto);
    }

    /**
     * Delete the medCheck by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MedCheck : {}", id);
        medCheckRepository.deleteById(id);
        medCheckSearchRepository.deleteById(id);
    }

    /**
     * Search for the medCheck corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckDTO> search(String query) {
        log.debug("Request to search MedChecks for query {}", query);
        return StreamSupport
            .stream(medCheckSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(medCheckMapper::toDto)
            .collect(Collectors.toList());
    }
}
