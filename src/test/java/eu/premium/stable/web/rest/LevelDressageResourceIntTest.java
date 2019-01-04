package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.LevelDressage;
import eu.premium.stable.repository.LevelDressageRepository;
import eu.premium.stable.repository.search.LevelDressageSearchRepository;
import eu.premium.stable.service.LevelDressageService;
import eu.premium.stable.service.dto.LevelDressageDTO;
import eu.premium.stable.service.mapper.LevelDressageMapper;
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
 * Test class for the LevelDressageResource REST controller.
 *
 * @see LevelDressageResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class LevelDressageResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LevelDressageRepository levelDressageRepository;

    @Autowired
    private LevelDressageMapper levelDressageMapper;

    @Autowired
    private LevelDressageService levelDressageService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.LevelDressageSearchRepositoryMockConfiguration
     */
    @Autowired
    private LevelDressageSearchRepository mockLevelDressageSearchRepository;

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

    private MockMvc restLevelDressageMockMvc;

    private LevelDressage levelDressage;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LevelDressageResource levelDressageResource = new LevelDressageResource(levelDressageService);
        this.restLevelDressageMockMvc = MockMvcBuilders.standaloneSetup(levelDressageResource)
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
    public static LevelDressage createEntity(EntityManager em) {
        LevelDressage levelDressage = new LevelDressage()
            .description(DEFAULT_DESCRIPTION);
        return levelDressage;
    }

    @Before
    public void initTest() {
        levelDressage = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevelDressage() throws Exception {
        int databaseSizeBeforeCreate = levelDressageRepository.findAll().size();

        // Create the LevelDressage
        LevelDressageDTO levelDressageDTO = levelDressageMapper.toDto(levelDressage);
        restLevelDressageMockMvc.perform(post("/api/level-dressages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageDTO)))
            .andExpect(status().isCreated());

        // Validate the LevelDressage in the database
        List<LevelDressage> levelDressageList = levelDressageRepository.findAll();
        assertThat(levelDressageList).hasSize(databaseSizeBeforeCreate + 1);
        LevelDressage testLevelDressage = levelDressageList.get(levelDressageList.size() - 1);
        assertThat(testLevelDressage.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the LevelDressage in Elasticsearch
        verify(mockLevelDressageSearchRepository, times(1)).save(testLevelDressage);
    }

    @Test
    @Transactional
    public void createLevelDressageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levelDressageRepository.findAll().size();

        // Create the LevelDressage with an existing ID
        levelDressage.setId(1L);
        LevelDressageDTO levelDressageDTO = levelDressageMapper.toDto(levelDressage);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelDressageMockMvc.perform(post("/api/level-dressages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelDressage in the database
        List<LevelDressage> levelDressageList = levelDressageRepository.findAll();
        assertThat(levelDressageList).hasSize(databaseSizeBeforeCreate);

        // Validate the LevelDressage in Elasticsearch
        verify(mockLevelDressageSearchRepository, times(0)).save(levelDressage);
    }

    @Test
    @Transactional
    public void getAllLevelDressages() throws Exception {
        // Initialize the database
        levelDressageRepository.saveAndFlush(levelDressage);

        // Get all the levelDressageList
        restLevelDressageMockMvc.perform(get("/api/level-dressages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelDressage.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getLevelDressage() throws Exception {
        // Initialize the database
        levelDressageRepository.saveAndFlush(levelDressage);

        // Get the levelDressage
        restLevelDressageMockMvc.perform(get("/api/level-dressages/{id}", levelDressage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(levelDressage.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLevelDressage() throws Exception {
        // Get the levelDressage
        restLevelDressageMockMvc.perform(get("/api/level-dressages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevelDressage() throws Exception {
        // Initialize the database
        levelDressageRepository.saveAndFlush(levelDressage);

        int databaseSizeBeforeUpdate = levelDressageRepository.findAll().size();

        // Update the levelDressage
        LevelDressage updatedLevelDressage = levelDressageRepository.findById(levelDressage.getId()).get();
        // Disconnect from session so that the updates on updatedLevelDressage are not directly saved in db
        em.detach(updatedLevelDressage);
        updatedLevelDressage
            .description(UPDATED_DESCRIPTION);
        LevelDressageDTO levelDressageDTO = levelDressageMapper.toDto(updatedLevelDressage);

        restLevelDressageMockMvc.perform(put("/api/level-dressages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageDTO)))
            .andExpect(status().isOk());

        // Validate the LevelDressage in the database
        List<LevelDressage> levelDressageList = levelDressageRepository.findAll();
        assertThat(levelDressageList).hasSize(databaseSizeBeforeUpdate);
        LevelDressage testLevelDressage = levelDressageList.get(levelDressageList.size() - 1);
        assertThat(testLevelDressage.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the LevelDressage in Elasticsearch
        verify(mockLevelDressageSearchRepository, times(1)).save(testLevelDressage);
    }

    @Test
    @Transactional
    public void updateNonExistingLevelDressage() throws Exception {
        int databaseSizeBeforeUpdate = levelDressageRepository.findAll().size();

        // Create the LevelDressage
        LevelDressageDTO levelDressageDTO = levelDressageMapper.toDto(levelDressage);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelDressageMockMvc.perform(put("/api/level-dressages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelDressage in the database
        List<LevelDressage> levelDressageList = levelDressageRepository.findAll();
        assertThat(levelDressageList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LevelDressage in Elasticsearch
        verify(mockLevelDressageSearchRepository, times(0)).save(levelDressage);
    }

    @Test
    @Transactional
    public void deleteLevelDressage() throws Exception {
        // Initialize the database
        levelDressageRepository.saveAndFlush(levelDressage);

        int databaseSizeBeforeDelete = levelDressageRepository.findAll().size();

        // Get the levelDressage
        restLevelDressageMockMvc.perform(delete("/api/level-dressages/{id}", levelDressage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LevelDressage> levelDressageList = levelDressageRepository.findAll();
        assertThat(levelDressageList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LevelDressage in Elasticsearch
        verify(mockLevelDressageSearchRepository, times(1)).deleteById(levelDressage.getId());
    }

    @Test
    @Transactional
    public void searchLevelDressage() throws Exception {
        // Initialize the database
        levelDressageRepository.saveAndFlush(levelDressage);
        when(mockLevelDressageSearchRepository.search(queryStringQuery("id:" + levelDressage.getId())))
            .thenReturn(Collections.singletonList(levelDressage));
        // Search the levelDressage
        restLevelDressageMockMvc.perform(get("/api/_search/level-dressages?query=id:" + levelDressage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelDressage.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelDressage.class);
        LevelDressage levelDressage1 = new LevelDressage();
        levelDressage1.setId(1L);
        LevelDressage levelDressage2 = new LevelDressage();
        levelDressage2.setId(levelDressage1.getId());
        assertThat(levelDressage1).isEqualTo(levelDressage2);
        levelDressage2.setId(2L);
        assertThat(levelDressage1).isNotEqualTo(levelDressage2);
        levelDressage1.setId(null);
        assertThat(levelDressage1).isNotEqualTo(levelDressage2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelDressageDTO.class);
        LevelDressageDTO levelDressageDTO1 = new LevelDressageDTO();
        levelDressageDTO1.setId(1L);
        LevelDressageDTO levelDressageDTO2 = new LevelDressageDTO();
        assertThat(levelDressageDTO1).isNotEqualTo(levelDressageDTO2);
        levelDressageDTO2.setId(levelDressageDTO1.getId());
        assertThat(levelDressageDTO1).isEqualTo(levelDressageDTO2);
        levelDressageDTO2.setId(2L);
        assertThat(levelDressageDTO1).isNotEqualTo(levelDressageDTO2);
        levelDressageDTO1.setId(null);
        assertThat(levelDressageDTO1).isNotEqualTo(levelDressageDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(levelDressageMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(levelDressageMapper.fromId(null)).isNull();
    }
}
