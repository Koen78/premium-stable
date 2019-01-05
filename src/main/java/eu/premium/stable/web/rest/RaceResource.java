package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.RaceService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.RaceDTO;
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
 * REST controller for managing Race.
 */
@RestController
@RequestMapping("/api")
public class RaceResource {

    private final Logger log = LoggerFactory.getLogger(RaceResource.class);

    private static final String ENTITY_NAME = "race";

    private final RaceService raceService;

    public RaceResource(RaceService raceService) {
        this.raceService = raceService;
    }

    /**
     * POST  /races : Create a new race.
     *
     * @param raceDTO the raceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new raceDTO, or with status 400 (Bad Request) if the race has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/races")
    @Timed
    public ResponseEntity<RaceDTO> createRace(@RequestBody RaceDTO raceDTO) throws URISyntaxException {
        log.debug("REST request to save Race : {}", raceDTO);
        if (raceDTO.getId() != null) {
            throw new BadRequestAlertException("A new race cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RaceDTO result = raceService.save(raceDTO);
        return ResponseEntity.created(new URI("/api/races/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /races : Updates an existing race.
     *
     * @param raceDTO the raceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated raceDTO,
     * or with status 400 (Bad Request) if the raceDTO is not valid,
     * or with status 500 (Internal Server Error) if the raceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/races")
    @Timed
    public ResponseEntity<RaceDTO> updateRace(@RequestBody RaceDTO raceDTO) throws URISyntaxException {
        log.debug("REST request to update Race : {}", raceDTO);
        if (raceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RaceDTO result = raceService.save(raceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, raceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /races : get all the races.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of races in body
     */
    @GetMapping("/races")
    @Timed
    public List<RaceDTO> getAllRaces() {
        log.debug("REST request to get all Races");
        return raceService.findAll();
    }

    /**
     * GET  /races/:id : get the "id" race.
     *
     * @param id the id of the raceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the raceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/races/{id}")
    @Timed
    public ResponseEntity<RaceDTO> getRace(@PathVariable Long id) {
        log.debug("REST request to get Race : {}", id);
        Optional<RaceDTO> raceDTO = raceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(raceDTO);
    }

    /**
     * DELETE  /races/:id : delete the "id" race.
     *
     * @param id the id of the raceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/races/{id}")
    @Timed
    public ResponseEntity<Void> deleteRace(@PathVariable Long id) {
        log.debug("REST request to delete Race : {}", id);
        raceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/races?query=:query : search for the race corresponding
     * to the query.
     *
     * @param query the query of the race search
     * @return the result of the search
     */
    @GetMapping("/_search/races")
    @Timed
    public List<RaceDTO> searchRaces(@RequestParam String query) {
        log.debug("REST request to search Races for query {}", query);
        return raceService.search(query);
    }

}
