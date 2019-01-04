package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.MedCheckXrayService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.MedCheckXrayDTO;
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
 * REST controller for managing MedCheckXray.
 */
@RestController
@RequestMapping("/api")
public class MedCheckXrayResource {

    private final Logger log = LoggerFactory.getLogger(MedCheckXrayResource.class);

    private static final String ENTITY_NAME = "medCheckXray";

    private final MedCheckXrayService medCheckXrayService;

    public MedCheckXrayResource(MedCheckXrayService medCheckXrayService) {
        this.medCheckXrayService = medCheckXrayService;
    }

    /**
     * POST  /med-check-xrays : Create a new medCheckXray.
     *
     * @param medCheckXrayDTO the medCheckXrayDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medCheckXrayDTO, or with status 400 (Bad Request) if the medCheckXray has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/med-check-xrays")
    @Timed
    public ResponseEntity<MedCheckXrayDTO> createMedCheckXray(@RequestBody MedCheckXrayDTO medCheckXrayDTO) throws URISyntaxException {
        log.debug("REST request to save MedCheckXray : {}", medCheckXrayDTO);
        if (medCheckXrayDTO.getId() != null) {
            throw new BadRequestAlertException("A new medCheckXray cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedCheckXrayDTO result = medCheckXrayService.save(medCheckXrayDTO);
        return ResponseEntity.created(new URI("/api/med-check-xrays/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /med-check-xrays : Updates an existing medCheckXray.
     *
     * @param medCheckXrayDTO the medCheckXrayDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medCheckXrayDTO,
     * or with status 400 (Bad Request) if the medCheckXrayDTO is not valid,
     * or with status 500 (Internal Server Error) if the medCheckXrayDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/med-check-xrays")
    @Timed
    public ResponseEntity<MedCheckXrayDTO> updateMedCheckXray(@RequestBody MedCheckXrayDTO medCheckXrayDTO) throws URISyntaxException {
        log.debug("REST request to update MedCheckXray : {}", medCheckXrayDTO);
        if (medCheckXrayDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedCheckXrayDTO result = medCheckXrayService.save(medCheckXrayDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medCheckXrayDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /med-check-xrays : get all the medCheckXrays.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medCheckXrays in body
     */
    @GetMapping("/med-check-xrays")
    @Timed
    public List<MedCheckXrayDTO> getAllMedCheckXrays() {
        log.debug("REST request to get all MedCheckXrays");
        return medCheckXrayService.findAll();
    }

    /**
     * GET  /med-check-xrays/:id : get the "id" medCheckXray.
     *
     * @param id the id of the medCheckXrayDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medCheckXrayDTO, or with status 404 (Not Found)
     */
    @GetMapping("/med-check-xrays/{id}")
    @Timed
    public ResponseEntity<MedCheckXrayDTO> getMedCheckXray(@PathVariable Long id) {
        log.debug("REST request to get MedCheckXray : {}", id);
        Optional<MedCheckXrayDTO> medCheckXrayDTO = medCheckXrayService.findOne(id);
        return ResponseUtil.wrapOrNotFound(medCheckXrayDTO);
    }

    /**
     * DELETE  /med-check-xrays/:id : delete the "id" medCheckXray.
     *
     * @param id the id of the medCheckXrayDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/med-check-xrays/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedCheckXray(@PathVariable Long id) {
        log.debug("REST request to delete MedCheckXray : {}", id);
        medCheckXrayService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/med-check-xrays?query=:query : search for the medCheckXray corresponding
     * to the query.
     *
     * @param query the query of the medCheckXray search
     * @return the result of the search
     */
    @GetMapping("/_search/med-check-xrays")
    @Timed
    public List<MedCheckXrayDTO> searchMedCheckXrays(@RequestParam String query) {
        log.debug("REST request to search MedCheckXrays for query {}", query);
        return medCheckXrayService.search(query);
    }

}
