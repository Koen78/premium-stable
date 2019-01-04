package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.EquineSpeciesService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.EquineSpeciesDTO;
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
 * REST controller for managing EquineSpecies.
 */
@RestController
@RequestMapping("/api")
public class EquineSpeciesResource {

    private final Logger log = LoggerFactory.getLogger(EquineSpeciesResource.class);

    private static final String ENTITY_NAME = "equineSpecies";

    private final EquineSpeciesService equineSpeciesService;

    public EquineSpeciesResource(EquineSpeciesService equineSpeciesService) {
        this.equineSpeciesService = equineSpeciesService;
    }

    /**
     * POST  /equine-species : Create a new equineSpecies.
     *
     * @param equineSpeciesDTO the equineSpeciesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new equineSpeciesDTO, or with status 400 (Bad Request) if the equineSpecies has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/equine-species")
    @Timed
    public ResponseEntity<EquineSpeciesDTO> createEquineSpecies(@RequestBody EquineSpeciesDTO equineSpeciesDTO) throws URISyntaxException {
        log.debug("REST request to save EquineSpecies : {}", equineSpeciesDTO);
        if (equineSpeciesDTO.getId() != null) {
            throw new BadRequestAlertException("A new equineSpecies cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EquineSpeciesDTO result = equineSpeciesService.save(equineSpeciesDTO);
        return ResponseEntity.created(new URI("/api/equine-species/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /equine-species : Updates an existing equineSpecies.
     *
     * @param equineSpeciesDTO the equineSpeciesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated equineSpeciesDTO,
     * or with status 400 (Bad Request) if the equineSpeciesDTO is not valid,
     * or with status 500 (Internal Server Error) if the equineSpeciesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/equine-species")
    @Timed
    public ResponseEntity<EquineSpeciesDTO> updateEquineSpecies(@RequestBody EquineSpeciesDTO equineSpeciesDTO) throws URISyntaxException {
        log.debug("REST request to update EquineSpecies : {}", equineSpeciesDTO);
        if (equineSpeciesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EquineSpeciesDTO result = equineSpeciesService.save(equineSpeciesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, equineSpeciesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /equine-species : get all the equineSpecies.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of equineSpecies in body
     */
    @GetMapping("/equine-species")
    @Timed
    public List<EquineSpeciesDTO> getAllEquineSpecies() {
        log.debug("REST request to get all EquineSpecies");
        return equineSpeciesService.findAll();
    }

    /**
     * GET  /equine-species/:id : get the "id" equineSpecies.
     *
     * @param id the id of the equineSpeciesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the equineSpeciesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/equine-species/{id}")
    @Timed
    public ResponseEntity<EquineSpeciesDTO> getEquineSpecies(@PathVariable Long id) {
        log.debug("REST request to get EquineSpecies : {}", id);
        Optional<EquineSpeciesDTO> equineSpeciesDTO = equineSpeciesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(equineSpeciesDTO);
    }

    /**
     * DELETE  /equine-species/:id : delete the "id" equineSpecies.
     *
     * @param id the id of the equineSpeciesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/equine-species/{id}")
    @Timed
    public ResponseEntity<Void> deleteEquineSpecies(@PathVariable Long id) {
        log.debug("REST request to delete EquineSpecies : {}", id);
        equineSpeciesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/equine-species?query=:query : search for the equineSpecies corresponding
     * to the query.
     *
     * @param query the query of the equineSpecies search
     * @return the result of the search
     */
    @GetMapping("/_search/equine-species")
    @Timed
    public List<EquineSpeciesDTO> searchEquineSpecies(@RequestParam String query) {
        log.debug("REST request to search EquineSpecies for query {}", query);
        return equineSpeciesService.search(query);
    }

}
