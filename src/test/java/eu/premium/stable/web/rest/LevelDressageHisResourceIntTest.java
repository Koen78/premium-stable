package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.LevelDressageHis;
import eu.premium.stable.repository.LevelDressageHisRepository;
import eu.premium.stable.repository.search.LevelDressageHisSearchRepository;
import eu.premium.stable.service.LevelDressageHisService;
import eu.premium.stable.service.dto.LevelDressageHisDTO;
import eu.premium.stable.service.mapper.LevelDressageHisMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Test class for the LevelDressageHisResource REST controller.
 *
 * @see LevelDressageHisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class LevelDressageHisResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LevelDressageHisRepository levelDressageHisRepository;

    @Autowired
    private LevelDressageHisMapper levelDressageHisMapper;

    @Autowired
    private LevelDressageHisService levelDressageHisService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.LevelDressageHisSearchRepositoryMockConfiguration
     */
    @Autowired
    private LevelDressageHisSearchRepository mockLevelDressageHisSearchRepository;

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

    private MockMvc restLevelDressageHisMockMvc;

    private LevelDressageHis levelDressageHis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LevelDressageHisResource levelDressageHisResource = new LevelDressageHisResource(levelDressageHisService);
        this.restLevelDressageHisMockMvc = MockMvcBuilders.standaloneSetup(levelDressageHisResource)
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
    public static LevelDressageHis createEntity(EntityManager em) {
        LevelDressageHis levelDressageHis = new LevelDressageHis()
            .date(DEFAULT_DATE);
        return levelDressageHis;
    }

    @Before
    public void initTest() {
        levelDressageHis = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevelDressageHis() throws Exception {
        int databaseSizeBeforeCreate = levelDressageHisRepository.findAll().size();

        // Create the LevelDressageHis
        LevelDressageHisDTO levelDressageHisDTO = levelDressageHisMapper.toDto(levelDressageHis);
        restLevelDressageHisMockMvc.perform(post("/api/level-dressage-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageHisDTO)))
            .andExpect(status().isCreated());

        // Validate the LevelDressageHis in the database
        List<LevelDressageHis> levelDressageHisList = levelDressageHisRepository.findAll();
        assertThat(levelDressageHisList).hasSize(databaseSizeBeforeCreate + 1);
        LevelDressageHis testLevelDressageHis = levelDressageHisList.get(levelDressageHisList.size() - 1);
        assertThat(testLevelDressageHis.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the LevelDressageHis in Elasticsearch
        verify(mockLevelDressageHisSearchRepository, times(1)).save(testLevelDressageHis);
    }

    @Test
    @Transactional
    public void createLevelDressageHisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levelDressageHisRepository.findAll().size();

        // Create the LevelDressageHis with an existing ID
        levelDressageHis.setId(1L);
        LevelDressageHisDTO levelDressageHisDTO = levelDressageHisMapper.toDto(levelDressageHis);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelDressageHisMockMvc.perform(post("/api/level-dressage-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageHisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelDressageHis in the database
        List<LevelDressageHis> levelDressageHisList = levelDressageHisRepository.findAll();
        assertThat(levelDressageHisList).hasSize(databaseSizeBeforeCreate);

        // Validate the LevelDressageHis in Elasticsearch
        verify(mockLevelDressageHisSearchRepository, times(0)).save(levelDressageHis);
    }

    @Test
    @Transactional
    public void getAllLevelDressageHis() throws Exception {
        // Initialize the database
        levelDressageHisRepository.saveAndFlush(levelDressageHis);

        // Get all the levelDressageHisList
        restLevelDressageHisMockMvc.perform(get("/api/level-dressage-his?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelDressageHis.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getLevelDressageHis() throws Exception {
        // Initialize the database
        levelDressageHisRepository.saveAndFlush(levelDressageHis);

        // Get the levelDressageHis
        restLevelDressageHisMockMvc.perform(get("/api/level-dressage-his/{id}", levelDressageHis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(levelDressageHis.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLevelDressageHis() throws Exception {
        // Get the levelDressageHis
        restLevelDressageHisMockMvc.perform(get("/api/level-dressage-his/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevelDressageHis() throws Exception {
        // Initialize the database
        levelDressageHisRepository.saveAndFlush(levelDressageHis);

        int databaseSizeBeforeUpdate = levelDressageHisRepository.findAll().size();

        // Update the levelDressageHis
        LevelDressageHis updatedLevelDressageHis = levelDressageHisRepository.findById(levelDressageHis.getId()).get();
        // Disconnect from session so that the updates on updatedLevelDressageHis are not directly saved in db
        em.detach(updatedLevelDressageHis);
        updatedLevelDressageHis
            .date(UPDATED_DATE);
        LevelDressageHisDTO levelDressageHisDTO = levelDressageHisMapper.toDto(updatedLevelDressageHis);

        restLevelDressageHisMockMvc.perform(put("/api/level-dressage-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageHisDTO)))
            .andExpect(status().isOk());

        // Validate the LevelDressageHis in the database
        List<LevelDressageHis> levelDressageHisList = levelDressageHisRepository.findAll();
        assertThat(levelDressageHisList).hasSize(databaseSizeBeforeUpdate);
        LevelDressageHis testLevelDressageHis = levelDressageHisList.get(levelDressageHisList.size() - 1);
        assertThat(testLevelDressageHis.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the LevelDressageHis in Elasticsearch
        verify(mockLevelDressageHisSearchRepository, times(1)).save(testLevelDressageHis);
    }

    @Test
    @Transactional
    public void updateNonExistingLevelDressageHis() throws Exception {
        int databaseSizeBeforeUpdate = levelDressageHisRepository.findAll().size();

        // Create the LevelDressageHis
        LevelDressageHisDTO levelDressageHisDTO = levelDressageHisMapper.toDto(levelDressageHis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelDressageHisMockMvc.perform(put("/api/level-dressage-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelDressageHisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelDressageHis in the database
        List<LevelDressageHis> levelDressageHisList = levelDressageHisRepository.findAll();
        assertThat(levelDressageHisList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LevelDressageHis in Elasticsearch
        verify(mockLevelDressageHisSearchRepository, times(0)).save(levelDressageHis);
    }

    @Test
    @Transactional
    public void deleteLevelDressageHis() throws Exception {
        // Initialize the database
        levelDressageHisRepository.saveAndFlush(levelDressageHis);

        int databaseSizeBeforeDelete = levelDressageHisRepository.findAll().size();

        // Get the levelDressageHis
        restLevelDressageHisMockMvc.perform(delete("/api/level-dressage-his/{id}", levelDressageHis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LevelDressageHis> levelDressageHisList = levelDressageHisRepository.findAll();
        assertThat(levelDressageHisList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LevelDressageHis in Elasticsearch
        verify(mockLevelDressageHisSearchRepository, times(1)).deleteById(levelDressageHis.getId());
    }

    @Test
    @Transactional
    public void searchLevelDressageHis() throws Exception {
        // Initialize the database
        levelDressageHisRepository.saveAndFlush(levelDressageHis);
        when(mockLevelDressageHisSearchRepository.search(queryStringQuery("id:" + levelDressageHis.getId())))
            .thenReturn(Collections.singletonList(levelDressageHis));
        // Search the levelDressageHis
        restLevelDressageHisMockMvc.perform(get("/api/_search/level-dressage-his?query=id:" + levelDressageHis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelDressageHis.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelDressageHis.class);
        LevelDressageHis levelDressageHis1 = new LevelDressageHis();
        levelDressageHis1.setId(1L);
        LevelDressageHis levelDressageHis2 = new LevelDressageHis();
        levelDressageHis2.setId(levelDressageHis1.getId());
        assertThat(levelDressageHis1).isEqualTo(levelDressageHis2);
        levelDressageHis2.setId(2L);
        assertThat(levelDressageHis1).isNotEqualTo(levelDressageHis2);
        levelDressageHis1.setId(null);
        assertThat(levelDressageHis1).isNotEqualTo(levelDressageHis2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelDressageHisDTO.class);
        LevelDressageHisDTO levelDressageHisDTO1 = new LevelDressageHisDTO();
        levelDressageHisDTO1.setId(1L);
        LevelDressageHisDTO levelDressageHisDTO2 = new LevelDressageHisDTO();
        assertThat(levelDressageHisDTO1).isNotEqualTo(levelDressageHisDTO2);
        levelDressageHisDTO2.setId(levelDressageHisDTO1.getId());
        assertThat(levelDressageHisDTO1).isEqualTo(levelDressageHisDTO2);
        levelDressageHisDTO2.setId(2L);
        assertThat(levelDressageHisDTO1).isNotEqualTo(levelDressageHisDTO2);
        levelDressageHisDTO1.setId(null);
        assertThat(levelDressageHisDTO1).isNotEqualTo(levelDressageHisDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(levelDressageHisMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(levelDressageHisMapper.fromId(null)).isNull();
    }
}
