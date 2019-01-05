package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.LevelDressageHisService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.LevelDressageHisDTO;
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
 * REST controller for managing LevelDressageHis.
 */
@RestController
@RequestMapping("/api")
public class LevelDressageHisResource {

    private final Logger log = LoggerFactory.getLogger(LevelDressageHisResource.class);

    private static final String ENTITY_NAME = "levelDressageHis";

    private final LevelDressageHisService levelDressageHisService;

    public LevelDressageHisResource(LevelDressageHisService levelDressageHisService) {
        this.levelDressageHisService = levelDressageHisService;
    }

    /**
     * POST  /level-dressage-his : Create a new levelDressageHis.
     *
     * @param levelDressageHisDTO the levelDressageHisDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new levelDressageHisDTO, or with status 400 (Bad Request) if the levelDressageHis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/level-dressage-his")
    @Timed
    public ResponseEntity<LevelDressageHisDTO> createLevelDressageHis(@RequestBody LevelDressageHisDTO levelDressageHisDTO) throws URISyntaxException {
        log.debug("REST request to save LevelDressageHis : {}", levelDressageHisDTO);
        if (levelDressageHisDTO.getId() != null) {
            throw new BadRequestAlertException("A new levelDressageHis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LevelDressageHisDTO result = levelDressageHisService.save(levelDressageHisDTO);
        return ResponseEntity.created(new URI("/api/level-dressage-his/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /level-dressage-his : Updates an existing levelDressageHis.
     *
     * @param levelDressageHisDTO the levelDressageHisDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated levelDressageHisDTO,
     * or with status 400 (Bad Request) if the levelDressageHisDTO is not valid,
     * or with status 500 (Internal Server Error) if the levelDressageHisDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/level-dressage-his")
    @Timed
    public ResponseEntity<LevelDressageHisDTO> updateLevelDressageHis(@RequestBody LevelDressageHisDTO levelDressageHisDTO) throws URISyntaxException {
        log.debug("REST request to update LevelDressageHis : {}", levelDressageHisDTO);
        if (levelDressageHisDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LevelDressageHisDTO result = levelDressageHisService.save(levelDressageHisDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, levelDressageHisDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /level-dressage-his : get all the levelDressageHis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of levelDressageHis in body
     */
    @GetMapping("/level-dressage-his")
    @Timed
    public List<LevelDressageHisDTO> getAllLevelDressageHis() {
        log.debug("REST request to get all LevelDressageHis");
        return levelDressageHisService.findAll();
    }

    /**
     * GET  /level-dressage-his/:id : get the "id" levelDressageHis.
     *
     * @param id the id of the levelDressageHisDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the levelDressageHisDTO, or with status 404 (Not Found)
     */
    @GetMapping("/level-dressage-his/{id}")
    @Timed
    public ResponseEntity<LevelDressageHisDTO> getLevelDressageHis(@PathVariable Long id) {
        log.debug("REST request to get LevelDressageHis : {}", id);
        Optional<LevelDressageHisDTO> levelDressageHisDTO = levelDressageHisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelDressageHisDTO);
    }

    /**
     * DELETE  /level-dressage-his/:id : delete the "id" levelDressageHis.
     *
     * @param id the id of the levelDressageHisDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/level-dressage-his/{id}")
    @Timed
    public ResponseEntity<Void> deleteLevelDressageHis(@PathVariable Long id) {
        log.debug("REST request to delete LevelDressageHis : {}", id);
        levelDressageHisService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/level-dressage-his?query=:query : search for the levelDressageHis corresponding
     * to the query.
     *
     * @param query the query of the levelDressageHis search
     * @return the result of the search
     */
    @GetMapping("/_search/level-dressage-his")
    @Timed
    public List<LevelDressageHisDTO> searchLevelDressageHis(@RequestParam String query) {
        log.debug("REST request to search LevelDressageHis for query {}", query);
        return levelDressageHisService.search(query);
    }

}
