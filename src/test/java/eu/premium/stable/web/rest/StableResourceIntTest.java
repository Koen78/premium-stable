package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Stable;
import eu.premium.stable.repository.StableRepository;
import eu.premium.stable.repository.search.StableSearchRepository;
import eu.premium.stable.service.StableService;
import eu.premium.stable.service.dto.StableDTO;
import eu.premium.stable.service.mapper.StableMapper;
import eu.premium.stable.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static eu.premium.stable.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the StableResource REST controller.
 *
 * @see StableResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class StableResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final String DEFAULT_HOUSE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_HOUSE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_POSTALCODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTALCODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    @Autowired
    private StableRepository stableRepository;

    @Autowired
    private StableMapper stableMapper;

    @Autowired
    private StableService stableService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.StableSearchRepositoryMockConfiguration
     */
    @Autowired
    private StableSearchRepository mockStableSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStableMockMvc;

    private Stable stable;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StableResource stableResource = new StableResource(stableService);
        this.restStableMockMvc = MockMvcBuilders.standaloneSetup(stableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Stable createEntity(EntityManager em) {
        Stable stable = new Stable()
            .description(DEFAULT_DESCRIPTION)
            .street(DEFAULT_STREET)
            .houseNumber(DEFAULT_HOUSE_NUMBER)
            .postalcode(DEFAULT_POSTALCODE)
            .city(DEFAULT_CITY);
        return stable;
    }

    @Before
    public void initTest() {
        stable = createEntity(em);
    }

    @Test
    @Transactional
    public void createStable() throws Exception {
        int databaseSizeBeforeCreate = stableRepository.findAll().size();

        // Create the Stable
        StableDTO stableDTO = stableMapper.toDto(stable);
        restStableMockMvc.perform(post("/api/stables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stableDTO)))
            .andExpect(status().isCreated());

        // Validate the Stable in the database
        List<Stable> stableList = stableRepository.findAll();
        assertThat(stableList).hasSize(databaseSizeBeforeCreate + 1);
        Stable testStable = stableList.get(stableList.size() - 1);
        assertThat(testStable.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testStable.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testStable.getHouseNumber()).isEqualTo(DEFAULT_HOUSE_NUMBER);
        assertThat(testStable.getPostalcode()).isEqualTo(DEFAULT_POSTALCODE);
        assertThat(testStable.getCity()).isEqualTo(DEFAULT_CITY);

        // Validate the Stable in Elasticsearch
        verify(mockStableSearchRepository, times(1)).save(testStable);
    }

    @Test
    @Transactional
    public void createStableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stableRepository.findAll().size();

        // Create the Stable with an existing ID
        stable.setId(1L);
        StableDTO stableDTO = stableMapper.toDto(stable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStableMockMvc.perform(post("/api/stables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Stable in the database
        List<Stable> stableList = stableRepository.findAll();
        assertThat(stableList).hasSize(databaseSizeBeforeCreate);

        // Validate the Stable in Elasticsearch
        verify(mockStableSearchRepository, times(0)).save(stable);
    }

    @Test
    @Transactional
    public void getAllStables() throws Exception {
        // Initialize the database
        stableRepository.saveAndFlush(stable);

        // Get all the stableList
        restStableMockMvc.perform(get("/api/stables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stable.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].houseNumber").value(hasItem(DEFAULT_HOUSE_NUMBER.toString())))
            .andExpect(jsonPath("$.[*].postalcode").value(hasItem(DEFAULT_POSTALCODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())));
    }
    
    @Test
    @Transactional
    public void getStable() throws Exception {
        // Initialize the database
        stableRepository.saveAndFlush(stable);

        // Get the stable
        restStableMockMvc.perform(get("/api/stables/{id}", stable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stable.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.houseNumber").value(DEFAULT_HOUSE_NUMBER.toString()))
            .andExpect(jsonPath("$.postalcode").value(DEFAULT_POSTALCODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStable() throws Exception {
        // Get the stable
        restStableMockMvc.perform(get("/api/stables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStable() throws Exception {
        // Initialize the database
        stableRepository.saveAndFlush(stable);

        int databaseSizeBeforeUpdate = stableRepository.findAll().size();

        // Update the stable
        Stable updatedStable = stableRepository.findById(stable.getId()).get();
        // Disconnect from session so that the updates on updatedStable are not directly saved in db
        em.detach(updatedStable);
        updatedStable
            .description(UPDATED_DESCRIPTION)
            .street(UPDATED_STREET)
            .houseNumber(UPDATED_HOUSE_NUMBER)
            .postalcode(UPDATED_POSTALCODE)
            .city(UPDATED_CITY);
        StableDTO stableDTO = stableMapper.toDto(updatedStable);

        restStableMockMvc.perform(put("/api/stables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stableDTO)))
            .andExpect(status().isOk());

        // Validate the Stable in the database
        List<Stable> stableList = stableRepository.findAll();
        assertThat(stableList).hasSize(databaseSizeBeforeUpdate);
        Stable testStable = stableList.get(stableList.size() - 1);
        assertThat(testStable.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testStable.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testStable.getHouseNumber()).isEqualTo(UPDATED_HOUSE_NUMBER);
        assertThat(testStable.getPostalcode()).isEqualTo(UPDATED_POSTALCODE);
        assertThat(testStable.getCity()).isEqualTo(UPDATED_CITY);

        // Validate the Stable in Elasticsearch
        verify(mockStableSearchRepository, times(1)).save(testStable);
    }

    @Test
    @Transactional
    public void updateNonExistingStable() throws Exception {
        int databaseSizeBeforeUpdate = stableRepository.findAll().size();

        // Create the Stable
        StableDTO stableDTO = stableMapper.toDto(stable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStableMockMvc.perform(put("/api/stables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Stable in the database
        List<Stable> stableList = stableRepository.findAll();
        assertThat(stableList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Stable in Elasticsearch
        verify(mockStableSearchRepository, times(0)).save(stable);
    }

    @Test
    @Transactional
    public void deleteStable() throws Exception {
        // Initialize the database
        stableRepository.saveAndFlush(stable);

        int databaseSizeBeforeDelete = stableRepository.findAll().size();

        // Get the stable
        restStableMockMvc.perform(delete("/api/stables/{id}", stable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stable> stableList = stableRepository.findAll();
        assertThat(stableList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Stable in Elasticsearch
        verify(mockStableSearchRepository, times(1)).deleteById(stable.getId());
    }

    @Test
    @Transactional
    public void searchStable() throws Exception {
        // Initialize the database
        stableRepository.saveAndFlush(stable);
        when(mockStableSearchRepository.search(queryStringQuery("id:" + stable.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(stable), PageRequest.of(0, 1), 1));
        // Search the stable
        restStableMockMvc.perform(get("/api/_search/stables?query=id:" + stable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stable.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET)))
            .andExpect(jsonPath("$.[*].houseNumber").value(hasItem(DEFAULT_HOUSE_NUMBER)))
            .andExpect(jsonPath("$.[*].postalcode").value(hasItem(DEFAULT_POSTALCODE)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stable.class);
        Stable stable1 = new Stable();
        stable1.setId(1L);
        Stable stable2 = new Stable();
        stable2.setId(stable1.getId());
        assertThat(stable1).isEqualTo(stable2);
        stable2.setId(2L);
        assertThat(stable1).isNotEqualTo(stable2);
        stable1.setId(null);
        assertThat(stable1).isNotEqualTo(stable2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StableDTO.class);
        StableDTO stableDTO1 = new StableDTO();
        stableDTO1.setId(1L);
        StableDTO stableDTO2 = new StableDTO();
        assertThat(stableDTO1).isNotEqualTo(stableDTO2);
        stableDTO2.setId(stableDTO1.getId());
        assertThat(stableDTO1).isEqualTo(stableDTO2);
        stableDTO2.setId(2L);
        assertThat(stableDTO1).isNotEqualTo(stableDTO2);
        stableDTO1.setId(null);
        assertThat(stableDTO1).isNotEqualTo(stableDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(stableMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(stableMapper.fromId(null)).isNull();
    }
}
