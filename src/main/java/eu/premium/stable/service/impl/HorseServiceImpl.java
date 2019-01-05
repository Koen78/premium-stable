package eu.premium.stable.service.impl;

import eu.premium.stable.service.HorseService;
import eu.premium.stable.domain.Horse;
import eu.premium.stable.repository.HorseRepository;
import eu.premium.stable.repository.search.HorseSearchRepository;
import eu.premium.stable.service.dto.HorseDTO;
import eu.premium.stable.service.mapper.HorseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Horse.
 */
@Service
@Transactional
public class HorseServiceImpl implements HorseService {

    private final Logger log = LoggerFactory.getLogger(HorseServiceImpl.class);

    private final HorseRepository horseRepository;

    private final HorseMapper horseMapper;

    private final HorseSearchRepository horseSearchRepository;

    public HorseServiceImpl(HorseRepository horseRepository, HorseMapper horseMapper, HorseSearchRepository horseSearchRepository) {
        this.horseRepository = horseRepository;
        this.horseMapper = horseMapper;
        this.horseSearchRepository = horseSearchRepository;
    }

    /**
     * Save a horse.
     *
     * @param horseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public HorseDTO save(HorseDTO horseDTO) {
        log.debug("Request to save Horse : {}", horseDTO);

        Horse horse = horseMapper.toEntity(horseDTO);
        horse = horseRepository.save(horse);
        HorseDTO result = horseMapper.toDto(horse);
        horseSearchRepository.save(horse);
        return result;
    }

    /**
     * Get all the horses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HorseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Horses");
        return horseRepository.findAll(pageable)
            .map(horseMapper::toDto);
    }


    /**
     * Get one horse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HorseDTO> findOne(Long id) {
        log.debug("Request to get Horse : {}", id);
        return horseRepository.findById(id)
            .map(horseMapper::toDto);
    }

    /**
     * Delete the horse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Horse : {}", id);
        horseRepository.deleteById(id);
        horseSearchRepository.deleteById(id);
    }

    /**
     * Search for the horse corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<HorseDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Horses for query {}", query);
        return horseSearchRepository.search(queryStringQuery(query), pageable)
            .map(horseMapper::toDto);
    }
}
