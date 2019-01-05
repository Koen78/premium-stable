package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.GenderService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.GenderDTO;
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
 * REST controller for managing Gender.
 */
@RestController
@RequestMapping("/api")
public class GenderResource {

    private final Logger log = LoggerFactory.getLogger(GenderResource.class);

    private static final String ENTITY_NAME = "gender";

    private final GenderService genderService;

    public GenderResource(GenderService genderService) {
        this.genderService = genderService;
    }

    /**
     * POST  /genders : Create a new gender.
     *
     * @param genderDTO the genderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new genderDTO, or with status 400 (Bad Request) if the gender has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/genders")
    @Timed
    public ResponseEntity<GenderDTO> createGender(@RequestBody GenderDTO genderDTO) throws URISyntaxException {
        log.debug("REST request to save Gender : {}", genderDTO);
        if (genderDTO.getId() != null) {
            throw new BadRequestAlertException("A new gender cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GenderDTO result = genderService.save(genderDTO);
        return ResponseEntity.created(new URI("/api/genders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /genders : Updates an existing gender.
     *
     * @param genderDTO the genderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated genderDTO,
     * or with status 400 (Bad Request) if the genderDTO is not valid,
     * or with status 500 (Internal Server Error) if the genderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/genders")
    @Timed
    public ResponseEntity<GenderDTO> updateGender(@RequestBody GenderDTO genderDTO) throws URISyntaxException {
        log.debug("REST request to update Gender : {}", genderDTO);
        if (genderDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GenderDTO result = genderService.save(genderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, genderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /genders : get all the genders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of genders in body
     */
    @GetMapping("/genders")
    @Timed
    public List<GenderDTO> getAllGenders() {
        log.debug("REST request to get all Genders");
        return genderService.findAll();
    }

    /**
     * GET  /genders/:id : get the "id" gender.
     *
     * @param id the id of the genderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the genderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/genders/{id}")
    @Timed
    public ResponseEntity<GenderDTO> getGender(@PathVariable Long id) {
        log.debug("REST request to get Gender : {}", id);
        Optional<GenderDTO> genderDTO = genderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(genderDTO);
    }

    /**
     * DELETE  /genders/:id : delete the "id" gender.
     *
     * @param id the id of the genderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/genders/{id}")
    @Timed
    public ResponseEntity<Void> deleteGender(@PathVariable Long id) {
        log.debug("REST request to delete Gender : {}", id);
        genderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/genders?query=:query : search for the gender corresponding
     * to the query.
     *
     * @param query the query of the gender search
     * @return the result of the search
     */
    @GetMapping("/_search/genders")
    @Timed
    public List<GenderDTO> searchGenders(@RequestParam String query) {
        log.debug("REST request to search Genders for query {}", query);
        return genderService.search(query);
    }

}
