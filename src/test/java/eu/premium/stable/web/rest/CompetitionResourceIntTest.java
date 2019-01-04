package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Competition;
import eu.premium.stable.repository.CompetitionRepository;
import eu.premium.stable.repository.search.CompetitionSearchRepository;
import eu.premium.stable.service.CompetitionService;
import eu.premium.stable.service.dto.CompetitionDTO;
import eu.premium.stable.service.mapper.CompetitionMapper;
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
 * Test class for the CompetitionResource REST controller.
 *
 * @see CompetitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class CompetitionResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_RESULT = "AAAAAAAAAA";
    private static final String UPDATED_RESULT = "BBBBBBBBBB";

    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private CompetitionMapper competitionMapper;

    @Autowired
    private CompetitionService competitionService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.CompetitionSearchRepositoryMockConfiguration
     */
    @Autowired
    private CompetitionSearchRepository mockCompetitionSearchRepository;

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

    private MockMvc restCompetitionMockMvc;

    private Competition competition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompetitionResource competitionResource = new CompetitionResource(competitionService);
        this.restCompetitionMockMvc = MockMvcBuilders.standaloneSetup(competitionResource)
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
    public static Competition createEntity(EntityManager em) {
        Competition competition = new Competition()
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION)
            .result(DEFAULT_RESULT);
        return competition;
    }

    @Before
    public void initTest() {
        competition = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompetition() throws Exception {
        int databaseSizeBeforeCreate = competitionRepository.findAll().size();

        // Create the Competition
        CompetitionDTO competitionDTO = competitionMapper.toDto(competition);
        restCompetitionMockMvc.perform(post("/api/competitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competitionDTO)))
            .andExpect(status().isCreated());

        // Validate the Competition in the database
        List<Competition> competitionList = competitionRepository.findAll();
        assertThat(competitionList).hasSize(databaseSizeBeforeCreate + 1);
        Competition testCompetition = competitionList.get(competitionList.size() - 1);
        assertThat(testCompetition.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCompetition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCompetition.getResult()).isEqualTo(DEFAULT_RESULT);

        // Validate the Competition in Elasticsearch
        verify(mockCompetitionSearchRepository, times(1)).save(testCompetition);
    }

    @Test
    @Transactional
    public void createCompetitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = competitionRepository.findAll().size();

        // Create the Competition with an existing ID
        competition.setId(1L);
        CompetitionDTO competitionDTO = competitionMapper.toDto(competition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompetitionMockMvc.perform(post("/api/competitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Competition in the database
        List<Competition> competitionList = competitionRepository.findAll();
        assertThat(competitionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Competition in Elasticsearch
        verify(mockCompetitionSearchRepository, times(0)).save(competition);
    }

    @Test
    @Transactional
    public void getAllCompetitions() throws Exception {
        // Initialize the database
        competitionRepository.saveAndFlush(competition);

        // Get all the competitionList
        restCompetitionMockMvc.perform(get("/api/competitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(competition.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT.toString())));
    }
    
    @Test
    @Transactional
    public void getCompetition() throws Exception {
        // Initialize the database
        competitionRepository.saveAndFlush(competition);

        // Get the competition
        restCompetitionMockMvc.perform(get("/api/competitions/{id}", competition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(competition.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompetition() throws Exception {
        // Get the competition
        restCompetitionMockMvc.perform(get("/api/competitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompetition() throws Exception {
        // Initialize the database
        competitionRepository.saveAndFlush(competition);

        int databaseSizeBeforeUpdate = competitionRepository.findAll().size();

        // Update the competition
        Competition updatedCompetition = competitionRepository.findById(competition.getId()).get();
        // Disconnect from session so that the updates on updatedCompetition are not directly saved in db
        em.detach(updatedCompetition);
        updatedCompetition
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .result(UPDATED_RESULT);
        CompetitionDTO competitionDTO = competitionMapper.toDto(updatedCompetition);

        restCompetitionMockMvc.perform(put("/api/competitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competitionDTO)))
            .andExpect(status().isOk());

        // Validate the Competition in the database
        List<Competition> competitionList = competitionRepository.findAll();
        assertThat(competitionList).hasSize(databaseSizeBeforeUpdate);
        Competition testCompetition = competitionList.get(competitionList.size() - 1);
        assertThat(testCompetition.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCompetition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCompetition.getResult()).isEqualTo(UPDATED_RESULT);

        // Validate the Competition in Elasticsearch
        verify(mockCompetitionSearchRepository, times(1)).save(testCompetition);
    }

    @Test
    @Transactional
    public void updateNonExistingCompetition() throws Exception {
        int databaseSizeBeforeUpdate = competitionRepository.findAll().size();

        // Create the Competition
        CompetitionDTO competitionDTO = competitionMapper.toDto(competition);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompetitionMockMvc.perform(put("/api/competitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(competitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Competition in the database
        List<Competition> competitionList = competitionRepository.findAll();
        assertThat(competitionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Competition in Elasticsearch
        verify(mockCompetitionSearchRepository, times(0)).save(competition);
    }

    @Test
    @Transactional
    public void deleteCompetition() throws Exception {
        // Initialize the database
        competitionRepository.saveAndFlush(competition);

        int databaseSizeBeforeDelete = competitionRepository.findAll().size();

        // Get the competition
        restCompetitionMockMvc.perform(delete("/api/competitions/{id}", competition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Competition> competitionList = competitionRepository.findAll();
        assertThat(competitionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Competition in Elasticsearch
        verify(mockCompetitionSearchRepository, times(1)).deleteById(competition.getId());
    }

    @Test
    @Transactional
    public void searchCompetition() throws Exception {
        // Initialize the database
        competitionRepository.saveAndFlush(competition);
        when(mockCompetitionSearchRepository.search(queryStringQuery("id:" + competition.getId())))
            .thenReturn(Collections.singletonList(competition));
        // Search the competition
        restCompetitionMockMvc.perform(get("/api/_search/competitions?query=id:" + competition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(competition.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Competition.class);
        Competition competition1 = new Competition();
        competition1.setId(1L);
        Competition competition2 = new Competition();
        competition2.setId(competition1.getId());
        assertThat(competition1).isEqualTo(competition2);
        competition2.setId(2L);
        assertThat(competition1).isNotEqualTo(competition2);
        competition1.setId(null);
        assertThat(competition1).isNotEqualTo(competition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompetitionDTO.class);
        CompetitionDTO competitionDTO1 = new CompetitionDTO();
        competitionDTO1.setId(1L);
        CompetitionDTO competitionDTO2 = new CompetitionDTO();
        assertThat(competitionDTO1).isNotEqualTo(competitionDTO2);
        competitionDTO2.setId(competitionDTO1.getId());
        assertThat(competitionDTO1).isEqualTo(competitionDTO2);
        competitionDTO2.setId(2L);
        assertThat(competitionDTO1).isNotEqualTo(competitionDTO2);
        competitionDTO1.setId(null);
        assertThat(competitionDTO1).isNotEqualTo(competitionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(competitionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(competitionMapper.fromId(null)).isNull();
    }
}
