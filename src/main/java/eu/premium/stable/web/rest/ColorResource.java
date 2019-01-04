package eu.premium.stable.web.rest;

import com.codahale.metrics.annotation.Timed;
import eu.premium.stable.service.ColorService;
import eu.premium.stable.web.rest.errors.BadRequestAlertException;
import eu.premium.stable.web.rest.util.HeaderUtil;
import eu.premium.stable.service.dto.ColorDTO;
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
 * REST controller for managing Color.
 */
@RestController
@RequestMapping("/api")
public class ColorResource {

    private final Logger log = LoggerFactory.getLogger(ColorResource.class);

    private static final String ENTITY_NAME = "color";

    private final ColorService colorService;

    public ColorResource(ColorService colorService) {
        this.colorService = colorService;
    }

    /**
     * POST  /colors : Create a new color.
     *
     * @param colorDTO the colorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colorDTO, or with status 400 (Bad Request) if the color has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colors")
    @Timed
    public ResponseEntity<ColorDTO> createColor(@RequestBody ColorDTO colorDTO) throws URISyntaxException {
        log.debug("REST request to save Color : {}", colorDTO);
        if (colorDTO.getId() != null) {
            throw new BadRequestAlertException("A new color cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ColorDTO result = colorService.save(colorDTO);
        return ResponseEntity.created(new URI("/api/colors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colors : Updates an existing color.
     *
     * @param colorDTO the colorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colorDTO,
     * or with status 400 (Bad Request) if the colorDTO is not valid,
     * or with status 500 (Internal Server Error) if the colorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colors")
    @Timed
    public ResponseEntity<ColorDTO> updateColor(@RequestBody ColorDTO colorDTO) throws URISyntaxException {
        log.debug("REST request to update Color : {}", colorDTO);
        if (colorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ColorDTO result = colorService.save(colorDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colors : get all the colors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of colors in body
     */
    @GetMapping("/colors")
    @Timed
    public List<ColorDTO> getAllColors() {
        log.debug("REST request to get all Colors");
        return colorService.findAll();
    }

    /**
     * GET  /colors/:id : get the "id" color.
     *
     * @param id the id of the colorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/colors/{id}")
    @Timed
    public ResponseEntity<ColorDTO> getColor(@PathVariable Long id) {
        log.debug("REST request to get Color : {}", id);
        Optional<ColorDTO> colorDTO = colorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(colorDTO);
    }

    /**
     * DELETE  /colors/:id : delete the "id" color.
     *
     * @param id the id of the colorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colors/{id}")
    @Timed
    public ResponseEntity<Void> deleteColor(@PathVariable Long id) {
        log.debug("REST request to delete Color : {}", id);
        colorService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/colors?query=:query : search for the color corresponding
     * to the query.
     *
     * @param query the query of the color search
     * @return the result of the search
     */
    @GetMapping("/_search/colors")
    @Timed
    public List<ColorDTO> searchColors(@RequestParam String query) {
        log.debug("REST request to search Colors for query {}", query);
        return colorService.search(query);
    }

}
