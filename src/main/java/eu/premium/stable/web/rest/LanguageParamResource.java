package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.LanguageParamService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.LanguageParamDTO;
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
 * REST controller for managing LanguageParam.
 */
@RestController
@RequestMapping("/api")
public class LanguageParamResource {

    private final Logger log = LoggerFactory.getLogger(LanguageParamResource.class);

    private static final String ENTITY_NAME = "languageParam";

    private final LanguageParamService languageParamService;

    public LanguageParamResource(LanguageParamService languageParamService) {
        this.languageParamService = languageParamService;
    }

    /**
     * POST  /language-params : Create a new languageParam.
     *
     * @param languageParamDTO the languageParamDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new languageParamDTO, or with status 400 (Bad Request) if the languageParam has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/language-params")
    @Timed
    public ResponseEntity<LanguageParamDTO> createLanguageParam(@RequestBody LanguageParamDTO languageParamDTO) throws URISyntaxException {
        log.debug("REST request to save LanguageParam : {}", languageParamDTO);
        if (languageParamDTO.getId() != null) {
            throw new BadRequestAlertException("A new languageParam cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LanguageParamDTO result = languageParamService.save(languageParamDTO);
        return ResponseEntity.created(new URI("/api/language-params/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /language-params : Updates an existing languageParam.
     *
     * @param languageParamDTO the languageParamDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated languageParamDTO,
     * or with status 400 (Bad Request) if the languageParamDTO is not valid,
     * or with status 500 (Internal Server Error) if the languageParamDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/language-params")
    @Timed
    public ResponseEntity<LanguageParamDTO> updateLanguageParam(@RequestBody LanguageParamDTO languageParamDTO) throws URISyntaxException {
        log.debug("REST request to update LanguageParam : {}", languageParamDTO);
        if (languageParamDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LanguageParamDTO result = languageParamService.save(languageParamDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, languageParamDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /language-params : get all the languageParams.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of languageParams in body
     */
    @GetMapping("/language-params")
    @Timed
    public List<LanguageParamDTO> getAllLanguageParams() {
        log.debug("REST request to get all LanguageParams");
        return languageParamService.findAll();
    }

    /**
     * GET  /language-params/:id : get the "id" languageParam.
     *
     * @param id the id of the languageParamDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the languageParamDTO, or with status 404 (Not Found)
     */
    @GetMapping("/language-params/{id}")
    @Timed
    public ResponseEntity<LanguageParamDTO> getLanguageParam(@PathVariable Long id) {
        log.debug("REST request to get LanguageParam : {}", id);
        Optional<LanguageParamDTO> languageParamDTO = languageParamService.findOne(id);
        return ResponseUtil.wrapOrNotFound(languageParamDTO);
    }

    /**
     * DELETE  /language-params/:id : delete the "id" languageParam.
     *
     * @param id the id of the languageParamDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/language-params/{id}")
    @Timed
    public ResponseEntity<Void> deleteLanguageParam(@PathVariable Long id) {
        log.debug("REST request to delete LanguageParam : {}", id);
        languageParamService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/language-params?query=:query : search for the languageParam corresponding
     * to the query.
     *
     * @param query the query of the languageParam search
     * @return the result of the search
     */
    @GetMapping("/_search/language-params")
    @Timed
    public List<LanguageParamDTO> searchLanguageParams(@RequestParam String query) {
        log.debug("REST request to search LanguageParams for query {}", query);
        return languageParamService.search(query);
    }

}
