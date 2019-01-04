package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.LanguageParam;
import eu.premium.stable.repository.LanguageParamRepository;
import eu.premium.stable.repository.search.LanguageParamSearchRepository;
import eu.premium.stable.service.LanguageParamService;
import eu.premium.stable.service.dto.LanguageParamDTO;
import eu.premium.stable.service.mapper.LanguageParamMapper;
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
 * Test class for the LanguageParamResource REST controller.
 *
 * @see LanguageParamResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class LanguageParamResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private LanguageParamRepository languageParamRepository;

    @Autowired
    private LanguageParamMapper languageParamMapper;

    @Autowired
    private LanguageParamService languageParamService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.LanguageParamSearchRepositoryMockConfiguration
     */
    @Autowired
    private LanguageParamSearchRepository mockLanguageParamSearchRepository;

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

    private MockMvc restLanguageParamMockMvc;

    private LanguageParam languageParam;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LanguageParamResource languageParamResource = new LanguageParamResource(languageParamService);
        this.restLanguageParamMockMvc = MockMvcBuilders.standaloneSetup(languageParamResource)
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
    public static LanguageParam createEntity(EntityManager em) {
        LanguageParam languageParam = new LanguageParam()
            .description(DEFAULT_DESCRIPTION);
        return languageParam;
    }

    @Before
    public void initTest() {
        languageParam = createEntity(em);
    }

    @Test
    @Transactional
    public void createLanguageParam() throws Exception {
        int databaseSizeBeforeCreate = languageParamRepository.findAll().size();

        // Create the LanguageParam
        LanguageParamDTO languageParamDTO = languageParamMapper.toDto(languageParam);
        restLanguageParamMockMvc.perform(post("/api/language-params")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(languageParamDTO)))
            .andExpect(status().isCreated());

        // Validate the LanguageParam in the database
        List<LanguageParam> languageParamList = languageParamRepository.findAll();
        assertThat(languageParamList).hasSize(databaseSizeBeforeCreate + 1);
        LanguageParam testLanguageParam = languageParamList.get(languageParamList.size() - 1);
        assertThat(testLanguageParam.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the LanguageParam in Elasticsearch
        verify(mockLanguageParamSearchRepository, times(1)).save(testLanguageParam);
    }

    @Test
    @Transactional
    public void createLanguageParamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = languageParamRepository.findAll().size();

        // Create the LanguageParam with an existing ID
        languageParam.setId(1L);
        LanguageParamDTO languageParamDTO = languageParamMapper.toDto(languageParam);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLanguageParamMockMvc.perform(post("/api/language-params")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(languageParamDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LanguageParam in the database
        List<LanguageParam> languageParamList = languageParamRepository.findAll();
        assertThat(languageParamList).hasSize(databaseSizeBeforeCreate);

        // Validate the LanguageParam in Elasticsearch
        verify(mockLanguageParamSearchRepository, times(0)).save(languageParam);
    }

    @Test
    @Transactional
    public void getAllLanguageParams() throws Exception {
        // Initialize the database
        languageParamRepository.saveAndFlush(languageParam);

        // Get all the languageParamList
        restLanguageParamMockMvc.perform(get("/api/language-params?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(languageParam.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getLanguageParam() throws Exception {
        // Initialize the database
        languageParamRepository.saveAndFlush(languageParam);

        // Get the languageParam
        restLanguageParamMockMvc.perform(get("/api/language-params/{id}", languageParam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(languageParam.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLanguageParam() throws Exception {
        // Get the languageParam
        restLanguageParamMockMvc.perform(get("/api/language-params/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLanguageParam() throws Exception {
        // Initialize the database
        languageParamRepository.saveAndFlush(languageParam);

        int databaseSizeBeforeUpdate = languageParamRepository.findAll().size();

        // Update the languageParam
        LanguageParam updatedLanguageParam = languageParamRepository.findById(languageParam.getId()).get();
        // Disconnect from session so that the updates on updatedLanguageParam are not directly saved in db
        em.detach(updatedLanguageParam);
        updatedLanguageParam
            .description(UPDATED_DESCRIPTION);
        LanguageParamDTO languageParamDTO = languageParamMapper.toDto(updatedLanguageParam);

        restLanguageParamMockMvc.perform(put("/api/language-params")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(languageParamDTO)))
            .andExpect(status().isOk());

        // Validate the LanguageParam in the database
        List<LanguageParam> languageParamList = languageParamRepository.findAll();
        assertThat(languageParamList).hasSize(databaseSizeBeforeUpdate);
        LanguageParam testLanguageParam = languageParamList.get(languageParamList.size() - 1);
        assertThat(testLanguageParam.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the LanguageParam in Elasticsearch
        verify(mockLanguageParamSearchRepository, times(1)).save(testLanguageParam);
    }

    @Test
    @Transactional
    public void updateNonExistingLanguageParam() throws Exception {
        int databaseSizeBeforeUpdate = languageParamRepository.findAll().size();

        // Create the LanguageParam
        LanguageParamDTO languageParamDTO = languageParamMapper.toDto(languageParam);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLanguageParamMockMvc.perform(put("/api/language-params")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(languageParamDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LanguageParam in the database
        List<LanguageParam> languageParamList = languageParamRepository.findAll();
        assertThat(languageParamList).hasSize(databaseSizeBeforeUpdate);

        // Validate the LanguageParam in Elasticsearch
        verify(mockLanguageParamSearchRepository, times(0)).save(languageParam);
    }

    @Test
    @Transactional
    public void deleteLanguageParam() throws Exception {
        // Initialize the database
        languageParamRepository.saveAndFlush(languageParam);

        int databaseSizeBeforeDelete = languageParamRepository.findAll().size();

        // Get the languageParam
        restLanguageParamMockMvc.perform(delete("/api/language-params/{id}", languageParam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<LanguageParam> languageParamList = languageParamRepository.findAll();
        assertThat(languageParamList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the LanguageParam in Elasticsearch
        verify(mockLanguageParamSearchRepository, times(1)).deleteById(languageParam.getId());
    }

    @Test
    @Transactional
    public void searchLanguageParam() throws Exception {
        // Initialize the database
        languageParamRepository.saveAndFlush(languageParam);
        when(mockLanguageParamSearchRepository.search(queryStringQuery("id:" + languageParam.getId())))
            .thenReturn(Collections.singletonList(languageParam));
        // Search the languageParam
        restLanguageParamMockMvc.perform(get("/api/_search/language-params?query=id:" + languageParam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(languageParam.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LanguageParam.class);
        LanguageParam languageParam1 = new LanguageParam();
        languageParam1.setId(1L);
        LanguageParam languageParam2 = new LanguageParam();
        languageParam2.setId(languageParam1.getId());
        assertThat(languageParam1).isEqualTo(languageParam2);
        languageParam2.setId(2L);
        assertThat(languageParam1).isNotEqualTo(languageParam2);
        languageParam1.setId(null);
        assertThat(languageParam1).isNotEqualTo(languageParam2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LanguageParamDTO.class);
        LanguageParamDTO languageParamDTO1 = new LanguageParamDTO();
        languageParamDTO1.setId(1L);
        LanguageParamDTO languageParamDTO2 = new LanguageParamDTO();
        assertThat(languageParamDTO1).isNotEqualTo(languageParamDTO2);
        languageParamDTO2.setId(languageParamDTO1.getId());
        assertThat(languageParamDTO1).isEqualTo(languageParamDTO2);
        languageParamDTO2.setId(2L);
        assertThat(languageParamDTO1).isNotEqualTo(languageParamDTO2);
        languageParamDTO1.setId(null);
        assertThat(languageParamDTO1).isNotEqualTo(languageParamDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(languageParamMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(languageParamMapper.fromId(null)).isNull();
    }
}
