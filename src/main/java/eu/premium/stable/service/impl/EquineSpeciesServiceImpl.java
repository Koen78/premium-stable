package eu.premium.stable.service.impl;

import eu.premium.stable.service.EquineSpeciesService;
import eu.premium.stable.domain.EquineSpecies;
import eu.premium.stable.repository.EquineSpeciesRepository;
import eu.premium.stable.repository.search.EquineSpeciesSearchRepository;
import eu.premium.stable.service.dto.EquineSpeciesDTO;
import eu.premium.stable.service.mapper.EquineSpeciesMapper;
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
 * Service Implementation for managing EquineSpecies.
 */
@Service
@Transactional
public class EquineSpeciesServiceImpl implements EquineSpeciesService {

    private final Logger log = LoggerFactory.getLogger(EquineSpeciesServiceImpl.class);

    private final EquineSpeciesRepository equineSpeciesRepository;

    private final EquineSpeciesMapper equineSpeciesMapper;

    private final EquineSpeciesSearchRepository equineSpeciesSearchRepository;

    public EquineSpeciesServiceImpl(EquineSpeciesRepository equineSpeciesRepository, EquineSpeciesMapper equineSpeciesMapper, EquineSpeciesSearchRepository equineSpeciesSearchRepository) {
        this.equineSpeciesRepository = equineSpeciesRepository;
        this.equineSpeciesMapper = equineSpeciesMapper;
        this.equineSpeciesSearchRepository = equineSpeciesSearchRepository;
    }

    /**
     * Save a equineSpecies.
     *
     * @param equineSpeciesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EquineSpeciesDTO save(EquineSpeciesDTO equineSpeciesDTO) {
        log.debug("Request to save EquineSpecies : {}", equineSpeciesDTO);

        EquineSpecies equineSpecies = equineSpeciesMapper.toEntity(equineSpeciesDTO);
        equineSpecies = equineSpeciesRepository.save(equineSpecies);
        EquineSpeciesDTO result = equineSpeciesMapper.toDto(equineSpecies);
        equineSpeciesSearchRepository.save(equineSpecies);
        return result;
    }

    /**
     * Get all the equineSpecies.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EquineSpeciesDTO> findAll() {
        log.debug("Request to get all EquineSpecies");
        return equineSpeciesRepository.findAll().stream()
            .map(equineSpeciesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one equineSpecies by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EquineSpeciesDTO> findOne(Long id) {
        log.debug("Request to get EquineSpecies : {}", id);
        return equineSpeciesRepository.findById(id)
            .map(equineSpeciesMapper::toDto);
    }

    /**
     * Delete the equineSpecies by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EquineSpecies : {}", id);
        equineSpeciesRepository.deleteById(id);
        equineSpeciesSearchRepository.deleteById(id);
    }

    /**
     * Search for the equineSpecies corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EquineSpeciesDTO> search(String query) {
        log.debug("Request to search EquineSpecies for query {}", query);
        return StreamSupport
            .stream(equineSpeciesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(equineSpeciesMapper::toDto)
            .collect(Collectors.toList());
    }
}
