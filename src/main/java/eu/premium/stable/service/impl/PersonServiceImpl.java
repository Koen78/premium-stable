package eu.premium.stable.service.impl;

import eu.premium.stable.service.PersonService;
import eu.premium.stable.domain.Person;
import eu.premium.stable.repository.PersonRepository;
import eu.premium.stable.repository.search.PersonSearchRepository;
import eu.premium.stable.service.dto.PersonDTO;
import eu.premium.stable.service.mapper.PersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Person.
 */
@Service
@Transactional
public class PersonServiceImpl implements PersonService {

    private final Logger log = LoggerFactory.getLogger(PersonServiceImpl.class);

    private final PersonRepository personRepository;

    private final PersonMapper personMapper;

    private final PersonSearchRepository personSearchRepository;

    public PersonServiceImpl(PersonRepository personRepository, PersonMapper personMapper, PersonSearchRepository personSearchRepository) {
        this.personRepository = personRepository;
        this.personMapper = personMapper;
        this.personSearchRepository = personSearchRepository;
    }

    /**
     * Save a person.
     *
     * @param personDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PersonDTO save(PersonDTO personDTO) {
        log.debug("Request to save Person : {}", personDTO);

        Person person = personMapper.toEntity(personDTO);
        person = personRepository.save(person);
        PersonDTO result = personMapper.toDto(person);
        personSearchRepository.save(person);
        return result;
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all People");
        return personRepository.findAll(pageable)
            .map(personMapper::toDto);
    }

    /**
     * Get all the Person with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<PersonDTO> findAllWithEagerRelationships(Pageable pageable) {
        return personRepository.findAllWithEagerRelationships(pageable).map(personMapper::toDto);
    }
    

    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<PersonDTO> findOne(Long id) {
        log.debug("Request to get Person : {}", id);
        return personRepository.findOneWithEagerRelationships(id)
            .map(personMapper::toDto);
    }

    /**
     * Delete the person by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Person : {}", id);
        personRepository.deleteById(id);
        personSearchRepository.deleteById(id);
    }

    /**
     * Search for the person corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PersonDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of People for query {}", query);
        return personSearchRepository.search(queryStringQuery(query), pageable)
            .map(personMapper::toDto);
    }
}
