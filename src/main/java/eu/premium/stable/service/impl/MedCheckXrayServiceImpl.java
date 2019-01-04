package eu.premium.stable.service.impl;

import eu.premium.stable.service.MedCheckXrayService;
import eu.premium.stable.domain.MedCheckXray;
import eu.premium.stable.repository.MedCheckXrayRepository;
import eu.premium.stable.repository.search.MedCheckXraySearchRepository;
import eu.premium.stable.service.dto.MedCheckXrayDTO;
import eu.premium.stable.service.mapper.MedCheckXrayMapper;
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
 * Service Implementation for managing MedCheckXray.
 */
@Service
@Transactional
public class MedCheckXrayServiceImpl implements MedCheckXrayService {

    private final Logger log = LoggerFactory.getLogger(MedCheckXrayServiceImpl.class);

    private final MedCheckXrayRepository medCheckXrayRepository;

    private final MedCheckXrayMapper medCheckXrayMapper;

    private final MedCheckXraySearchRepository medCheckXraySearchRepository;

    public MedCheckXrayServiceImpl(MedCheckXrayRepository medCheckXrayRepository, MedCheckXrayMapper medCheckXrayMapper, MedCheckXraySearchRepository medCheckXraySearchRepository) {
        this.medCheckXrayRepository = medCheckXrayRepository;
        this.medCheckXrayMapper = medCheckXrayMapper;
        this.medCheckXraySearchRepository = medCheckXraySearchRepository;
    }

    /**
     * Save a medCheckXray.
     *
     * @param medCheckXrayDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedCheckXrayDTO save(MedCheckXrayDTO medCheckXrayDTO) {
        log.debug("Request to save MedCheckXray : {}", medCheckXrayDTO);

        MedCheckXray medCheckXray = medCheckXrayMapper.toEntity(medCheckXrayDTO);
        medCheckXray = medCheckXrayRepository.save(medCheckXray);
        MedCheckXrayDTO result = medCheckXrayMapper.toDto(medCheckXray);
        medCheckXraySearchRepository.save(medCheckXray);
        return result;
    }

    /**
     * Get all the medCheckXrays.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckXrayDTO> findAll() {
        log.debug("Request to get all MedCheckXrays");
        return medCheckXrayRepository.findAll().stream()
            .map(medCheckXrayMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one medCheckXray by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MedCheckXrayDTO> findOne(Long id) {
        log.debug("Request to get MedCheckXray : {}", id);
        return medCheckXrayRepository.findById(id)
            .map(medCheckXrayMapper::toDto);
    }

    /**
     * Delete the medCheckXray by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MedCheckXray : {}", id);
        medCheckXrayRepository.deleteById(id);
        medCheckXraySearchRepository.deleteById(id);
    }

    /**
     * Search for the medCheckXray corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckXrayDTO> search(String query) {
        log.debug("Request to search MedCheckXrays for query {}", query);
        return StreamSupport
            .stream(medCheckXraySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(medCheckXrayMapper::toDto)
            .collect(Collectors.toList());
    }
}
