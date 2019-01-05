package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Gender;
import eu.premium.stable.repository.GenderRepository;
import eu.premium.stable.repository.search.GenderSearchRepository;
import eu.premium.stable.service.GenderService;
import eu.premium.stable.service.dto.GenderDTO;
import eu.premium.stable.service.mapper.GenderMapper;
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
 * Test class for the GenderResource REST controller.
 *
 * @see GenderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class GenderResourceIntTest {

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private GenderMapper genderMapper;

    @Autowired
    private GenderService genderService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.GenderSearchRepositoryMockConfiguration
     */
    @Autowired
    private GenderSearchRepository mockGenderSearchRepository;

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

    private MockMvc restGenderMockMvc;

    private Gender gender;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GenderResource genderResource = new GenderResource(genderService);
        this.restGenderMockMvc = MockMvcBuilders.standaloneSetup(genderResource)
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
    public static Gender createEntity(EntityManager em) {
        Gender gender = new Gender()
            .gender(DEFAULT_GENDER);
        return gender;
    }

    @Before
    public void initTest() {
        gender = createEntity(em);
    }

    @Test
    @Transactional
    public void createGender() throws Exception {
        int databaseSizeBeforeCreate = genderRepository.findAll().size();

        // Create the Gender
        GenderDTO genderDTO = genderMapper.toDto(gender);
        restGenderMockMvc.perform(post("/api/genders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genderDTO)))
            .andExpect(status().isCreated());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeCreate + 1);
        Gender testGender = genderList.get(genderList.size() - 1);
        assertThat(testGender.getGender()).isEqualTo(DEFAULT_GENDER);

        // Validate the Gender in Elasticsearch
        verify(mockGenderSearchRepository, times(1)).save(testGender);
    }

    @Test
    @Transactional
    public void createGenderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genderRepository.findAll().size();

        // Create the Gender with an existing ID
        gender.setId(1L);
        GenderDTO genderDTO = genderMapper.toDto(gender);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenderMockMvc.perform(post("/api/genders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeCreate);

        // Validate the Gender in Elasticsearch
        verify(mockGenderSearchRepository, times(0)).save(gender);
    }

    @Test
    @Transactional
    public void getAllGenders() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        // Get all the genderList
        restGenderMockMvc.perform(get("/api/genders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gender.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())));
    }
    
    @Test
    @Transactional
    public void getGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        // Get the gender
        restGenderMockMvc.perform(get("/api/genders/{id}", gender.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gender.getId().intValue()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGender() throws Exception {
        // Get the gender
        restGenderMockMvc.perform(get("/api/genders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        int databaseSizeBeforeUpdate = genderRepository.findAll().size();

        // Update the gender
        Gender updatedGender = genderRepository.findById(gender.getId()).get();
        // Disconnect from session so that the updates on updatedGender are not directly saved in db
        em.detach(updatedGender);
        updatedGender
            .gender(UPDATED_GENDER);
        GenderDTO genderDTO = genderMapper.toDto(updatedGender);

        restGenderMockMvc.perform(put("/api/genders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genderDTO)))
            .andExpect(status().isOk());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeUpdate);
        Gender testGender = genderList.get(genderList.size() - 1);
        assertThat(testGender.getGender()).isEqualTo(UPDATED_GENDER);

        // Validate the Gender in Elasticsearch
        verify(mockGenderSearchRepository, times(1)).save(testGender);
    }

    @Test
    @Transactional
    public void updateNonExistingGender() throws Exception {
        int databaseSizeBeforeUpdate = genderRepository.findAll().size();

        // Create the Gender
        GenderDTO genderDTO = genderMapper.toDto(gender);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenderMockMvc.perform(put("/api/genders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(genderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Gender in Elasticsearch
        verify(mockGenderSearchRepository, times(0)).save(gender);
    }

    @Test
    @Transactional
    public void deleteGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        int databaseSizeBeforeDelete = genderRepository.findAll().size();

        // Get the gender
        restGenderMockMvc.perform(delete("/api/genders/{id}", gender.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Gender in Elasticsearch
        verify(mockGenderSearchRepository, times(1)).deleteById(gender.getId());
    }

    @Test
    @Transactional
    public void searchGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);
        when(mockGenderSearchRepository.search(queryStringQuery("id:" + gender.getId())))
            .thenReturn(Collections.singletonList(gender));
        // Search the gender
        restGenderMockMvc.perform(get("/api/_search/genders?query=id:" + gender.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gender.getId().intValue())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gender.class);
        Gender gender1 = new Gender();
        gender1.setId(1L);
        Gender gender2 = new Gender();
        gender2.setId(gender1.getId());
        assertThat(gender1).isEqualTo(gender2);
        gender2.setId(2L);
        assertThat(gender1).isNotEqualTo(gender2);
        gender1.setId(null);
        assertThat(gender1).isNotEqualTo(gender2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GenderDTO.class);
        GenderDTO genderDTO1 = new GenderDTO();
        genderDTO1.setId(1L);
        GenderDTO genderDTO2 = new GenderDTO();
        assertThat(genderDTO1).isNotEqualTo(genderDTO2);
        genderDTO2.setId(genderDTO1.getId());
        assertThat(genderDTO1).isEqualTo(genderDTO2);
        genderDTO2.setId(2L);
        assertThat(genderDTO1).isNotEqualTo(genderDTO2);
        genderDTO1.setId(null);
        assertThat(genderDTO1).isNotEqualTo(genderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(genderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(genderMapper.fromId(null)).isNull();
    }
}
