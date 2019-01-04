package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.LevelJumpingService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.LevelJumpingDTO;
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
 * REST controller for managing LevelJumping.
 */
@RestController
@RequestMapping("/api")
public class LevelJumpingResource {

    private final Logger log = LoggerFactory.getLogger(LevelJumpingResource.class);

    private static final String ENTITY_NAME = "levelJumping";

    private final LevelJumpingService levelJumpingService;

    public LevelJumpingResource(LevelJumpingService levelJumpingService) {
        this.levelJumpingService = levelJumpingService;
    }

    /**
     * POST  /level-jumpings : Create a new levelJumping.
     *
     * @param levelJumpingDTO the levelJumpingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new levelJumpingDTO, or with status 400 (Bad Request) if the levelJumping has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/level-jumpings")
    @Timed
    public ResponseEntity<LevelJumpingDTO> createLevelJumping(@RequestBody LevelJumpingDTO levelJumpingDTO) throws URISyntaxException {
        log.debug("REST request to save LevelJumping : {}", levelJumpingDTO);
        if (levelJumpingDTO.getId() != null) {
            throw new BadRequestAlertException("A new levelJumping cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LevelJumpingDTO result = levelJumpingService.save(levelJumpingDTO);
        return ResponseEntity.created(new URI("/api/level-jumpings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /level-jumpings : Updates an existing levelJumping.
     *
     * @param levelJumpingDTO the levelJumpingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated levelJumpingDTO,
     * or with status 400 (Bad Request) if the levelJumpingDTO is not valid,
     * or with status 500 (Internal Server Error) if the levelJumpingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/level-jumpings")
    @Timed
    public ResponseEntity<LevelJumpingDTO> updateLevelJumping(@RequestBody LevelJumpingDTO levelJumpingDTO) throws URISyntaxException {
        log.debug("REST request to update LevelJumping : {}", levelJumpingDTO);
        if (levelJumpingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LevelJumpingDTO result = levelJumpingService.save(levelJumpingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, levelJumpingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /level-jumpings : get all the levelJumpings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of levelJumpings in body
     */
    @GetMapping("/level-jumpings")
    @Timed
    public List<LevelJumpingDTO> getAllLevelJumpings() {
        log.debug("REST request to get all LevelJumpings");
        return levelJumpingService.findAll();
    }

    /**
     * GET  /level-jumpings/:id : get the "id" levelJumping.
     *
     * @param id the id of the levelJumpingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the levelJumpingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/level-jumpings/{id}")
    @Timed
    public ResponseEntity<LevelJumpingDTO> getLevelJumping(@PathVariable Long id) {
        log.debug("REST request to get LevelJumping : {}", id);
        Optional<LevelJumpingDTO> levelJumpingDTO = levelJumpingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(levelJumpingDTO);
    }

    /**
     * DELETE  /level-jumpings/:id : delete the "id" levelJumping.
     *
     * @param id the id of the levelJumpingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/level-jumpings/{id}")
    @Timed
    public ResponseEntity<Void> deleteLevelJumping(@PathVariable Long id) {
        log.debug("REST request to delete LevelJumping : {}", id);
        levelJumpingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/level-jumpings?query=:query : search for the levelJumping corresponding
     * to the query.
     *
     * @param query the query of the levelJumping search
     * @return the result of the search
     */
    @GetMapping("/_search/level-jumpings")
    @Timed
    public List<LevelJumpingDTO> searchLevelJumpings(@RequestParam String query) {
        log.debug("REST request to search LevelJumpings for query {}", query);
        return levelJumpingService.search(query);
    }

}
