package eu.premium.stable.service.impl;

import eu.premium.stable.service.GenderService;
import eu.premium.stable.domain.Gender;
import eu.premium.stable.repository.GenderRepository;
import eu.premium.stable.repository.search.GenderSearchRepository;
import eu.premium.stable.service.dto.GenderDTO;
import eu.premium.stable.service.mapper.GenderMapper;
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
 * Service Implementation for managing Gender.
 */
@Service
@Transactional
public class GenderServiceImpl implements GenderService {

    private final Logger log = LoggerFactory.getLogger(GenderServiceImpl.class);

    private final GenderRepository genderRepository;

    private final GenderMapper genderMapper;

    private final GenderSearchRepository genderSearchRepository;

    public GenderServiceImpl(GenderRepository genderRepository, GenderMapper genderMapper, GenderSearchRepository genderSearchRepository) {
        this.genderRepository = genderRepository;
        this.genderMapper = genderMapper;
        this.genderSearchRepository = genderSearchRepository;
    }

    /**
     * Save a gender.
     *
     * @param genderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GenderDTO save(GenderDTO genderDTO) {
        log.debug("Request to save Gender : {}", genderDTO);

        Gender gender = genderMapper.toEntity(genderDTO);
        gender = genderRepository.save(gender);
        GenderDTO result = genderMapper.toDto(gender);
        genderSearchRepository.save(gender);
        return result;
    }

    /**
     * Get all the genders.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GenderDTO> findAll() {
        log.debug("Request to get all Genders");
        return genderRepository.findAll().stream()
            .map(genderMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one gender by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<GenderDTO> findOne(Long id) {
        log.debug("Request to get Gender : {}", id);
        return genderRepository.findById(id)
            .map(genderMapper::toDto);
    }

    /**
     * Delete the gender by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Gender : {}", id);
        genderRepository.deleteById(id);
        genderSearchRepository.deleteById(id);
    }

    /**
     * Search for the gender corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GenderDTO> search(String query) {
        log.debug("Request to search Genders for query {}", query);
        return StreamSupport
            .stream(genderSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(genderMapper::toDto)
            .collect(Collectors.toList());
    }
}
