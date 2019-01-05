package eu.premium.stable.service.impl;

import eu.premium.stable.service.VideoService;
import eu.premium.stable.domain.Video;
import eu.premium.stable.repository.VideoRepository;
import eu.premium.stable.repository.search.VideoSearchRepository;
import eu.premium.stable.service.dto.VideoDTO;
import eu.premium.stable.service.mapper.VideoMapper;
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
 * Service Implementation for managing Video.
 */
@Service
@Transactional
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    private final VideoMapper videoMapper;

    private final VideoSearchRepository videoSearchRepository;

    public VideoServiceImpl(VideoRepository videoRepository, VideoMapper videoMapper, VideoSearchRepository videoSearchRepository) {
        this.videoRepository = videoRepository;
        this.videoMapper = videoMapper;
        this.videoSearchRepository = videoSearchRepository;
    }

    /**
     * Save a video.
     *
     * @param videoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VideoDTO save(VideoDTO videoDTO) {
        log.debug("Request to save Video : {}", videoDTO);

        Video video = videoMapper.toEntity(videoDTO);
        video = videoRepository.save(video);
        VideoDTO result = videoMapper.toDto(video);
        videoSearchRepository.save(video);
        return result;
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VideoDTO> findAll() {
        log.debug("Request to get all Videos");
        return videoRepository.findAll().stream()
            .map(videoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one video by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VideoDTO> findOne(Long id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findById(id)
            .map(videoMapper::toDto);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
        videoSearchRepository.deleteById(id);
    }

    /**
     * Search for the video corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VideoDTO> search(String query) {
        log.debug("Request to search Videos for query {}", query);
        return StreamSupport
            .stream(videoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(videoMapper::toDto)
            .collect(Collectors.toList());
    }
}
