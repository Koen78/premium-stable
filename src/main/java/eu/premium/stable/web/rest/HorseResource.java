package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.HorseService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.web.rest.util.PaginationUtil;
import eu.premium.stable.service.dto.HorseDTO;
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
 * REST controller for managing Horse.
 */
@RestController
@RequestMapping("/api")
public class HorseResource {

    private final Logger log = LoggerFactory.getLogger(HorseResource.class);

    private static final String ENTITY_NAME = "horse";

    private final HorseService horseService;

    public HorseResource(HorseService horseService) {
        this.horseService = horseService;
    }

    /**
     * POST  /horses : Create a new horse.
     *
     * @param horseDTO the horseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new horseDTO, or with status 400 (Bad Request) if the horse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/horses")
    @Timed
    public ResponseEntity<HorseDTO> createHorse(@RequestBody HorseDTO horseDTO) throws URISyntaxException {
        log.debug("REST request to save Horse : {}", horseDTO);
        if (horseDTO.getId() != null) {
            throw new BadRequestAlertException("A new horse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HorseDTO result = horseService.save(horseDTO);
        return ResponseEntity.created(new URI("/api/horses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /horses : Updates an existing horse.
     *
     * @param horseDTO the horseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated horseDTO,
     * or with status 400 (Bad Request) if the horseDTO is not valid,
     * or with status 500 (Internal Server Error) if the horseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/horses")
    @Timed
    public ResponseEntity<HorseDTO> updateHorse(@RequestBody HorseDTO horseDTO) throws URISyntaxException {
        log.debug("REST request to update Horse : {}", horseDTO);
        if (horseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HorseDTO result = horseService.save(horseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, horseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /horses : get all the horses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of horses in body
     */
    @GetMapping("/horses")
    @Timed
    public ResponseEntity<List<HorseDTO>> getAllHorses(Pageable pageable) {
        log.debug("REST request to get a page of Horses");
        Page<HorseDTO> page = horseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/horses");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /horses/:id : get the "id" horse.
     *
     * @param id the id of the horseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the horseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/horses/{id}")
    @Timed
    public ResponseEntity<HorseDTO> getHorse(@PathVariable Long id) {
        log.debug("REST request to get Horse : {}", id);
        Optional<HorseDTO> horseDTO = horseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(horseDTO);
    }

    /**
     * DELETE  /horses/:id : delete the "id" horse.
     *
     * @param id the id of the horseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/horses/{id}")
    @Timed
    public ResponseEntity<Void> deleteHorse(@PathVariable Long id) {
        log.debug("REST request to delete Horse : {}", id);
        horseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/horses?query=:query : search for the horse corresponding
     * to the query.
     *
     * @param query the query of the horse search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/horses")
    @Timed
    public ResponseEntity<List<HorseDTO>> searchHorses(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Horses for query {}", query);
        Page<HorseDTO> page = horseService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/horses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
