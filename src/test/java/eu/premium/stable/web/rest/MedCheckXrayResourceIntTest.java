package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.MedCheckXray;
import eu.premium.stable.repository.MedCheckXrayRepository;
import eu.premium.stable.repository.search.MedCheckXraySearchRepository;
import eu.premium.stable.service.MedCheckXrayService;
import eu.premium.stable.service.dto.MedCheckXrayDTO;
import eu.premium.stable.service.mapper.MedCheckXrayMapper;
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
import org.springframework.util.Base64Utils;
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
 * Test class for the MedCheckXrayResource REST controller.
 *
 * @see MedCheckXrayResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class MedCheckXrayResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private MedCheckXrayRepository medCheckXrayRepository;

    @Autowired
    private MedCheckXrayMapper medCheckXrayMapper;

    @Autowired
    private MedCheckXrayService medCheckXrayService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.MedCheckXraySearchRepositoryMockConfiguration
     */
    @Autowired
    private MedCheckXraySearchRepository mockMedCheckXraySearchRepository;

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

    private MockMvc restMedCheckXrayMockMvc;

    private MedCheckXray medCheckXray;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedCheckXrayResource medCheckXrayResource = new MedCheckXrayResource(medCheckXrayService);
        this.restMedCheckXrayMockMvc = MockMvcBuilders.standaloneSetup(medCheckXrayResource)
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
    public static MedCheckXray createEntity(EntityManager em) {
        MedCheckXray medCheckXray = new MedCheckXray()
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return medCheckXray;
    }

    @Before
    public void initTest() {
        medCheckXray = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedCheckXray() throws Exception {
        int databaseSizeBeforeCreate = medCheckXrayRepository.findAll().size();

        // Create the MedCheckXray
        MedCheckXrayDTO medCheckXrayDTO = medCheckXrayMapper.toDto(medCheckXray);
        restMedCheckXrayMockMvc.perform(post("/api/med-check-xrays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckXrayDTO)))
            .andExpect(status().isCreated());

        // Validate the MedCheckXray in the database
        List<MedCheckXray> medCheckXrayList = medCheckXrayRepository.findAll();
        assertThat(medCheckXrayList).hasSize(databaseSizeBeforeCreate + 1);
        MedCheckXray testMedCheckXray = medCheckXrayList.get(medCheckXrayList.size() - 1);
        assertThat(testMedCheckXray.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMedCheckXray.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testMedCheckXray.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);

        // Validate the MedCheckXray in Elasticsearch
        verify(mockMedCheckXraySearchRepository, times(1)).save(testMedCheckXray);
    }

    @Test
    @Transactional
    public void createMedCheckXrayWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medCheckXrayRepository.findAll().size();

        // Create the MedCheckXray with an existing ID
        medCheckXray.setId(1L);
        MedCheckXrayDTO medCheckXrayDTO = medCheckXrayMapper.toDto(medCheckXray);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedCheckXrayMockMvc.perform(post("/api/med-check-xrays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckXrayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheckXray in the database
        List<MedCheckXray> medCheckXrayList = medCheckXrayRepository.findAll();
        assertThat(medCheckXrayList).hasSize(databaseSizeBeforeCreate);

        // Validate the MedCheckXray in Elasticsearch
        verify(mockMedCheckXraySearchRepository, times(0)).save(medCheckXray);
    }

    @Test
    @Transactional
    public void getAllMedCheckXrays() throws Exception {
        // Initialize the database
        medCheckXrayRepository.saveAndFlush(medCheckXray);

        // Get all the medCheckXrayList
        restMedCheckXrayMockMvc.perform(get("/api/med-check-xrays?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheckXray.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getMedCheckXray() throws Exception {
        // Initialize the database
        medCheckXrayRepository.saveAndFlush(medCheckXray);

        // Get the medCheckXray
        restMedCheckXrayMockMvc.perform(get("/api/med-check-xrays/{id}", medCheckXray.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medCheckXray.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingMedCheckXray() throws Exception {
        // Get the medCheckXray
        restMedCheckXrayMockMvc.perform(get("/api/med-check-xrays/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedCheckXray() throws Exception {
        // Initialize the database
        medCheckXrayRepository.saveAndFlush(medCheckXray);

        int databaseSizeBeforeUpdate = medCheckXrayRepository.findAll().size();

        // Update the medCheckXray
        MedCheckXray updatedMedCheckXray = medCheckXrayRepository.findById(medCheckXray.getId()).get();
        // Disconnect from session so that the updates on updatedMedCheckXray are not directly saved in db
        em.detach(updatedMedCheckXray);
        updatedMedCheckXray
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        MedCheckXrayDTO medCheckXrayDTO = medCheckXrayMapper.toDto(updatedMedCheckXray);

        restMedCheckXrayMockMvc.perform(put("/api/med-check-xrays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckXrayDTO)))
            .andExpect(status().isOk());

        // Validate the MedCheckXray in the database
        List<MedCheckXray> medCheckXrayList = medCheckXrayRepository.findAll();
        assertThat(medCheckXrayList).hasSize(databaseSizeBeforeUpdate);
        MedCheckXray testMedCheckXray = medCheckXrayList.get(medCheckXrayList.size() - 1);
        assertThat(testMedCheckXray.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMedCheckXray.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testMedCheckXray.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);

        // Validate the MedCheckXray in Elasticsearch
        verify(mockMedCheckXraySearchRepository, times(1)).save(testMedCheckXray);
    }

    @Test
    @Transactional
    public void updateNonExistingMedCheckXray() throws Exception {
        int databaseSizeBeforeUpdate = medCheckXrayRepository.findAll().size();

        // Create the MedCheckXray
        MedCheckXrayDTO medCheckXrayDTO = medCheckXrayMapper.toDto(medCheckXray);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedCheckXrayMockMvc.perform(put("/api/med-check-xrays")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckXrayDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheckXray in the database
        List<MedCheckXray> medCheckXrayList = medCheckXrayRepository.findAll();
        assertThat(medCheckXrayList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MedCheckXray in Elasticsearch
        verify(mockMedCheckXraySearchRepository, times(0)).save(medCheckXray);
    }

    @Test
    @Transactional
    public void deleteMedCheckXray() throws Exception {
        // Initialize the database
        medCheckXrayRepository.saveAndFlush(medCheckXray);

        int databaseSizeBeforeDelete = medCheckXrayRepository.findAll().size();

        // Get the medCheckXray
        restMedCheckXrayMockMvc.perform(delete("/api/med-check-xrays/{id}", medCheckXray.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedCheckXray> medCheckXrayList = medCheckXrayRepository.findAll();
        assertThat(medCheckXrayList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MedCheckXray in Elasticsearch
        verify(mockMedCheckXraySearchRepository, times(1)).deleteById(medCheckXray.getId());
    }

    @Test
    @Transactional
    public void searchMedCheckXray() throws Exception {
        // Initialize the database
        medCheckXrayRepository.saveAndFlush(medCheckXray);
        when(mockMedCheckXraySearchRepository.search(queryStringQuery("id:" + medCheckXray.getId())))
            .thenReturn(Collections.singletonList(medCheckXray));
        // Search the medCheckXray
        restMedCheckXrayMockMvc.perform(get("/api/_search/med-check-xrays?query=id:" + medCheckXray.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheckXray.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheckXray.class);
        MedCheckXray medCheckXray1 = new MedCheckXray();
        medCheckXray1.setId(1L);
        MedCheckXray medCheckXray2 = new MedCheckXray();
        medCheckXray2.setId(medCheckXray1.getId());
        assertThat(medCheckXray1).isEqualTo(medCheckXray2);
        medCheckXray2.setId(2L);
        assertThat(medCheckXray1).isNotEqualTo(medCheckXray2);
        medCheckXray1.setId(null);
        assertThat(medCheckXray1).isNotEqualTo(medCheckXray2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheckXrayDTO.class);
        MedCheckXrayDTO medCheckXrayDTO1 = new MedCheckXrayDTO();
        medCheckXrayDTO1.setId(1L);
        MedCheckXrayDTO medCheckXrayDTO2 = new MedCheckXrayDTO();
        assertThat(medCheckXrayDTO1).isNotEqualTo(medCheckXrayDTO2);
        medCheckXrayDTO2.setId(medCheckXrayDTO1.getId());
        assertThat(medCheckXrayDTO1).isEqualTo(medCheckXrayDTO2);
        medCheckXrayDTO2.setId(2L);
        assertThat(medCheckXrayDTO1).isNotEqualTo(medCheckXrayDTO2);
        medCheckXrayDTO1.setId(null);
        assertThat(medCheckXrayDTO1).isNotEqualTo(medCheckXrayDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(medCheckXrayMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(medCheckXrayMapper.fromId(null)).isNull();
    }
}
