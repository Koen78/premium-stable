package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.LevelJumpingHisService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.LevelJumpingHisDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing LevelJumpingHis.
 */
@RestController
@RequestMapping("/api")
public class LevelJumpingHisResource {

    private final Logger log = LoggerFactory.getLogger(LevelJumpingHisResource.class);

    private static final String ENTITY_NAME = "levelJumpingHis";

    private final LevelJumpingHisService levelJumpingHisService;

    public LevelJumpingHisResource(LevelJumpingHisService levelJumpingHisService) {
        this.levelJumpingHisService = levelJumpingHisService;
    }

    /**
     * POST  /level-jumping-his : Create a new levelJumpingHis.
     *
     * @param levelJumpingHisDTO the levelJumpingHisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new levelJumpingHisDTO, or with status 400 (Bad Request) if the levelJumpingHis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/level-jumping-his")
    @Timed
    public ResponseEntity<LevelJumpingHisDTO> createLevelJumpingHis(@RequestBody LevelJumpingHisDTO levelJumpingHisDTO) throws URISyntaxException {
        log.debug("REST request to save LevelJumpingHis : {}", levelJumpingHisDTO);
        if (levelJumpingHisDTO.getId() != null) {
            throw new BadRequestAlertException("A new levelJumpingHis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LevelJumpingHisDTO result = levelJumpingHisService.save(levelJumpingHisDTO);
        return ResponseEntity.created(new URI("/api/level-jumping-his/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /level-jumping-his : Updates an existing levelJumpingHis.
     *
     * @param levelJumpingHisDTO the levelJumpingHisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated levelJumpingHisDTO,
     * or with status 400 (Bad Request) if the levelJumpingHisDTO is not valid,
     * or with status 500 (Internal Server Error) if the levelJumpingHisDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/level-jumping-his")
    @Timed
    public ResponseEntity<LevelJumpingHisDTO> updateLevelJumpingHis(@RequestBody LevelJumpingHisDTO levelJumpingHisDTO) throws URISyntaxException {
        log.debug("REST request to update LevelJumpingHis : {}", levelJumpingHisDTO);
        if (levelJumpingHisDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LevelJumpingHisDTO result = levelJumpingHisService.save(levelJumpingHisDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, levelJumpingHisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /level-jumping-his : get all the levelJumpingHis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of levelJumpingHis in body
     */
    @GetMapping("/level-jumping-his")
    @Timed
    public List<LevelJumpingHisDTO> getAllLevelJumpingHis() {
        log.debug("REST request to get all LevelJumpingHis");
        return levelJumpingHisService.findAll();
    }

    /**
     * GET  /level-jumping-his/:id : get the "id" levelJumpingHis.
     *
     * @param id the id of the levelJumpingHisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the levelJumpingHisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/level-jumping-his/{id}")
    @Timed
    public ResponseEntity<LevelJumpingHisDTO> getLevelJumpingHis(@PathVariable Long id) {
        log.debug("REST request to get LevelJumpingHis : {}", id);
        Optional<LevelJumpingHisDTO> levelJumpingHisDTO = levelJumpingHisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelJumpingHisDTO);
    }

    /**
     * DELETE  /level-jumping-his/:id : delete the "id" levelJumpingHis.
     *
     * @param id the id of the levelJumpingHisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/level-jumping-his/{id}")
    @Timed
    public ResponseEntity<Void> deleteLevelJumpingHis(@PathVariable Long id) {
        log.debug("REST request to delete LevelJumpingHis : {}", id);
        levelJumpingHisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/level-jumping-his?query=:query : search for the levelJumpingHis corresponding
     * to the query.
     *
     * @param query the query of the levelJumpingHis search
     * @return the result of the search
     */
    @GetMapping("/_search/level-jumping-his")
    @Timed
    public List<LevelJumpingHisDTO> searchLevelJumpingHis(@RequestParam String query) {
        log.debug("REST request to search LevelJumpingHis for query {}", query);
        return levelJumpingHisService.search(query);
    }

}
