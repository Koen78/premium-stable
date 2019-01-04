package eu.premium.stable.service.impl;

import eu.premium.stable.service.RaceService;
import eu.premium.stable.domain.Race;
import eu.premium.stable.repository.RaceRepository;
import eu.premium.stable.repository.search.RaceSearchRepository;
import eu.premium.stable.service.dto.RaceDTO;
import eu.premium.stable.service.mapper.RaceMapper;
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
 * Service Implementation for managing Race.
 */
@Service
@Transactional
public class RaceServiceImpl implements RaceService {

    private final Logger log = LoggerFactory.getLogger(RaceServiceImpl.class);

    private final RaceRepository raceRepository;

    private final RaceMapper raceMapper;

    private final RaceSearchRepository raceSearchRepository;

    public RaceServiceImpl(RaceRepository raceRepository, RaceMapper raceMapper, RaceSearchRepository raceSearchRepository) {
        this.raceRepository = raceRepository;
        this.raceMapper = raceMapper;
        this.raceSearchRepository = raceSearchRepository;
    }

    /**
     * Save a race.
     *
     * @param raceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RaceDTO save(RaceDTO raceDTO) {
        log.debug("Request to save Race : {}", raceDTO);

        Race race = raceMapper.toEntity(raceDTO);
        race = raceRepository.save(race);
        RaceDTO result = raceMapper.toDto(race);
        raceSearchRepository.save(race);
        return result;
    }

    /**
     * Get all the races.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RaceDTO> findAll() {
        log.debug("Request to get all Races");
        return raceRepository.findAll().stream()
            .map(raceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one race by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RaceDTO> findOne(Long id) {
        log.debug("Request to get Race : {}", id);
        return raceRepository.findById(id)
            .map(raceMapper::toDto);
    }

    /**
     * Delete the race by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Race : {}", id);
        raceRepository.deleteById(id);
        raceSearchRepository.deleteById(id);
    }

    /**
     * Search for the race corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RaceDTO> search(String query) {
        log.debug("Request to search Races for query {}", query);
        return StreamSupport
            .stream(raceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(raceMapper::toDto)
            .collect(Collectors.toList());
    }
}
