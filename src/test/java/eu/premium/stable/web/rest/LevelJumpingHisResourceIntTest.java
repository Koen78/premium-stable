package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.LevelJumpingHis;
import eu.premium.stable.repository.LevelJumpingHisRepository;
import eu.premium.stable.repository.search.LevelJumpingHisSearchRepository;
import eu.premium.stable.service.LevelJumpingHisService;
import eu.premium.stable.service.dto.LevelJumpingHisDTO;
import eu.premium.stable.service.mapper.LevelJumpingHisMapper;
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
 * Test class for the LevelJumpingHisResource REST controller.
 *
 * @see LevelJumpingHisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class LevelJumpingHisResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LevelJumpingHisRepository levelJumpingHisRepository;

    @Autowired
    private LevelJumpingHisMapper levelJumpingHisMapper;

    @Autowired
    private LevelJumpingHisService levelJumpingHisService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.LevelJumpingHisSearchRepositoryMockConfiguration
     */
    @Autowired
    private LevelJumpingHisSearchRepository mockLevelJumpingHisSearchRepository;

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

    private MockMvc restLevelJumpingHisMockMvc;

    private LevelJumpingHis levelJumpingHis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LevelJumpingHisResource levelJumpingHisResource = new LevelJumpingHisResource(levelJumpingHisService);
        this.restLevelJumpingHisMockMvc = MockMvcBuilders.standaloneSetup(levelJumpingHisResource)
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
    public static LevelJumpingHis createEntity(EntityManager em) {
        LevelJumpingHis levelJumpingHis = new LevelJumpingHis()
            .date(DEFAULT_DATE);
        return levelJumpingHis;
    }

    @Before
    public void initTest() {
        levelJumpingHis = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevelJumpingHis() throws Exception {
        int databaseSizeBeforeCreate = levelJumpingHisRepository.findAll().size();

        // Create the LevelJumpingHis
        LevelJumpingHisDTO levelJumpingHisDTO = levelJumpingHisMapper.toDto(levelJumpingHis);
        restLevelJumpingHisMockMvc.perform(post("/api/level-jumping-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingHisDTO)))
            .andExpect(status().isCreated());

        // Validate the LevelJumpingHis in the database
        List<LevelJumpingHis> levelJumpingHisList = levelJumpingHisRepository.findAll();
        assertThat(levelJumpingHisList).hasSize(databaseSizeBeforeCreate + 1);
        LevelJumpingHis testLevelJumpingHis = levelJumpingHisList.get(levelJumpingHisList.size() - 1);
        assertThat(testLevelJumpingHis.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the LevelJumpingHis in Elasticsearch
        verify(mockLevelJumpingHisSearchRepository, times(1)).save(testLevelJumpingHis);
    }

    @Test
    @Transactional
    public void createLevelJumpingHisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levelJumpingHisRepository.findAll().size();

        // Create the LevelJumpingHis with an existing ID
        levelJumpingHis.setId(1L);
        LevelJumpingHisDTO levelJumpingHisDTO = levelJumpingHisMapper.toDto(levelJumpingHis);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelJumpingHisMockMvc.perform(post("/api/level-jumping-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingHisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelJumpingHis in the database
        List<LevelJumpingHis> levelJumpingHisList = levelJumpingHisRepository.findAll();
        assertThat(levelJumpingHisList).hasSize(databaseSizeBeforeCreate);

        // Validate the LevelJumpingHis in Elasticsearch
        verify(mockLevelJumpingHisSearchRepository, times(0)).save(levelJumpingHis);
    }

    @Test
    @Transactional
    public void getAllLevelJumpingHis() throws Exception {
        // Initialize the database
        levelJumpingHisRepository.saveAndFlush(levelJumpingHis);

        // Get all the levelJumpingHisList
        restLevelJumpingHisMockMvc.perform(get("/api/level-jumping-his?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelJumpingHis.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getLevelJumpingHis() throws Exception {
        // Initialize the database
        levelJumpingHisRepository.saveAndFlush(levelJumpingHis);

        // Get the levelJumpingHis
        restLevelJumpingHisMockMvc.perform(get("/api/level-jumping-his/{id}", levelJumpingHis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(levelJumpingHis.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLevelJumpingHis() throws Exception {
        // Get the levelJumpingHis
        restLevelJumpingHisMockMvc.perform(get("/api/level-jumping-his/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevelJumpingHis() throws Exception {
        // Initialize the database
        levelJumpingHisRepository.saveAndFlush(levelJumpingHis);

        int databaseSizeBeforeUpdate = levelJumpingHisRepository.findAll().size();

        // Update the levelJumpingHis
        LevelJumpingHis updatedLevelJumpingHis = levelJumpingHisRepository.findById(levelJumpingHis.getId()).get();
        // Disconnect from session so that the updates on updatedLevelJumpingHis are not directly saved in db
        em.detach(updatedLevelJumpingHis);
        updatedLevelJumpingHis
            .date(UPDATED_DATE);
        LevelJumpingHisDTO levelJumpingHisDTO = levelJumpingHisMapper.toDto(updatedLevelJumpingHis);

        restLevelJumpingHisMockMvc.perform(put("/api/level-jumping-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingHisDTO)))
            .andExpect(status().isOk());

        // Validate the LevelJumpingHis in the database
        List<LevelJumpingHis> levelJumpingHisList = levelJumpingHisRepository.findAll();
        assertThat(levelJumpingHisList).hasSize(databaseSizeBeforeUpdate);
        LevelJumpingHis testLevelJumpingHis = levelJumpingHisList.get(levelJumpingHisList.size() - 1);
        assertThat(testLevelJumpingHis.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the LevelJumpingHis in Elasticsearch
        verify(mockLevelJumpingHisSearchRepository, times(1)).save(testLevelJumpingHis);
    }

    @Test
    @Transactional
    public void updateNonExistingLevelJumpingHis() throws Exception {
        int databaseSizeBeforeUpdate = levelJumpingHisRepository.findAll().size();

        // Create the LevelJumpingHis
        LevelJumpingHisDTO levelJumpingHisDTO = levelJumpingHisMapper.toDto(levelJumpingHis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelJumpingHisMockMvc.perform(put("/api/level-jumping-his")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingHisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelJumpingHis in the database
        List<LevelJumpingHis> levelJumpingHisList = levelJumpingHisRepository.findAll();
        assertThat(levelJumpingHisList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LevelJumpingHis in Elasticsearch
        verify(mockLevelJumpingHisSearchRepository, times(0)).save(levelJumpingHis);
    }

    @Test
    @Transactional
    public void deleteLevelJumpingHis() throws Exception {
        // Initialize the database
        levelJumpingHisRepository.saveAndFlush(levelJumpingHis);

        int databaseSizeBeforeDelete = levelJumpingHisRepository.findAll().size();

        // Get the levelJumpingHis
        restLevelJumpingHisMockMvc.perform(delete("/api/level-jumping-his/{id}", levelJumpingHis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LevelJumpingHis> levelJumpingHisList = levelJumpingHisRepository.findAll();
        assertThat(levelJumpingHisList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LevelJumpingHis in Elasticsearch
        verify(mockLevelJumpingHisSearchRepository, times(1)).deleteById(levelJumpingHis.getId());
    }

    @Test
    @Transactional
    public void searchLevelJumpingHis() throws Exception {
        // Initialize the database
        levelJumpingHisRepository.saveAndFlush(levelJumpingHis);
        when(mockLevelJumpingHisSearchRepository.search(queryStringQuery("id:" + levelJumpingHis.getId())))
            .thenReturn(Collections.singletonList(levelJumpingHis));
        // Search the levelJumpingHis
        restLevelJumpingHisMockMvc.perform(get("/api/_search/level-jumping-his?query=id:" + levelJumpingHis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelJumpingHis.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelJumpingHis.class);
        LevelJumpingHis levelJumpingHis1 = new LevelJumpingHis();
        levelJumpingHis1.setId(1L);
        LevelJumpingHis levelJumpingHis2 = new LevelJumpingHis();
        levelJumpingHis2.setId(levelJumpingHis1.getId());
        assertThat(levelJumpingHis1).isEqualTo(levelJumpingHis2);
        levelJumpingHis2.setId(2L);
        assertThat(levelJumpingHis1).isNotEqualTo(levelJumpingHis2);
        levelJumpingHis1.setId(null);
        assertThat(levelJumpingHis1).isNotEqualTo(levelJumpingHis2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelJumpingHisDTO.class);
        LevelJumpingHisDTO levelJumpingHisDTO1 = new LevelJumpingHisDTO();
        levelJumpingHisDTO1.setId(1L);
        LevelJumpingHisDTO levelJumpingHisDTO2 = new LevelJumpingHisDTO();
        assertThat(levelJumpingHisDTO1).isNotEqualTo(levelJumpingHisDTO2);
        levelJumpingHisDTO2.setId(levelJumpingHisDTO1.getId());
        assertThat(levelJumpingHisDTO1).isEqualTo(levelJumpingHisDTO2);
        levelJumpingHisDTO2.setId(2L);
        assertThat(levelJumpingHisDTO1).isNotEqualTo(levelJumpingHisDTO2);
        levelJumpingHisDTO1.setId(null);
        assertThat(levelJumpingHisDTO1).isNotEqualTo(levelJumpingHisDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(levelJumpingHisMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(levelJumpingHisMapper.fromId(null)).isNull();
    }
}
