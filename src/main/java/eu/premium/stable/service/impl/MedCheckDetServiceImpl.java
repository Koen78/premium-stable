package eu.premium.stable.service.impl;

import eu.premium.stable.service.MedCheckDetService;
import eu.premium.stable.domain.MedCheckDet;
import eu.premium.stable.repository.MedCheckDetRepository;
import eu.premium.stable.repository.search.MedCheckDetSearchRepository;
import eu.premium.stable.service.dto.MedCheckDetDTO;
import eu.premium.stable.service.mapper.MedCheckDetMapper;
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
 * Service Implementation for managing MedCheckDet.
 */
@Service
@Transactional
public class MedCheckDetServiceImpl implements MedCheckDetService {

    private final Logger log = LoggerFactory.getLogger(MedCheckDetServiceImpl.class);

    private final MedCheckDetRepository medCheckDetRepository;

    private final MedCheckDetMapper medCheckDetMapper;

    private final MedCheckDetSearchRepository medCheckDetSearchRepository;

    public MedCheckDetServiceImpl(MedCheckDetRepository medCheckDetRepository, MedCheckDetMapper medCheckDetMapper, MedCheckDetSearchRepository medCheckDetSearchRepository) {
        this.medCheckDetRepository = medCheckDetRepository;
        this.medCheckDetMapper = medCheckDetMapper;
        this.medCheckDetSearchRepository = medCheckDetSearchRepository;
    }

    /**
     * Save a medCheckDet.
     *
     * @param medCheckDetDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MedCheckDetDTO save(MedCheckDetDTO medCheckDetDTO) {
        log.debug("Request to save MedCheckDet : {}", medCheckDetDTO);

        MedCheckDet medCheckDet = medCheckDetMapper.toEntity(medCheckDetDTO);
        medCheckDet = medCheckDetRepository.save(medCheckDet);
        MedCheckDetDTO result = medCheckDetMapper.toDto(medCheckDet);
        medCheckDetSearchRepository.save(medCheckDet);
        return result;
    }

    /**
     * Get all the medCheckDets.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckDetDTO> findAll() {
        log.debug("Request to get all MedCheckDets");
        return medCheckDetRepository.findAll().stream()
            .map(medCheckDetMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one medCheckDet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MedCheckDetDTO> findOne(Long id) {
        log.debug("Request to get MedCheckDet : {}", id);
        return medCheckDetRepository.findById(id)
            .map(medCheckDetMapper::toDto);
    }

    /**
     * Delete the medCheckDet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MedCheckDet : {}", id);
        medCheckDetRepository.deleteById(id);
        medCheckDetSearchRepository.deleteById(id);
    }

    /**
     * Search for the medCheckDet corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MedCheckDetDTO> search(String query) {
        log.debug("Request to search MedCheckDets for query {}", query);
        return StreamSupport
            .stream(medCheckDetSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(medCheckDetMapper::toDto)
            .collect(Collectors.toList());
    }
}
