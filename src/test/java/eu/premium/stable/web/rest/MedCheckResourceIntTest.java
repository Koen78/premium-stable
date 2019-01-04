package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.MedCheck;
import eu.premium.stable.repository.MedCheckRepository;
import eu.premium.stable.repository.search.MedCheckSearchRepository;
import eu.premium.stable.service.MedCheckService;
import eu.premium.stable.service.dto.MedCheckDTO;
import eu.premium.stable.service.mapper.MedCheckMapper;
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
 * Test class for the MedCheckResource REST controller.
 *
 * @see MedCheckResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class MedCheckResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_SHORT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_RESULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_RESULT_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PDF = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PDF = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_PDF_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PDF_CONTENT_TYPE = "image/png";

    @Autowired
    private MedCheckRepository medCheckRepository;

    @Autowired
    private MedCheckMapper medCheckMapper;

    @Autowired
    private MedCheckService medCheckService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.MedCheckSearchRepositoryMockConfiguration
     */
    @Autowired
    private MedCheckSearchRepository mockMedCheckSearchRepository;

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

    private MockMvc restMedCheckMockMvc;

    private MedCheck medCheck;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedCheckResource medCheckResource = new MedCheckResource(medCheckService);
        this.restMedCheckMockMvc = MockMvcBuilders.standaloneSetup(medCheckResource)
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
    public static MedCheck createEntity(EntityManager em) {
        MedCheck medCheck = new MedCheck()
            .date(DEFAULT_DATE)
            .shortDescription(DEFAULT_SHORT_DESCRIPTION)
            .resultDescription(DEFAULT_RESULT_DESCRIPTION)
            .pdf(DEFAULT_PDF)
            .pdfContentType(DEFAULT_PDF_CONTENT_TYPE);
        return medCheck;
    }

    @Before
    public void initTest() {
        medCheck = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedCheck() throws Exception {
        int databaseSizeBeforeCreate = medCheckRepository.findAll().size();

        // Create the MedCheck
        MedCheckDTO medCheckDTO = medCheckMapper.toDto(medCheck);
        restMedCheckMockMvc.perform(post("/api/med-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDTO)))
            .andExpect(status().isCreated());

        // Validate the MedCheck in the database
        List<MedCheck> medCheckList = medCheckRepository.findAll();
        assertThat(medCheckList).hasSize(databaseSizeBeforeCreate + 1);
        MedCheck testMedCheck = medCheckList.get(medCheckList.size() - 1);
        assertThat(testMedCheck.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMedCheck.getShortDescription()).isEqualTo(DEFAULT_SHORT_DESCRIPTION);
        assertThat(testMedCheck.getResultDescription()).isEqualTo(DEFAULT_RESULT_DESCRIPTION);
        assertThat(testMedCheck.getPdf()).isEqualTo(DEFAULT_PDF);
        assertThat(testMedCheck.getPdfContentType()).isEqualTo(DEFAULT_PDF_CONTENT_TYPE);

        // Validate the MedCheck in Elasticsearch
        verify(mockMedCheckSearchRepository, times(1)).save(testMedCheck);
    }

    @Test
    @Transactional
    public void createMedCheckWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medCheckRepository.findAll().size();

        // Create the MedCheck with an existing ID
        medCheck.setId(1L);
        MedCheckDTO medCheckDTO = medCheckMapper.toDto(medCheck);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedCheckMockMvc.perform(post("/api/med-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheck in the database
        List<MedCheck> medCheckList = medCheckRepository.findAll();
        assertThat(medCheckList).hasSize(databaseSizeBeforeCreate);

        // Validate the MedCheck in Elasticsearch
        verify(mockMedCheckSearchRepository, times(0)).save(medCheck);
    }

    @Test
    @Transactional
    public void getAllMedChecks() throws Exception {
        // Initialize the database
        medCheckRepository.saveAndFlush(medCheck);

        // Get all the medCheckList
        restMedCheckMockMvc.perform(get("/api/med-checks?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheck.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].shortDescription").value(hasItem(DEFAULT_SHORT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].resultDescription").value(hasItem(DEFAULT_RESULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].pdfContentType").value(hasItem(DEFAULT_PDF_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pdf").value(hasItem(Base64Utils.encodeToString(DEFAULT_PDF))));
    }
    
    @Test
    @Transactional
    public void getMedCheck() throws Exception {
        // Initialize the database
        medCheckRepository.saveAndFlush(medCheck);

        // Get the medCheck
        restMedCheckMockMvc.perform(get("/api/med-checks/{id}", medCheck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(medCheck.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.shortDescription").value(DEFAULT_SHORT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.resultDescription").value(DEFAULT_RESULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.pdfContentType").value(DEFAULT_PDF_CONTENT_TYPE))
            .andExpect(jsonPath("$.pdf").value(Base64Utils.encodeToString(DEFAULT_PDF)));
    }

    @Test
    @Transactional
    public void getNonExistingMedCheck() throws Exception {
        // Get the medCheck
        restMedCheckMockMvc.perform(get("/api/med-checks/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedCheck() throws Exception {
        // Initialize the database
        medCheckRepository.saveAndFlush(medCheck);

        int databaseSizeBeforeUpdate = medCheckRepository.findAll().size();

        // Update the medCheck
        MedCheck updatedMedCheck = medCheckRepository.findById(medCheck.getId()).get();
        // Disconnect from session so that the updates on updatedMedCheck are not directly saved in db
        em.detach(updatedMedCheck);
        updatedMedCheck
            .date(UPDATED_DATE)
            .shortDescription(UPDATED_SHORT_DESCRIPTION)
            .resultDescription(UPDATED_RESULT_DESCRIPTION)
            .pdf(UPDATED_PDF)
            .pdfContentType(UPDATED_PDF_CONTENT_TYPE);
        MedCheckDTO medCheckDTO = medCheckMapper.toDto(updatedMedCheck);

        restMedCheckMockMvc.perform(put("/api/med-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDTO)))
            .andExpect(status().isOk());

        // Validate the MedCheck in the database
        List<MedCheck> medCheckList = medCheckRepository.findAll();
        assertThat(medCheckList).hasSize(databaseSizeBeforeUpdate);
        MedCheck testMedCheck = medCheckList.get(medCheckList.size() - 1);
        assertThat(testMedCheck.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMedCheck.getShortDescription()).isEqualTo(UPDATED_SHORT_DESCRIPTION);
        assertThat(testMedCheck.getResultDescription()).isEqualTo(UPDATED_RESULT_DESCRIPTION);
        assertThat(testMedCheck.getPdf()).isEqualTo(UPDATED_PDF);
        assertThat(testMedCheck.getPdfContentType()).isEqualTo(UPDATED_PDF_CONTENT_TYPE);

        // Validate the MedCheck in Elasticsearch
        verify(mockMedCheckSearchRepository, times(1)).save(testMedCheck);
    }

    @Test
    @Transactional
    public void updateNonExistingMedCheck() throws Exception {
        int databaseSizeBeforeUpdate = medCheckRepository.findAll().size();

        // Create the MedCheck
        MedCheckDTO medCheckDTO = medCheckMapper.toDto(medCheck);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedCheckMockMvc.perform(put("/api/med-checks")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(medCheckDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MedCheck in the database
        List<MedCheck> medCheckList = medCheckRepository.findAll();
        assertThat(medCheckList).hasSize(databaseSizeBeforeUpdate);

        // Validate the MedCheck in Elasticsearch
        verify(mockMedCheckSearchRepository, times(0)).save(medCheck);
    }

    @Test
    @Transactional
    public void deleteMedCheck() throws Exception {
        // Initialize the database
        medCheckRepository.saveAndFlush(medCheck);

        int databaseSizeBeforeDelete = medCheckRepository.findAll().size();

        // Get the medCheck
        restMedCheckMockMvc.perform(delete("/api/med-checks/{id}", medCheck.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MedCheck> medCheckList = medCheckRepository.findAll();
        assertThat(medCheckList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the MedCheck in Elasticsearch
        verify(mockMedCheckSearchRepository, times(1)).deleteById(medCheck.getId());
    }

    @Test
    @Transactional
    public void searchMedCheck() throws Exception {
        // Initialize the database
        medCheckRepository.saveAndFlush(medCheck);
        when(mockMedCheckSearchRepository.search(queryStringQuery("id:" + medCheck.getId())))
            .thenReturn(Collections.singletonList(medCheck));
        // Search the medCheck
        restMedCheckMockMvc.perform(get("/api/_search/med-checks?query=id:" + medCheck.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medCheck.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].shortDescription").value(hasItem(DEFAULT_SHORT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].resultDescription").value(hasItem(DEFAULT_RESULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].pdfContentType").value(hasItem(DEFAULT_PDF_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pdf").value(hasItem(Base64Utils.encodeToString(DEFAULT_PDF))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheck.class);
        MedCheck medCheck1 = new MedCheck();
        medCheck1.setId(1L);
        MedCheck medCheck2 = new MedCheck();
        medCheck2.setId(medCheck1.getId());
        assertThat(medCheck1).isEqualTo(medCheck2);
        medCheck2.setId(2L);
        assertThat(medCheck1).isNotEqualTo(medCheck2);
        medCheck1.setId(null);
        assertThat(medCheck1).isNotEqualTo(medCheck2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedCheckDTO.class);
        MedCheckDTO medCheckDTO1 = new MedCheckDTO();
        medCheckDTO1.setId(1L);
        MedCheckDTO medCheckDTO2 = new MedCheckDTO();
        assertThat(medCheckDTO1).isNotEqualTo(medCheckDTO2);
        medCheckDTO2.setId(medCheckDTO1.getId());
        assertThat(medCheckDTO1).isEqualTo(medCheckDTO2);
        medCheckDTO2.setId(2L);
        assertThat(medCheckDTO1).isNotEqualTo(medCheckDTO2);
        medCheckDTO1.setId(null);
        assertThat(medCheckDTO1).isNotEqualTo(medCheckDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(medCheckMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(medCheckMapper.fromId(null)).isNull();
    }
}
