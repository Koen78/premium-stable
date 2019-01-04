package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.StableService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.web.rest.util.PaginationUtil;
import eu.premium.stable.service.dto.StableDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Stable.
 */
@RestController
@RequestMapping("/api")
public class StableResource {

    private final Logger log = LoggerFactory.getLogger(StableResource.class);

    private static final String ENTITY_NAME = "stable";

    private final StableService stableService;

    public StableResource(StableService stableService) {
        this.stableService = stableService;
    }

    /**
     * POST  /stables : Create a new stable.
     *
     * @param stableDTO the stableDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stableDTO, or with status 400 (Bad Request) if the stable has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stables")
    @Timed
    public ResponseEntity<StableDTO> createStable(@RequestBody StableDTO stableDTO) throws URISyntaxException {
        log.debug("REST request to save Stable : {}", stableDTO);
        if (stableDTO.getId() != null) {
            throw new BadRequestAlertException("A new stable cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StableDTO result = stableService.save(stableDTO);
        return ResponseEntity.created(new URI("/api/stables/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stables : Updates an existing stable.
     *
     * @param stableDTO the stableDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stableDTO,
     * or with status 400 (Bad Request) if the stableDTO is not valid,
     * or with status 500 (Internal Server Error) if the stableDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stables")
    @Timed
    public ResponseEntity<StableDTO> updateStable(@RequestBody StableDTO stableDTO) throws URISyntaxException {
        log.debug("REST request to update Stable : {}", stableDTO);
        if (stableDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StableDTO result = stableService.save(stableDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stableDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stables : get all the stables.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stables in body
     */
    @GetMapping("/stables")
    @Timed
    public ResponseEntity<List<StableDTO>> getAllStables(Pageable pageable) {
        log.debug("REST request to get a page of Stables");
        Page<StableDTO> page = stableService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stables");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /stables/:id : get the "id" stable.
     *
     * @param id the id of the stableDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stableDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stables/{id}")
    @Timed
    public ResponseEntity<StableDTO> getStable(@PathVariable Long id) {
        log.debug("REST request to get Stable : {}", id);
        Optional<StableDTO> stableDTO = stableService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stableDTO);
    }

    /**
     * DELETE  /stables/:id : delete the "id" stable.
     *
     * @param id the id of the stableDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stables/{id}")
    @Timed
    public ResponseEntity<Void> deleteStable(@PathVariable Long id) {
        log.debug("REST request to delete Stable : {}", id);
        stableService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/stables?query=:query : search for the stable corresponding
     * to the query.
     *
     * @param query the query of the stable search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/stables")
    @Timed
    public ResponseEntity<List<StableDTO>> searchStables(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Stables for query {}", query);
        Page<StableDTO> page = stableService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/stables");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
