package eu.premium.stable.service.impl;

import eu.premium.stable.service.CompetitionService;
import eu.premium.stable.domain.Competition;
import eu.premium.stable.repository.CompetitionRepository;
import eu.premium.stable.repository.search.CompetitionSearchRepository;
import eu.premium.stable.service.dto.CompetitionDTO;
import eu.premium.stable.service.mapper.CompetitionMapper;
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
 * Service Implementation for managing Competition.
 */
@Service
@Transactional
public class CompetitionServiceImpl implements CompetitionService {

    private final Logger log = LoggerFactory.getLogger(CompetitionServiceImpl.class);

    private final CompetitionRepository competitionRepository;

    private final CompetitionMapper competitionMapper;

    private final CompetitionSearchRepository competitionSearchRepository;

    public CompetitionServiceImpl(CompetitionRepository competitionRepository, CompetitionMapper competitionMapper, CompetitionSearchRepository competitionSearchRepository) {
        this.competitionRepository = competitionRepository;
        this.competitionMapper = competitionMapper;
        this.competitionSearchRepository = competitionSearchRepository;
    }

    /**
     * Save a competition.
     *
     * @param competitionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CompetitionDTO save(CompetitionDTO competitionDTO) {
        log.debug("Request to save Competition : {}", competitionDTO);

        Competition competition = competitionMapper.toEntity(competitionDTO);
        competition = competitionRepository.save(competition);
        CompetitionDTO result = competitionMapper.toDto(competition);
        competitionSearchRepository.save(competition);
        return result;
    }

    /**
     * Get all the competitions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CompetitionDTO> findAll() {
        log.debug("Request to get all Competitions");
        return competitionRepository.findAll().stream()
            .map(competitionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one competition by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CompetitionDTO> findOne(Long id) {
        log.debug("Request to get Competition : {}", id);
        return competitionRepository.findById(id)
            .map(competitionMapper::toDto);
    }

    /**
     * Delete the competition by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Competition : {}", id);
        competitionRepository.deleteById(id);
        competitionSearchRepository.deleteById(id);
    }

    /**
     * Search for the competition corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CompetitionDTO> search(String query) {
        log.debug("Request to search Competitions for query {}", query);
        return StreamSupport
            .stream(competitionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(competitionMapper::toDto)
            .collect(Collectors.toList());
    }
}
