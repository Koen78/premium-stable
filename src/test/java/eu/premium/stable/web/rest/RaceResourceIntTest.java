package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Race;
import eu.premium.stable.repository.RaceRepository;
import eu.premium.stable.repository.search.RaceSearchRepository;
import eu.premium.stable.service.RaceService;
import eu.premium.stable.service.dto.RaceDTO;
import eu.premium.stable.service.mapper.RaceMapper;
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
 * Test class for the RaceResource REST controller.
 *
 * @see RaceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class RaceResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private RaceRepository raceRepository;

    @Autowired
    private RaceMapper raceMapper;

    @Autowired
    private RaceService raceService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.RaceSearchRepositoryMockConfiguration
     */
    @Autowired
    private RaceSearchRepository mockRaceSearchRepository;

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

    private MockMvc restRaceMockMvc;

    private Race race;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RaceResource raceResource = new RaceResource(raceService);
        this.restRaceMockMvc = MockMvcBuilders.standaloneSetup(raceResource)
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
    public static Race createEntity(EntityManager em) {
        Race race = new Race()
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE);
        return race;
    }

    @Before
    public void initTest() {
        race = createEntity(em);
    }

    @Test
    @Transactional
    public void createRace() throws Exception {
        int databaseSizeBeforeCreate = raceRepository.findAll().size();

        // Create the Race
        RaceDTO raceDTO = raceMapper.toDto(race);
        restRaceMockMvc.perform(post("/api/races")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceDTO)))
            .andExpect(status().isCreated());

        // Validate the Race in the database
        List<Race> raceList = raceRepository.findAll();
        assertThat(raceList).hasSize(databaseSizeBeforeCreate + 1);
        Race testRace = raceList.get(raceList.size() - 1);
        assertThat(testRace.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testRace.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the Race in Elasticsearch
        verify(mockRaceSearchRepository, times(1)).save(testRace);
    }

    @Test
    @Transactional
    public void createRaceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = raceRepository.findAll().size();

        // Create the Race with an existing ID
        race.setId(1L);
        RaceDTO raceDTO = raceMapper.toDto(race);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRaceMockMvc.perform(post("/api/races")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Race in the database
        List<Race> raceList = raceRepository.findAll();
        assertThat(raceList).hasSize(databaseSizeBeforeCreate);

        // Validate the Race in Elasticsearch
        verify(mockRaceSearchRepository, times(0)).save(race);
    }

    @Test
    @Transactional
    public void getAllRaces() throws Exception {
        // Initialize the database
        raceRepository.saveAndFlush(race);

        // Get all the raceList
        restRaceMockMvc.perform(get("/api/races?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(race.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getRace() throws Exception {
        // Initialize the database
        raceRepository.saveAndFlush(race);

        // Get the race
        restRaceMockMvc.perform(get("/api/races/{id}", race.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(race.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRace() throws Exception {
        // Get the race
        restRaceMockMvc.perform(get("/api/races/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRace() throws Exception {
        // Initialize the database
        raceRepository.saveAndFlush(race);

        int databaseSizeBeforeUpdate = raceRepository.findAll().size();

        // Update the race
        Race updatedRace = raceRepository.findById(race.getId()).get();
        // Disconnect from session so that the updates on updatedRace are not directly saved in db
        em.detach(updatedRace);
        updatedRace
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE);
        RaceDTO raceDTO = raceMapper.toDto(updatedRace);

        restRaceMockMvc.perform(put("/api/races")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceDTO)))
            .andExpect(status().isOk());

        // Validate the Race in the database
        List<Race> raceList = raceRepository.findAll();
        assertThat(raceList).hasSize(databaseSizeBeforeUpdate);
        Race testRace = raceList.get(raceList.size() - 1);
        assertThat(testRace.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testRace.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the Race in Elasticsearch
        verify(mockRaceSearchRepository, times(1)).save(testRace);
    }

    @Test
    @Transactional
    public void updateNonExistingRace() throws Exception {
        int databaseSizeBeforeUpdate = raceRepository.findAll().size();

        // Create the Race
        RaceDTO raceDTO = raceMapper.toDto(race);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRaceMockMvc.perform(put("/api/races")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(raceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Race in the database
        List<Race> raceList = raceRepository.findAll();
        assertThat(raceList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Race in Elasticsearch
        verify(mockRaceSearchRepository, times(0)).save(race);
    }

    @Test
    @Transactional
    public void deleteRace() throws Exception {
        // Initialize the database
        raceRepository.saveAndFlush(race);

        int databaseSizeBeforeDelete = raceRepository.findAll().size();

        // Get the race
        restRaceMockMvc.perform(delete("/api/races/{id}", race.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Race> raceList = raceRepository.findAll();
        assertThat(raceList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Race in Elasticsearch
        verify(mockRaceSearchRepository, times(1)).deleteById(race.getId());
    }

    @Test
    @Transactional
    public void searchRace() throws Exception {
        // Initialize the database
        raceRepository.saveAndFlush(race);
        when(mockRaceSearchRepository.search(queryStringQuery("id:" + race.getId())))
            .thenReturn(Collections.singletonList(race));
        // Search the race
        restRaceMockMvc.perform(get("/api/_search/races?query=id:" + race.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(race.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Race.class);
        Race race1 = new Race();
        race1.setId(1L);
        Race race2 = new Race();
        race2.setId(race1.getId());
        assertThat(race1).isEqualTo(race2);
        race2.setId(2L);
        assertThat(race1).isNotEqualTo(race2);
        race1.setId(null);
        assertThat(race1).isNotEqualTo(race2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RaceDTO.class);
        RaceDTO raceDTO1 = new RaceDTO();
        raceDTO1.setId(1L);
        RaceDTO raceDTO2 = new RaceDTO();
        assertThat(raceDTO1).isNotEqualTo(raceDTO2);
        raceDTO2.setId(raceDTO1.getId());
        assertThat(raceDTO1).isEqualTo(raceDTO2);
        raceDTO2.setId(2L);
        assertThat(raceDTO1).isNotEqualTo(raceDTO2);
        raceDTO1.setId(null);
        assertThat(raceDTO1).isNotEqualTo(raceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(raceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(raceMapper.fromId(null)).isNull();
    }
}
