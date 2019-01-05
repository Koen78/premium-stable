package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.EquineSpecies;
import eu.premium.stable.repository.EquineSpeciesRepository;
import eu.premium.stable.repository.search.EquineSpeciesSearchRepository;
import eu.premium.stable.service.EquineSpeciesService;
import eu.premium.stable.service.dto.EquineSpeciesDTO;
import eu.premium.stable.service.mapper.EquineSpeciesMapper;
import eu.premium.stable.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
 * Test class for the EquineSpeciesResource REST controller.
 *
 * @see EquineSpeciesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class EquineSpeciesResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EquineSpeciesRepository equineSpeciesRepository;

    @Autowired
    private EquineSpeciesMapper equineSpeciesMapper;

    @Autowired
    private EquineSpeciesService equineSpeciesService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.EquineSpeciesSearchRepositoryMockConfiguration
     */
    @Autowired
    private EquineSpeciesSearchRepository mockEquineSpeciesSearchRepository;

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

    private MockMvc restEquineSpeciesMockMvc;

    private EquineSpecies equineSpecies;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EquineSpeciesResource equineSpeciesResource = new EquineSpeciesResource(equineSpeciesService);
        this.restEquineSpeciesMockMvc = MockMvcBuilders.standaloneSetup(equineSpeciesResource)
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
    public static EquineSpecies createEntity(EntityManager em) {
        EquineSpecies equineSpecies = new EquineSpecies()
            .description(DEFAULT_DESCRIPTION);
        return equineSpecies;
    }

    @Before
    public void initTest() {
        equineSpecies = createEntity(em);
    }

    @Test
    @Transactional
    public void createEquineSpecies() throws Exception {
        int databaseSizeBeforeCreate = equineSpeciesRepository.findAll().size();

        // Create the EquineSpecies
        EquineSpeciesDTO equineSpeciesDTO = equineSpeciesMapper.toDto(equineSpecies);
        restEquineSpeciesMockMvc.perform(post("/api/equine-species")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equineSpeciesDTO)))
            .andExpect(status().isCreated());

        // Validate the EquineSpecies in the database
        List<EquineSpecies> equineSpeciesList = equineSpeciesRepository.findAll();
        assertThat(equineSpeciesList).hasSize(databaseSizeBeforeCreate + 1);
        EquineSpecies testEquineSpecies = equineSpeciesList.get(equineSpeciesList.size() - 1);
        assertThat(testEquineSpecies.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the EquineSpecies in Elasticsearch
        verify(mockEquineSpeciesSearchRepository, times(1)).save(testEquineSpecies);
    }

    @Test
    @Transactional
    public void createEquineSpeciesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = equineSpeciesRepository.findAll().size();

        // Create the EquineSpecies with an existing ID
        equineSpecies.setId(1L);
        EquineSpeciesDTO equineSpeciesDTO = equineSpeciesMapper.toDto(equineSpecies);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEquineSpeciesMockMvc.perform(post("/api/equine-species")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equineSpeciesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EquineSpecies in the database
        List<EquineSpecies> equineSpeciesList = equineSpeciesRepository.findAll();
        assertThat(equineSpeciesList).hasSize(databaseSizeBeforeCreate);

        // Validate the EquineSpecies in Elasticsearch
        verify(mockEquineSpeciesSearchRepository, times(0)).save(equineSpecies);
    }

    @Test
    @Transactional
    public void getAllEquineSpecies() throws Exception {
        // Initialize the database
        equineSpeciesRepository.saveAndFlush(equineSpecies);

        // Get all the equineSpeciesList
        restEquineSpeciesMockMvc.perform(get("/api/equine-species?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equineSpecies.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getEquineSpecies() throws Exception {
        // Initialize the database
        equineSpeciesRepository.saveAndFlush(equineSpecies);

        // Get the equineSpecies
        restEquineSpeciesMockMvc.perform(get("/api/equine-species/{id}", equineSpecies.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(equineSpecies.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEquineSpecies() throws Exception {
        // Get the equineSpecies
        restEquineSpeciesMockMvc.perform(get("/api/equine-species/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEquineSpecies() throws Exception {
        // Initialize the database
        equineSpeciesRepository.saveAndFlush(equineSpecies);

        int databaseSizeBeforeUpdate = equineSpeciesRepository.findAll().size();

        // Update the equineSpecies
        EquineSpecies updatedEquineSpecies = equineSpeciesRepository.findById(equineSpecies.getId()).get();
        // Disconnect from session so that the updates on updatedEquineSpecies are not directly saved in db
        em.detach(updatedEquineSpecies);
        updatedEquineSpecies
            .description(UPDATED_DESCRIPTION);
        EquineSpeciesDTO equineSpeciesDTO = equineSpeciesMapper.toDto(updatedEquineSpecies);

        restEquineSpeciesMockMvc.perform(put("/api/equine-species")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equineSpeciesDTO)))
            .andExpect(status().isOk());

        // Validate the EquineSpecies in the database
        List<EquineSpecies> equineSpeciesList = equineSpeciesRepository.findAll();
        assertThat(equineSpeciesList).hasSize(databaseSizeBeforeUpdate);
        EquineSpecies testEquineSpecies = equineSpeciesList.get(equineSpeciesList.size() - 1);
        assertThat(testEquineSpecies.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the EquineSpecies in Elasticsearch
        verify(mockEquineSpeciesSearchRepository, times(1)).save(testEquineSpecies);
    }

    @Test
    @Transactional
    public void updateNonExistingEquineSpecies() throws Exception {
        int databaseSizeBeforeUpdate = equineSpeciesRepository.findAll().size();

        // Create the EquineSpecies
        EquineSpeciesDTO equineSpeciesDTO = equineSpeciesMapper.toDto(equineSpecies);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEquineSpeciesMockMvc.perform(put("/api/equine-species")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(equineSpeciesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EquineSpecies in the database
        List<EquineSpecies> equineSpeciesList = equineSpeciesRepository.findAll();
        assertThat(equineSpeciesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EquineSpecies in Elasticsearch
        verify(mockEquineSpeciesSearchRepository, times(0)).save(equineSpecies);
    }

    @Test
    @Transactional
    public void deleteEquineSpecies() throws Exception {
        // Initialize the database
        equineSpeciesRepository.saveAndFlush(equineSpecies);

        int databaseSizeBeforeDelete = equineSpeciesRepository.findAll().size();

        // Get the equineSpecies
        restEquineSpeciesMockMvc.perform(delete("/api/equine-species/{id}", equineSpecies.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EquineSpecies> equineSpeciesList = equineSpeciesRepository.findAll();
        assertThat(equineSpeciesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EquineSpecies in Elasticsearch
        verify(mockEquineSpeciesSearchRepository, times(1)).deleteById(equineSpecies.getId());
    }

    @Test
    @Transactional
    public void searchEquineSpecies() throws Exception {
        // Initialize the database
        equineSpeciesRepository.saveAndFlush(equineSpecies);
        when(mockEquineSpeciesSearchRepository.search(queryStringQuery("id:" + equineSpecies.getId())))
            .thenReturn(Collections.singletonList(equineSpecies));
        // Search the equineSpecies
        restEquineSpeciesMockMvc.perform(get("/api/_search/equine-species?query=id:" + equineSpecies.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(equineSpecies.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquineSpecies.class);
        EquineSpecies equineSpecies1 = new EquineSpecies();
        equineSpecies1.setId(1L);
        EquineSpecies equineSpecies2 = new EquineSpecies();
        equineSpecies2.setId(equineSpecies1.getId());
        assertThat(equineSpecies1).isEqualTo(equineSpecies2);
        equineSpecies2.setId(2L);
        assertThat(equineSpecies1).isNotEqualTo(equineSpecies2);
        equineSpecies1.setId(null);
        assertThat(equineSpecies1).isNotEqualTo(equineSpecies2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EquineSpeciesDTO.class);
        EquineSpeciesDTO equineSpeciesDTO1 = new EquineSpeciesDTO();
        equineSpeciesDTO1.setId(1L);
        EquineSpeciesDTO equineSpeciesDTO2 = new EquineSpeciesDTO();
        assertThat(equineSpeciesDTO1).isNotEqualTo(equineSpeciesDTO2);
        equineSpeciesDTO2.setId(equineSpeciesDTO1.getId());
        assertThat(equineSpeciesDTO1).isEqualTo(equineSpeciesDTO2);
        equineSpeciesDTO2.setId(2L);
        assertThat(equineSpeciesDTO1).isNotEqualTo(equineSpeciesDTO2);
        equineSpeciesDTO1.setId(null);
        assertThat(equineSpeciesDTO1).isNotEqualTo(equineSpeciesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(equineSpeciesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(equineSpeciesMapper.fromId(null)).isNull();
    }
}
