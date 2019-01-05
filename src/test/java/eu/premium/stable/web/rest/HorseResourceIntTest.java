package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Horse;
import eu.premium.stable.repository.HorseRepository;
import eu.premium.stable.repository.search.HorseSearchRepository;
import eu.premium.stable.service.HorseService;
import eu.premium.stable.service.dto.HorseDTO;
import eu.premium.stable.service.mapper.HorseMapper;
import eu.premium.stable.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
 * Test class for the HorseResource REST controller.
 *
 * @see HorseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class HorseResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTHDAY = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTHDAY = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCENT_FATHER = "AAAAAAAAAA";
    private static final String UPDATED_DESCENT_FATHER = "BBBBBBBBBB";

    private static final String DEFAULT_DESCENT_MOTHER = "AAAAAAAAAA";
    private static final String UPDATED_DESCENT_MOTHER = "BBBBBBBBBB";

    private static final String DEFAULT_HEIGHT = "AAAAAAAAAA";
    private static final String UPDATED_HEIGHT = "BBBBBBBBBB";

    private static final String DEFAULT_COMMENT = "AAAAAAAAAA";
    private static final String UPDATED_COMMENT = "BBBBBBBBBB";

    @Autowired
    private HorseRepository horseRepository;

    @Autowired
    private HorseMapper horseMapper;

    @Autowired
    private HorseService horseService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.HorseSearchRepositoryMockConfiguration
     */
    @Autowired
    private HorseSearchRepository mockHorseSearchRepository;

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

    private MockMvc restHorseMockMvc;

    private Horse horse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HorseResource horseResource = new HorseResource(horseService);
        this.restHorseMockMvc = MockMvcBuilders.standaloneSetup(horseResource)
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
    public static Horse createEntity(EntityManager em) {
        Horse horse = new Horse()
            .name(DEFAULT_NAME)
            .birthday(DEFAULT_BIRTHDAY)
            .descentFather(DEFAULT_DESCENT_FATHER)
            .descentMother(DEFAULT_DESCENT_MOTHER)
            .height(DEFAULT_HEIGHT)
            .comment(DEFAULT_COMMENT);
        return horse;
    }

    @Before
    public void initTest() {
        horse = createEntity(em);
    }

    @Test
    @Transactional
    public void createHorse() throws Exception {
        int databaseSizeBeforeCreate = horseRepository.findAll().size();

        // Create the Horse
        HorseDTO horseDTO = horseMapper.toDto(horse);
        restHorseMockMvc.perform(post("/api/horses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horseDTO)))
            .andExpect(status().isCreated());

        // Validate the Horse in the database
        List<Horse> horseList = horseRepository.findAll();
        assertThat(horseList).hasSize(databaseSizeBeforeCreate + 1);
        Horse testHorse = horseList.get(horseList.size() - 1);
        assertThat(testHorse.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testHorse.getBirthday()).isEqualTo(DEFAULT_BIRTHDAY);
        assertThat(testHorse.getDescentFather()).isEqualTo(DEFAULT_DESCENT_FATHER);
        assertThat(testHorse.getDescentMother()).isEqualTo(DEFAULT_DESCENT_MOTHER);
        assertThat(testHorse.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testHorse.getComment()).isEqualTo(DEFAULT_COMMENT);

        // Validate the Horse in Elasticsearch
        verify(mockHorseSearchRepository, times(1)).save(testHorse);
    }

    @Test
    @Transactional
    public void createHorseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horseRepository.findAll().size();

        // Create the Horse with an existing ID
        horse.setId(1L);
        HorseDTO horseDTO = horseMapper.toDto(horse);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorseMockMvc.perform(post("/api/horses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Horse in the database
        List<Horse> horseList = horseRepository.findAll();
        assertThat(horseList).hasSize(databaseSizeBeforeCreate);

        // Validate the Horse in Elasticsearch
        verify(mockHorseSearchRepository, times(0)).save(horse);
    }

    @Test
    @Transactional
    public void getAllHorses() throws Exception {
        // Initialize the database
        horseRepository.saveAndFlush(horse);

        // Get all the horseList
        restHorseMockMvc.perform(get("/api/horses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horse.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].descentFather").value(hasItem(DEFAULT_DESCENT_FATHER.toString())))
            .andExpect(jsonPath("$.[*].descentMother").value(hasItem(DEFAULT_DESCENT_MOTHER.toString())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.toString())))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT.toString())));
    }
    
    @Test
    @Transactional
    public void getHorse() throws Exception {
        // Initialize the database
        horseRepository.saveAndFlush(horse);

        // Get the horse
        restHorseMockMvc.perform(get("/api/horses/{id}", horse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horse.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.birthday").value(DEFAULT_BIRTHDAY.toString()))
            .andExpect(jsonPath("$.descentFather").value(DEFAULT_DESCENT_FATHER.toString()))
            .andExpect(jsonPath("$.descentMother").value(DEFAULT_DESCENT_MOTHER.toString()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.toString()))
            .andExpect(jsonPath("$.comment").value(DEFAULT_COMMENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHorse() throws Exception {
        // Get the horse
        restHorseMockMvc.perform(get("/api/horses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHorse() throws Exception {
        // Initialize the database
        horseRepository.saveAndFlush(horse);

        int databaseSizeBeforeUpdate = horseRepository.findAll().size();

        // Update the horse
        Horse updatedHorse = horseRepository.findById(horse.getId()).get();
        // Disconnect from session so that the updates on updatedHorse are not directly saved in db
        em.detach(updatedHorse);
        updatedHorse
            .name(UPDATED_NAME)
            .birthday(UPDATED_BIRTHDAY)
            .descentFather(UPDATED_DESCENT_FATHER)
            .descentMother(UPDATED_DESCENT_MOTHER)
            .height(UPDATED_HEIGHT)
            .comment(UPDATED_COMMENT);
        HorseDTO horseDTO = horseMapper.toDto(updatedHorse);

        restHorseMockMvc.perform(put("/api/horses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horseDTO)))
            .andExpect(status().isOk());

        // Validate the Horse in the database
        List<Horse> horseList = horseRepository.findAll();
        assertThat(horseList).hasSize(databaseSizeBeforeUpdate);
        Horse testHorse = horseList.get(horseList.size() - 1);
        assertThat(testHorse.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testHorse.getBirthday()).isEqualTo(UPDATED_BIRTHDAY);
        assertThat(testHorse.getDescentFather()).isEqualTo(UPDATED_DESCENT_FATHER);
        assertThat(testHorse.getDescentMother()).isEqualTo(UPDATED_DESCENT_MOTHER);
        assertThat(testHorse.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testHorse.getComment()).isEqualTo(UPDATED_COMMENT);

        // Validate the Horse in Elasticsearch
        verify(mockHorseSearchRepository, times(1)).save(testHorse);
    }

    @Test
    @Transactional
    public void updateNonExistingHorse() throws Exception {
        int databaseSizeBeforeUpdate = horseRepository.findAll().size();

        // Create the Horse
        HorseDTO horseDTO = horseMapper.toDto(horse);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorseMockMvc.perform(put("/api/horses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Horse in the database
        List<Horse> horseList = horseRepository.findAll();
        assertThat(horseList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Horse in Elasticsearch
        verify(mockHorseSearchRepository, times(0)).save(horse);
    }

    @Test
    @Transactional
    public void deleteHorse() throws Exception {
        // Initialize the database
        horseRepository.saveAndFlush(horse);

        int databaseSizeBeforeDelete = horseRepository.findAll().size();

        // Get the horse
        restHorseMockMvc.perform(delete("/api/horses/{id}", horse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Horse> horseList = horseRepository.findAll();
        assertThat(horseList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Horse in Elasticsearch
        verify(mockHorseSearchRepository, times(1)).deleteById(horse.getId());
    }

    @Test
    @Transactional
    public void searchHorse() throws Exception {
        // Initialize the database
        horseRepository.saveAndFlush(horse);
        when(mockHorseSearchRepository.search(queryStringQuery("id:" + horse.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(horse), PageRequest.of(0, 1), 1));
        // Search the horse
        restHorseMockMvc.perform(get("/api/_search/horses?query=id:" + horse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horse.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].birthday").value(hasItem(DEFAULT_BIRTHDAY.toString())))
            .andExpect(jsonPath("$.[*].descentFather").value(hasItem(DEFAULT_DESCENT_FATHER)))
            .andExpect(jsonPath("$.[*].descentMother").value(hasItem(DEFAULT_DESCENT_MOTHER)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].comment").value(hasItem(DEFAULT_COMMENT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Horse.class);
        Horse horse1 = new Horse();
        horse1.setId(1L);
        Horse horse2 = new Horse();
        horse2.setId(horse1.getId());
        assertThat(horse1).isEqualTo(horse2);
        horse2.setId(2L);
        assertThat(horse1).isNotEqualTo(horse2);
        horse1.setId(null);
        assertThat(horse1).isNotEqualTo(horse2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(HorseDTO.class);
        HorseDTO horseDTO1 = new HorseDTO();
        horseDTO1.setId(1L);
        HorseDTO horseDTO2 = new HorseDTO();
        assertThat(horseDTO1).isNotEqualTo(horseDTO2);
        horseDTO2.setId(horseDTO1.getId());
        assertThat(horseDTO1).isEqualTo(horseDTO2);
        horseDTO2.setId(2L);
        assertThat(horseDTO1).isNotEqualTo(horseDTO2);
        horseDTO1.setId(null);
        assertThat(horseDTO1).isNotEqualTo(horseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(horseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(horseMapper.fromId(null)).isNull();
    }
}
