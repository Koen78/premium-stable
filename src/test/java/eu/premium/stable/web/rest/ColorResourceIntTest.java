package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Color;
import eu.premium.stable.repository.ColorRepository;
import eu.premium.stable.repository.search.ColorSearchRepository;
import eu.premium.stable.service.ColorService;
import eu.premium.stable.service.dto.ColorDTO;
import eu.premium.stable.service.mapper.ColorMapper;
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
 * Test class for the ColorResource REST controller.
 *
 * @see ColorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class ColorResourceIntTest {

    private static final String DEFAULT_COLOR = "AAAAAAAAAA";
    private static final String UPDATED_COLOR = "BBBBBBBBBB";

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private ColorMapper colorMapper;

    @Autowired
    private ColorService colorService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.ColorSearchRepositoryMockConfiguration
     */
    @Autowired
    private ColorSearchRepository mockColorSearchRepository;

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

    private MockMvc restColorMockMvc;

    private Color color;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColorResource colorResource = new ColorResource(colorService);
        this.restColorMockMvc = MockMvcBuilders.standaloneSetup(colorResource)
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
    public static Color createEntity(EntityManager em) {
        Color color = new Color()
            .color(DEFAULT_COLOR);
        return color;
    }

    @Before
    public void initTest() {
        color = createEntity(em);
    }

    @Test
    @Transactional
    public void createColor() throws Exception {
        int databaseSizeBeforeCreate = colorRepository.findAll().size();

        // Create the Color
        ColorDTO colorDTO = colorMapper.toDto(color);
        restColorMockMvc.perform(post("/api/colors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorDTO)))
            .andExpect(status().isCreated());

        // Validate the Color in the database
        List<Color> colorList = colorRepository.findAll();
        assertThat(colorList).hasSize(databaseSizeBeforeCreate + 1);
        Color testColor = colorList.get(colorList.size() - 1);
        assertThat(testColor.getColor()).isEqualTo(DEFAULT_COLOR);

        // Validate the Color in Elasticsearch
        verify(mockColorSearchRepository, times(1)).save(testColor);
    }

    @Test
    @Transactional
    public void createColorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colorRepository.findAll().size();

        // Create the Color with an existing ID
        color.setId(1L);
        ColorDTO colorDTO = colorMapper.toDto(color);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColorMockMvc.perform(post("/api/colors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Color in the database
        List<Color> colorList = colorRepository.findAll();
        assertThat(colorList).hasSize(databaseSizeBeforeCreate);

        // Validate the Color in Elasticsearch
        verify(mockColorSearchRepository, times(0)).save(color);
    }

    @Test
    @Transactional
    public void getAllColors() throws Exception {
        // Initialize the database
        colorRepository.saveAndFlush(color);

        // Get all the colorList
        restColorMockMvc.perform(get("/api/colors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(color.getId().intValue())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR.toString())));
    }
    
    @Test
    @Transactional
    public void getColor() throws Exception {
        // Initialize the database
        colorRepository.saveAndFlush(color);

        // Get the color
        restColorMockMvc.perform(get("/api/colors/{id}", color.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(color.getId().intValue()))
            .andExpect(jsonPath("$.color").value(DEFAULT_COLOR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingColor() throws Exception {
        // Get the color
        restColorMockMvc.perform(get("/api/colors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColor() throws Exception {
        // Initialize the database
        colorRepository.saveAndFlush(color);

        int databaseSizeBeforeUpdate = colorRepository.findAll().size();

        // Update the color
        Color updatedColor = colorRepository.findById(color.getId()).get();
        // Disconnect from session so that the updates on updatedColor are not directly saved in db
        em.detach(updatedColor);
        updatedColor
            .color(UPDATED_COLOR);
        ColorDTO colorDTO = colorMapper.toDto(updatedColor);

        restColorMockMvc.perform(put("/api/colors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorDTO)))
            .andExpect(status().isOk());

        // Validate the Color in the database
        List<Color> colorList = colorRepository.findAll();
        assertThat(colorList).hasSize(databaseSizeBeforeUpdate);
        Color testColor = colorList.get(colorList.size() - 1);
        assertThat(testColor.getColor()).isEqualTo(UPDATED_COLOR);

        // Validate the Color in Elasticsearch
        verify(mockColorSearchRepository, times(1)).save(testColor);
    }

    @Test
    @Transactional
    public void updateNonExistingColor() throws Exception {
        int databaseSizeBeforeUpdate = colorRepository.findAll().size();

        // Create the Color
        ColorDTO colorDTO = colorMapper.toDto(color);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restColorMockMvc.perform(put("/api/colors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Color in the database
        List<Color> colorList = colorRepository.findAll();
        assertThat(colorList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Color in Elasticsearch
        verify(mockColorSearchRepository, times(0)).save(color);
    }

    @Test
    @Transactional
    public void deleteColor() throws Exception {
        // Initialize the database
        colorRepository.saveAndFlush(color);

        int databaseSizeBeforeDelete = colorRepository.findAll().size();

        // Get the color
        restColorMockMvc.perform(delete("/api/colors/{id}", color.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Color> colorList = colorRepository.findAll();
        assertThat(colorList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Color in Elasticsearch
        verify(mockColorSearchRepository, times(1)).deleteById(color.getId());
    }

    @Test
    @Transactional
    public void searchColor() throws Exception {
        // Initialize the database
        colorRepository.saveAndFlush(color);
        when(mockColorSearchRepository.search(queryStringQuery("id:" + color.getId())))
            .thenReturn(Collections.singletonList(color));
        // Search the color
        restColorMockMvc.perform(get("/api/_search/colors?query=id:" + color.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(color.getId().intValue())))
            .andExpect(jsonPath("$.[*].color").value(hasItem(DEFAULT_COLOR)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Color.class);
        Color color1 = new Color();
        color1.setId(1L);
        Color color2 = new Color();
        color2.setId(color1.getId());
        assertThat(color1).isEqualTo(color2);
        color2.setId(2L);
        assertThat(color1).isNotEqualTo(color2);
        color1.setId(null);
        assertThat(color1).isNotEqualTo(color2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ColorDTO.class);
        ColorDTO colorDTO1 = new ColorDTO();
        colorDTO1.setId(1L);
        ColorDTO colorDTO2 = new ColorDTO();
        assertThat(colorDTO1).isNotEqualTo(colorDTO2);
        colorDTO2.setId(colorDTO1.getId());
        assertThat(colorDTO1).isEqualTo(colorDTO2);
        colorDTO2.setId(2L);
        assertThat(colorDTO1).isNotEqualTo(colorDTO2);
        colorDTO1.setId(null);
        assertThat(colorDTO1).isNotEqualTo(colorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(colorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(colorMapper.fromId(null)).isNull();
    }
}
