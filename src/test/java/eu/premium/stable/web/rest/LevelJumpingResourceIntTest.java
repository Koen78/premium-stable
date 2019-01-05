package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.LevelJumping;
import eu.premium.stable.repository.LevelJumpingRepository;
import eu.premium.stable.repository.search.LevelJumpingSearchRepository;
import eu.premium.stable.service.LevelJumpingService;
import eu.premium.stable.service.dto.LevelJumpingDTO;
import eu.premium.stable.service.mapper.LevelJumpingMapper;
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
 * Test class for the LevelJumpingResource REST controller.
 *
 * @see LevelJumpingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class LevelJumpingResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LevelJumpingRepository levelJumpingRepository;

    @Autowired
    private LevelJumpingMapper levelJumpingMapper;

    @Autowired
    private LevelJumpingService levelJumpingService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.LevelJumpingSearchRepositoryMockConfiguration
     */
    @Autowired
    private LevelJumpingSearchRepository mockLevelJumpingSearchRepository;

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

    private MockMvc restLevelJumpingMockMvc;

    private LevelJumping levelJumping;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LevelJumpingResource levelJumpingResource = new LevelJumpingResource(levelJumpingService);
        this.restLevelJumpingMockMvc = MockMvcBuilders.standaloneSetup(levelJumpingResource)
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
    public static LevelJumping createEntity(EntityManager em) {
        LevelJumping levelJumping = new LevelJumping()
            .description(DEFAULT_DESCRIPTION);
        return levelJumping;
    }

    @Before
    public void initTest() {
        levelJumping = createEntity(em);
    }

    @Test
    @Transactional
    public void createLevelJumping() throws Exception {
        int databaseSizeBeforeCreate = levelJumpingRepository.findAll().size();

        // Create the LevelJumping
        LevelJumpingDTO levelJumpingDTO = levelJumpingMapper.toDto(levelJumping);
        restLevelJumpingMockMvc.perform(post("/api/level-jumpings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingDTO)))
            .andExpect(status().isCreated());

        // Validate the LevelJumping in the database
        List<LevelJumping> levelJumpingList = levelJumpingRepository.findAll();
        assertThat(levelJumpingList).hasSize(databaseSizeBeforeCreate + 1);
        LevelJumping testLevelJumping = levelJumpingList.get(levelJumpingList.size() - 1);
        assertThat(testLevelJumping.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the LevelJumping in Elasticsearch
        verify(mockLevelJumpingSearchRepository, times(1)).save(testLevelJumping);
    }

    @Test
    @Transactional
    public void createLevelJumpingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = levelJumpingRepository.findAll().size();

        // Create the LevelJumping with an existing ID
        levelJumping.setId(1L);
        LevelJumpingDTO levelJumpingDTO = levelJumpingMapper.toDto(levelJumping);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLevelJumpingMockMvc.perform(post("/api/level-jumpings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelJumping in the database
        List<LevelJumping> levelJumpingList = levelJumpingRepository.findAll();
        assertThat(levelJumpingList).hasSize(databaseSizeBeforeCreate);

        // Validate the LevelJumping in Elasticsearch
        verify(mockLevelJumpingSearchRepository, times(0)).save(levelJumping);
    }

    @Test
    @Transactional
    public void getAllLevelJumpings() throws Exception {
        // Initialize the database
        levelJumpingRepository.saveAndFlush(levelJumping);

        // Get all the levelJumpingList
        restLevelJumpingMockMvc.perform(get("/api/level-jumpings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelJumping.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getLevelJumping() throws Exception {
        // Initialize the database
        levelJumpingRepository.saveAndFlush(levelJumping);

        // Get the levelJumping
        restLevelJumpingMockMvc.perform(get("/api/level-jumpings/{id}", levelJumping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(levelJumping.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLevelJumping() throws Exception {
        // Get the levelJumping
        restLevelJumpingMockMvc.perform(get("/api/level-jumpings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLevelJumping() throws Exception {
        // Initialize the database
        levelJumpingRepository.saveAndFlush(levelJumping);

        int databaseSizeBeforeUpdate = levelJumpingRepository.findAll().size();

        // Update the levelJumping
        LevelJumping updatedLevelJumping = levelJumpingRepository.findById(levelJumping.getId()).get();
        // Disconnect from session so that the updates on updatedLevelJumping are not directly saved in db
        em.detach(updatedLevelJumping);
        updatedLevelJumping
            .description(UPDATED_DESCRIPTION);
        LevelJumpingDTO levelJumpingDTO = levelJumpingMapper.toDto(updatedLevelJumping);

        restLevelJumpingMockMvc.perform(put("/api/level-jumpings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingDTO)))
            .andExpect(status().isOk());

        // Validate the LevelJumping in the database
        List<LevelJumping> levelJumpingList = levelJumpingRepository.findAll();
        assertThat(levelJumpingList).hasSize(databaseSizeBeforeUpdate);
        LevelJumping testLevelJumping = levelJumpingList.get(levelJumpingList.size() - 1);
        assertThat(testLevelJumping.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the LevelJumping in Elasticsearch
        verify(mockLevelJumpingSearchRepository, times(1)).save(testLevelJumping);
    }

    @Test
    @Transactional
    public void updateNonExistingLevelJumping() throws Exception {
        int databaseSizeBeforeUpdate = levelJumpingRepository.findAll().size();

        // Create the LevelJumping
        LevelJumpingDTO levelJumpingDTO = levelJumpingMapper.toDto(levelJumping);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLevelJumpingMockMvc.perform(put("/api/level-jumpings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(levelJumpingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LevelJumping in the database
        List<LevelJumping> levelJumpingList = levelJumpingRepository.findAll();
        assertThat(levelJumpingList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LevelJumping in Elasticsearch
        verify(mockLevelJumpingSearchRepository, times(0)).save(levelJumping);
    }

    @Test
    @Transactional
    public void deleteLevelJumping() throws Exception {
        // Initialize the database
        levelJumpingRepository.saveAndFlush(levelJumping);

        int databaseSizeBeforeDelete = levelJumpingRepository.findAll().size();

        // Get the levelJumping
        restLevelJumpingMockMvc.perform(delete("/api/level-jumpings/{id}", levelJumping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LevelJumping> levelJumpingList = levelJumpingRepository.findAll();
        assertThat(levelJumpingList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LevelJumping in Elasticsearch
        verify(mockLevelJumpingSearchRepository, times(1)).deleteById(levelJumping.getId());
    }

    @Test
    @Transactional
    public void searchLevelJumping() throws Exception {
        // Initialize the database
        levelJumpingRepository.saveAndFlush(levelJumping);
        when(mockLevelJumpingSearchRepository.search(queryStringQuery("id:" + levelJumping.getId())))
            .thenReturn(Collections.singletonList(levelJumping));
        // Search the levelJumping
        restLevelJumpingMockMvc.perform(get("/api/_search/level-jumpings?query=id:" + levelJumping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(levelJumping.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelJumping.class);
        LevelJumping levelJumping1 = new LevelJumping();
        levelJumping1.setId(1L);
        LevelJumping levelJumping2 = new LevelJumping();
        levelJumping2.setId(levelJumping1.getId());
        assertThat(levelJumping1).isEqualTo(levelJumping2);
        levelJumping2.setId(2L);
        assertThat(levelJumping1).isNotEqualTo(levelJumping2);
        levelJumping1.setId(null);
        assertThat(levelJumping1).isNotEqualTo(levelJumping2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LevelJumpingDTO.class);
        LevelJumpingDTO levelJumpingDTO1 = new LevelJumpingDTO();
        levelJumpingDTO1.setId(1L);
        LevelJumpingDTO levelJumpingDTO2 = new LevelJumpingDTO();
        assertThat(levelJumpingDTO1).isNotEqualTo(levelJumpingDTO2);
        levelJumpingDTO2.setId(levelJumpingDTO1.getId());
        assertThat(levelJumpingDTO1).isEqualTo(levelJumpingDTO2);
        levelJumpingDTO2.setId(2L);
        assertThat(levelJumpingDTO1).isNotEqualTo(levelJumpingDTO2);
        levelJumpingDTO1.setId(null);
        assertThat(levelJumpingDTO1).isNotEqualTo(levelJumpingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(levelJumpingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(levelJumpingMapper.fromId(null)).isNull();
    }
}
