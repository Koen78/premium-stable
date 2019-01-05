package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.MedCheckDetService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.MedCheckDetDTO;
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
 * REST controller for managing MedCheckDet.
 */
@RestController
@RequestMapping("/api")
public class MedCheckDetResource {

    private final Logger log = LoggerFactory.getLogger(MedCheckDetResource.class);

    private static final String ENTITY_NAME = "medCheckDet";

    private final MedCheckDetService medCheckDetService;

    public MedCheckDetResource(MedCheckDetService medCheckDetService) {
        this.medCheckDetService = medCheckDetService;
    }

    /**
     * POST  /med-check-dets : Create a new medCheckDet.
     *
     * @param medCheckDetDTO the medCheckDetDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new medCheckDetDTO, or with status 400 (Bad Request) if the medCheckDet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/med-check-dets")
    @Timed
    public ResponseEntity<MedCheckDetDTO> createMedCheckDet(@RequestBody MedCheckDetDTO medCheckDetDTO) throws URISyntaxException {
        log.debug("REST request to save MedCheckDet : {}", medCheckDetDTO);
        if (medCheckDetDTO.getId() != null) {
            throw new BadRequestAlertException("A new medCheckDet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedCheckDetDTO result = medCheckDetService.save(medCheckDetDTO);
        return ResponseEntity.created(new URI("/api/med-check-dets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /med-check-dets : Updates an existing medCheckDet.
     *
     * @param medCheckDetDTO the medCheckDetDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated medCheckDetDTO,
     * or with status 400 (Bad Request) if the medCheckDetDTO is not valid,
     * or with status 500 (Internal Server Error) if the medCheckDetDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/med-check-dets")
    @Timed
    public ResponseEntity<MedCheckDetDTO> updateMedCheckDet(@RequestBody MedCheckDetDTO medCheckDetDTO) throws URISyntaxException {
        log.debug("REST request to update MedCheckDet : {}", medCheckDetDTO);
        if (medCheckDetDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedCheckDetDTO result = medCheckDetService.save(medCheckDetDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, medCheckDetDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /med-check-dets : get all the medCheckDets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of medCheckDets in body
     */
    @GetMapping("/med-check-dets")
    @Timed
    public List<MedCheckDetDTO> getAllMedCheckDets() {
        log.debug("REST request to get all MedCheckDets");
        return medCheckDetService.findAll();
    }

    /**
     * GET  /med-check-dets/:id : get the "id" medCheckDet.
     *
     * @param id the id of the medCheckDetDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the medCheckDetDTO, or with status 404 (Not Found)
     */
    @GetMapping("/med-check-dets/{id}")
    @Timed
    public ResponseEntity<MedCheckDetDTO> getMedCheckDet(@PathVariable Long id) {
        log.debug("REST request to get MedCheckDet : {}", id);
        Optional<MedCheckDetDTO> medCheckDetDTO = medCheckDetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(medCheckDetDTO);
    }

    /**
     * DELETE  /med-check-dets/:id : delete the "id" medCheckDet.
     *
     * @param id the id of the medCheckDetDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/med-check-dets/{id}")
    @Timed
    public ResponseEntity<Void> deleteMedCheckDet(@PathVariable Long id) {
        log.debug("REST request to delete MedCheckDet : {}", id);
        medCheckDetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/med-check-dets?query=:query : search for the medCheckDet corresponding
     * to the query.
     *
     * @param query the query of the medCheckDet search
     * @return the result of the search
     */
    @GetMapping("/_search/med-check-dets")
    @Timed
    public List<MedCheckDetDTO> searchMedCheckDets(@RequestParam String query) {
        log.debug("REST request to search MedCheckDets for query {}", query);
        return medCheckDetService.search(query);
    }

}
