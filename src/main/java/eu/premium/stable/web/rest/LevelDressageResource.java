package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.LevelDressageService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.LevelDressageDTO;
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
 * REST controller for managing LevelDressage.
 */
@RestController
@RequestMapping("/api")
public class LevelDressageResource {

    private final Logger log = LoggerFactory.getLogger(LevelDressageResource.class);

    private static final String ENTITY_NAME = "levelDressage";

    private final LevelDressageService levelDressageService;

    public LevelDressageResource(LevelDressageService levelDressageService) {
        this.levelDressageService = levelDressageService;
    }

    /**
     * POST  /level-dressages : Create a new levelDressage.
     *
     * @param levelDressageDTO the levelDressageDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new levelDressageDTO, or with status 400 (Bad Request) if the levelDressage has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/level-dressages")
    @Timed
    public ResponseEntity<LevelDressageDTO> createLevelDressage(@RequestBody LevelDressageDTO levelDressageDTO) throws URISyntaxException {
        log.debug("REST request to save LevelDressage : {}", levelDressageDTO);
        if (levelDressageDTO.getId() != null) {
            throw new BadRequestAlertException("A new levelDressage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LevelDressageDTO result = levelDressageService.save(levelDressageDTO);
        return ResponseEntity.created(new URI("/api/level-dressages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /level-dressages : Updates an existing levelDressage.
     *
     * @param levelDressageDTO the levelDressageDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated levelDressageDTO,
     * or with status 400 (Bad Request) if the levelDressageDTO is not valid,
     * or with status 500 (Internal Server Error) if the levelDressageDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/level-dressages")
    @Timed
    public ResponseEntity<LevelDressageDTO> updateLevelDressage(@RequestBody LevelDressageDTO levelDressageDTO) throws URISyntaxException {
        log.debug("REST request to update LevelDressage : {}", levelDressageDTO);
        if (levelDressageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LevelDressageDTO result = levelDressageService.save(levelDressageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, levelDressageDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /level-dressages : get all the levelDressages.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of levelDressages in body
     */
    @GetMapping("/level-dressages")
    @Timed
    public List<LevelDressageDTO> getAllLevelDressages() {
        log.debug("REST request to get all LevelDressages");
        return levelDressageService.findAll();
    }

    /**
     * GET  /level-dressages/:id : get the "id" levelDressage.
     *
     * @param id the id of the levelDressageDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the levelDressageDTO, or with status 404 (Not Found)
     */
    @GetMapping("/level-dressages/{id}")
    @Timed
    public ResponseEntity<LevelDressageDTO> getLevelDressage(@PathVariable Long id) {
        log.debug("REST request to get LevelDressage : {}", id);
        Optional<LevelDressageDTO> levelDressageDTO = levelDressageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelDressageDTO);
    }

    /**
     * DELETE  /level-dressages/:id : delete the "id" levelDressage.
     *
     * @param id the id of the levelDressageDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/level-dressages/{id}")
    @Timed
    public ResponseEntity<Void> deleteLevelDressage(@PathVariable Long id) {
        log.debug("REST request to delete LevelDressage : {}", id);
        levelDressageService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/level-dressages?query=:query : search for the levelDressage corresponding
     * to the query.
     *
     * @param query the query of the levelDressage search
     * @return the result of the search
     */
    @GetMapping("/_search/level-dressages")
    @Timed
    public List<LevelDressageDTO> searchLevelDressages(@RequestParam String query) {
        log.debug("REST request to search LevelDressages for query {}", query);
        return levelDressageService.search(query);
    }

}
