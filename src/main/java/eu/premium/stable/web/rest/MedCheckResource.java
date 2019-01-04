package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.MedCheckService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.MedCheckDTO;
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
 * REST controller for managing MedCheck.
 */
@RestController
@RequestMapping("/api")
public class MedCheckResource {

    private final Logger log = LoggerFactory.getLogger(MedCheckResource.class);

    private static final String ENTITY_NAME = "medCheck";

    private final MedCheckService medCheckService;

    public MedCheckResource(MedCheckService medCheckService) {
        this.medCheckService = medCheckService;
    }

    /**
     * POST  /med-checks : Create a new medCheck.
     *
     * @param medCheckDTO the medCheckDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medCheckDTO, or with status 400 (Bad Request) if the medCheck has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/med-checks")
    @Timed
    public ResponseEntity<MedCheckDTO> createMedCheck(@RequestBody MedCheckDTO medCheckDTO) throws URISyntaxException {
        log.debug("REST request to save MedCheck : {}", medCheckDTO);
        if (medCheckDTO.getId() != null) {
            throw new BadRequestAlertException("A new medCheck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedCheckDTO result = medCheckService.save(medCheckDTO);
        return ResponseEntity.created(new URI("/api/med-checks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /med-checks : Updates an existing medCheck.
     *
     * @param medCheckDTO the medCheckDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medCheckDTO,
     * or with status 400 (Bad Request) if the medCheckDTO is not valid,
     * or with status 500 (Internal Server Error) if the medCheckDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/med-checks")
    @Timed
    public ResponseEntity<MedCheckDTO> updateMedCheck(@RequestBody MedCheckDTO medCheckDTO) throws URISyntaxException {
        log.debug("REST request to update MedCheck : {}", medCheckDTO);
        if (medCheckDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedCheckDTO result = medCheckService.save(medCheckDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medCheckDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /med-checks : get all the medChecks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medChecks in body
     */
    @GetMapping("/med-checks")
    @Timed
    public List<MedCheckDTO> getAllMedChecks() {
        log.debug("REST request to get all MedChecks");
        return medCheckService.findAll();
    }

    /**
     * GET  /med-checks/:id : get the "id" medCheck.
     *
     * @param id the id of the medCheckDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medCheckDTO, or with status 404 (Not Found)
     */
    @GetMapping("/med-checks/{id}")
    @Timed
    public ResponseEntity<MedCheckDTO> getMedCheck(@PathVariable Long id) {
        log.debug("REST request to get MedCheck : {}", id);
        Optional<MedCheckDTO> medCheckDTO = medCheckService.findOne(id);
        return ResponseUtil.wrapOrNotFound(medCheckDTO);
    }

    /**
     * DELETE  /med-checks/:id : delete the "id" medCheck.
     *
     * @param id the id of the medCheckDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/med-checks/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedCheck(@PathVariable Long id) {
        log.debug("REST request to delete MedCheck : {}", id);
        medCheckService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/med-checks?query=:query : search for the medCheck corresponding
     * to the query.
     *
     * @param query the query of the medCheck search
     * @return the result of the search
     */
    @GetMapping("/_search/med-checks")
    @Timed
    public List<MedCheckDTO> searchMedChecks(@RequestParam String query) {
        log.debug("REST request to search MedChecks for query {}", query);
        return medCheckService.search(query);
    }

}
