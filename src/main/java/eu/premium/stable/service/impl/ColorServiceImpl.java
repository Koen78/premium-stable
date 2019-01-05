package eu.premium.stable.service.impl;

import eu.premium.stable.service.ColorService;
import eu.premium.stable.domain.Color;
import eu.premium.stable.repository.ColorRepository;
import eu.premium.stable.repository.search.ColorSearchRepository;
import eu.premium.stable.service.dto.ColorDTO;
import eu.premium.stable.service.mapper.ColorMapper;
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
 * Service Implementation for managing Color.
 */
@Service
@Transactional
public class ColorServiceImpl implements ColorService {

    private final Logger log = LoggerFactory.getLogger(ColorServiceImpl.class);

    private final ColorRepository colorRepository;

    private final ColorMapper colorMapper;

    private final ColorSearchRepository colorSearchRepository;

    public ColorServiceImpl(ColorRepository colorRepository, ColorMapper colorMapper, ColorSearchRepository colorSearchRepository) {
        this.colorRepository = colorRepository;
        this.colorMapper = colorMapper;
        this.colorSearchRepository = colorSearchRepository;
    }

    /**
     * Save a color.
     *
     * @param colorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ColorDTO save(ColorDTO colorDTO) {
        log.debug("Request to save Color : {}", colorDTO);

        Color color = colorMapper.toEntity(colorDTO);
        color = colorRepository.save(color);
        ColorDTO result = colorMapper.toDto(color);
        colorSearchRepository.save(color);
        return result;
    }

    /**
     * Get all the colors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ColorDTO> findAll() {
        log.debug("Request to get all Colors");
        return colorRepository.findAll().stream()
            .map(colorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one color by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ColorDTO> findOne(Long id) {
        log.debug("Request to get Color : {}", id);
        return colorRepository.findById(id)
            .map(colorMapper::toDto);
    }

    /**
     * Delete the color by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Color : {}", id);
        colorRepository.deleteById(id);
        colorSearchRepository.deleteById(id);
    }

    /**
     * Search for the color corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ColorDTO> search(String query) {
        log.debug("Request to search Colors for query {}", query);
        return StreamSupport
            .stream(colorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(colorMapper::toDto)
            .collect(Collectors.toList());
    }
}
