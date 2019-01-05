package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.MedCheckDet;
import eu.premium.stable.repository.MedCheckDetRepository;
import eu.premium.stable.repository.search.MedCheckDetSearchRepository;
import eu.premium.stable.service.MedCheckDetService;
import eu.premium.stable.service.dto.MedCheckDetDTO;
import eu.premium.stable.service.mapper.MedCheckDetMapper;
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
 * Test class for the MedCheckDetResource REST controller.
 *
 * @see MedCheckDetResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class MedCheckDetResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_RESULT = "AAAAAAAAAA";
    private static final String UPDATED_RESULT = "BBBBBBBBBB";

    @Autowired
    private MedCheckDetRepository medCheckDetRepository;

    @Autowired
    private MedCheckDetMapper medCheckDetMapper;

    @Autowired
    private MedCheckDetService medCheckDetService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.MedCheckDetSearchRepositoryMockConfiguration
     */
    @Autowired
    private MedCheckDetSearchRepository mockMedCheckDetSearchRepository;

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

    private MockMvc restMedCheckDetMockMvc;

    private MedCheckDet medCheckDet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedCheckDetResource medCheckDetResource = new MedCheckDetResource(medCheckDetService);
        this.restMedCheckDetMockMvc = MockMvcBuilders.standaloneSetup(medCheckDetResource)
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
    public static MedCheckDet createEntity(EntityManager em) {
        MedCheckDet medCheckDet = new MedCheckDet()
            .code(DEFAULT_CODE)
            .result(DEFAULT_RESULT);
        return medCheckDet;
    }

    @Before
    public void initTest() {
        medCheckDet = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedCheckDet() throws Exception {
        int databaseSizeBeforeCreate = medCheckDetRepository.findAll().size();

        // Create the MedCheckDet
        MedCheckDetDTO medCheckDetDTO = medCheckDetMapper.toDto(medCheckDet);
        restMedCheckDetMockMvc.perform(post("/api/med-check-dets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDetDTO)))
            .andExpect(status().isCreated());

        // Validate the MedCheckDet in the database
        List<MedCheckDet> medCheckDetList = medCheckDetRepository.findAll();
        assertThat(medCheckDetList).hasSize(databaseSizeBeforeCreate + 1);
        MedCheckDet testMedCheckDet = medCheckDetList.get(medCheckDetList.size() - 1);
        assertThat(testMedCheckDet.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMedCheckDet.getResult()).isEqualTo(DEFAULT_RESULT);

        // Validate the MedCheckDet in Elasticsearch
        verify(mockMedCheckDetSearchRepository, times(1)).save(testMedCheckDet);
    }

    @Test
    @Transactional
    public void createMedCheckDetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medCheckDetRepository.findAll().size();

        // Create the MedCheckDet with an existing ID
        medCheckDet.setId(1L);
        MedCheckDetDTO medCheckDetDTO = medCheckDetMapper.toDto(medCheckDet);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedCheckDetMockMvc.perform(post("/api/med-check-dets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheckDet in the database
        List<MedCheckDet> medCheckDetList = medCheckDetRepository.findAll();
        assertThat(medCheckDetList).hasSize(databaseSizeBeforeCreate);

        // Validate the MedCheckDet in Elasticsearch
        verify(mockMedCheckDetSearchRepository, times(0)).save(medCheckDet);
    }

    @Test
    @Transactional
    public void getAllMedCheckDets() throws Exception {
        // Initialize the database
        medCheckDetRepository.saveAndFlush(medCheckDet);

        // Get all the medCheckDetList
        restMedCheckDetMockMvc.perform(get("/api/med-check-dets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheckDet.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT.toString())));
    }
    
    @Test
    @Transactional
    public void getMedCheckDet() throws Exception {
        // Initialize the database
        medCheckDetRepository.saveAndFlush(medCheckDet);

        // Get the medCheckDet
        restMedCheckDetMockMvc.perform(get("/api/med-check-dets/{id}", medCheckDet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medCheckDet.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMedCheckDet() throws Exception {
        // Get the medCheckDet
        restMedCheckDetMockMvc.perform(get("/api/med-check-dets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedCheckDet() throws Exception {
        // Initialize the database
        medCheckDetRepository.saveAndFlush(medCheckDet);

        int databaseSizeBeforeUpdate = medCheckDetRepository.findAll().size();

        // Update the medCheckDet
        MedCheckDet updatedMedCheckDet = medCheckDetRepository.findById(medCheckDet.getId()).get();
        // Disconnect from session so that the updates on updatedMedCheckDet are not directly saved in db
        em.detach(updatedMedCheckDet);
        updatedMedCheckDet
            .code(UPDATED_CODE)
            .result(UPDATED_RESULT);
        MedCheckDetDTO medCheckDetDTO = medCheckDetMapper.toDto(updatedMedCheckDet);

        restMedCheckDetMockMvc.perform(put("/api/med-check-dets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDetDTO)))
            .andExpect(status().isOk());

        // Validate the MedCheckDet in the database
        List<MedCheckDet> medCheckDetList = medCheckDetRepository.findAll();
        assertThat(medCheckDetList).hasSize(databaseSizeBeforeUpdate);
        MedCheckDet testMedCheckDet = medCheckDetList.get(medCheckDetList.size() - 1);
        assertThat(testMedCheckDet.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMedCheckDet.getResult()).isEqualTo(UPDATED_RESULT);

        // Validate the MedCheckDet in Elasticsearch
        verify(mockMedCheckDetSearchRepository, times(1)).save(testMedCheckDet);
    }

    @Test
    @Transactional
    public void updateNonExistingMedCheckDet() throws Exception {
        int databaseSizeBeforeUpdate = medCheckDetRepository.findAll().size();

        // Create the MedCheckDet
        MedCheckDetDTO medCheckDetDTO = medCheckDetMapper.toDto(medCheckDet);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedCheckDetMockMvc.perform(put("/api/med-check-dets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDetDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheckDet in the database
        List<MedCheckDet> medCheckDetList = medCheckDetRepository.findAll();
        assertThat(medCheckDetList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MedCheckDet in Elasticsearch
        verify(mockMedCheckDetSearchRepository, times(0)).save(medCheckDet);
    }

    @Test
    @Transactional
    public void deleteMedCheckDet() throws Exception {
        // Initialize the database
        medCheckDetRepository.saveAndFlush(medCheckDet);

        int databaseSizeBeforeDelete = medCheckDetRepository.findAll().size();

        // Get the medCheckDet
        restMedCheckDetMockMvc.perform(delete("/api/med-check-dets/{id}", medCheckDet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedCheckDet> medCheckDetList = medCheckDetRepository.findAll();
        assertThat(medCheckDetList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MedCheckDet in Elasticsearch
        verify(mockMedCheckDetSearchRepository, times(1)).deleteById(medCheckDet.getId());
    }

    @Test
    @Transactional
    public void searchMedCheckDet() throws Exception {
        // Initialize the database
        medCheckDetRepository.saveAndFlush(medCheckDet);
        when(mockMedCheckDetSearchRepository.search(queryStringQuery("id:" + medCheckDet.getId())))
            .thenReturn(Collections.singletonList(medCheckDet));
        // Search the medCheckDet
        restMedCheckDetMockMvc.perform(get("/api/_search/med-check-dets?query=id:" + medCheckDet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheckDet.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheckDet.class);
        MedCheckDet medCheckDet1 = new MedCheckDet();
        medCheckDet1.setId(1L);
        MedCheckDet medCheckDet2 = new MedCheckDet();
        medCheckDet2.setId(medCheckDet1.getId());
        assertThat(medCheckDet1).isEqualTo(medCheckDet2);
        medCheckDet2.setId(2L);
        assertThat(medCheckDet1).isNotEqualTo(medCheckDet2);
        medCheckDet1.setId(null);
        assertThat(medCheckDet1).isNotEqualTo(medCheckDet2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheckDetDTO.class);
        MedCheckDetDTO medCheckDetDTO1 = new MedCheckDetDTO();
        medCheckDetDTO1.setId(1L);
        MedCheckDetDTO medCheckDetDTO2 = new MedCheckDetDTO();
        assertThat(medCheckDetDTO1).isNotEqualTo(medCheckDetDTO2);
        medCheckDetDTO2.setId(medCheckDetDTO1.getId());
        assertThat(medCheckDetDTO1).isEqualTo(medCheckDetDTO2);
        medCheckDetDTO2.setId(2L);
        assertThat(medCheckDetDTO1).isNotEqualTo(medCheckDetDTO2);
        medCheckDetDTO1.setId(null);
        assertThat(medCheckDetDTO1).isNotEqualTo(medCheckDetDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(medCheckDetMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(medCheckDetMapper.fromId(null)).isNull();
    }
}
