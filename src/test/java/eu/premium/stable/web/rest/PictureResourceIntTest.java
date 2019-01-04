package eu.premium.stable.web.rest;

import eu.premium.stable.PremiumStableApp;

import eu.premium.stable.domain.Picture;
import eu.premium.stable.repository.PictureRepository;
import eu.premium.stable.repository.search.PictureSearchRepository;
import eu.premium.stable.service.PictureService;
import eu.premium.stable.service.dto.PictureDTO;
import eu.premium.stable.service.mapper.PictureMapper;
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
 * Test class for the PictureResource REST controller.
 *
 * @see PictureResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PremiumStableApp.class)
public class PictureResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private PictureRepository pictureRepository;

    @Autowired
    private PictureMapper pictureMapper;

    @Autowired
    private PictureService pictureService;

    /**
     * This repository is mocked in the eu.premium.stable.repository.search test package.
     *
     * @see eu.premium.stable.repository.search.PictureSearchRepositoryMockConfiguration
     */
    @Autowired
    private PictureSearchRepository mockPictureSearchRepository;

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

    private MockMvc restPictureMockMvc;

    private Picture picture;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PictureResource pictureResource = new PictureResource(pictureService);
        this.restPictureMockMvc = MockMvcBuilders.standaloneSetup(pictureResource)
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
    public static Picture createEntity(EntityManager em) {
        Picture picture = new Picture()
            .date(DEFAULT_DATE)
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return picture;
    }

    @Before
    public void initTest() {
        picture = createEntity(em);
    }

    @Test
    @Transactional
    public void createPicture() throws Exception {
        int databaseSizeBeforeCreate = pictureRepository.findAll().size();

        // Create the Picture
        PictureDTO pictureDTO = pictureMapper.toDto(picture);
        restPictureMockMvc.perform(post("/api/pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pictureDTO)))
            .andExpect(status().isCreated());

        // Validate the Picture in the database
        List<Picture> pictureList = pictureRepository.findAll();
        assertThat(pictureList).hasSize(databaseSizeBeforeCreate + 1);
        Picture testPicture = pictureList.get(pictureList.size() - 1);
        assertThat(testPicture.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPicture.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPicture.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testPicture.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);

        // Validate the Picture in Elasticsearch
        verify(mockPictureSearchRepository, times(1)).save(testPicture);
    }

    @Test
    @Transactional
    public void createPictureWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pictureRepository.findAll().size();

        // Create the Picture with an existing ID
        picture.setId(1L);
        PictureDTO pictureDTO = pictureMapper.toDto(picture);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPictureMockMvc.perform(post("/api/pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pictureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Picture in the database
        List<Picture> pictureList = pictureRepository.findAll();
        assertThat(pictureList).hasSize(databaseSizeBeforeCreate);

        // Validate the Picture in Elasticsearch
        verify(mockPictureSearchRepository, times(0)).save(picture);
    }

    @Test
    @Transactional
    public void getAllPictures() throws Exception {
        // Initialize the database
        pictureRepository.saveAndFlush(picture);

        // Get all the pictureList
        restPictureMockMvc.perform(get("/api/pictures?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(picture.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getPicture() throws Exception {
        // Initialize the database
        pictureRepository.saveAndFlush(picture);

        // Get the picture
        restPictureMockMvc.perform(get("/api/pictures/{id}", picture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(picture.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingPicture() throws Exception {
        // Get the picture
        restPictureMockMvc.perform(get("/api/pictures/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePicture() throws Exception {
        // Initialize the database
        pictureRepository.saveAndFlush(picture);

        int databaseSizeBeforeUpdate = pictureRepository.findAll().size();

        // Update the picture
        Picture updatedPicture = pictureRepository.findById(picture.getId()).get();
        // Disconnect from session so that the updates on updatedPicture are not directly saved in db
        em.detach(updatedPicture);
        updatedPicture
            .date(UPDATED_DATE)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        PictureDTO pictureDTO = pictureMapper.toDto(updatedPicture);

        restPictureMockMvc.perform(put("/api/pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pictureDTO)))
            .andExpect(status().isOk());

        // Validate the Picture in the database
        List<Picture> pictureList = pictureRepository.findAll();
        assertThat(pictureList).hasSize(databaseSizeBeforeUpdate);
        Picture testPicture = pictureList.get(pictureList.size() - 1);
        assertThat(testPicture.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPicture.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPicture.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testPicture.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);

        // Validate the Picture in Elasticsearch
        verify(mockPictureSearchRepository, times(1)).save(testPicture);
    }

    @Test
    @Transactional
    public void updateNonExistingPicture() throws Exception {
        int databaseSizeBeforeUpdate = pictureRepository.findAll().size();

        // Create the Picture
        PictureDTO pictureDTO = pictureMapper.toDto(picture);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPictureMockMvc.perform(put("/api/pictures")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pictureDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Picture in the database
        List<Picture> pictureList = pictureRepository.findAll();
        assertThat(pictureList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Picture in Elasticsearch
        verify(mockPictureSearchRepository, times(0)).save(picture);
    }

    @Test
    @Transactional
    public void deletePicture() throws Exception {
        // Initialize the database
        pictureRepository.saveAndFlush(picture);

        int databaseSizeBeforeDelete = pictureRepository.findAll().size();

        // Get the picture
        restPictureMockMvc.perform(delete("/api/pictures/{id}", picture.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Picture> pictureList = pictureRepository.findAll();
        assertThat(pictureList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Picture in Elasticsearch
        verify(mockPictureSearchRepository, times(1)).deleteById(picture.getId());
    }

    @Test
    @Transactional
    public void searchPicture() throws Exception {
        // Initialize the database
        pictureRepository.saveAndFlush(picture);
        when(mockPictureSearchRepository.search(queryStringQuery("id:" + picture.getId())))
            .thenReturn(Collections.singletonList(picture));
        // Search the picture
        restPictureMockMvc.perform(get("/api/_search/pictures?query=id:" + picture.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(picture.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Picture.class);
        Picture picture1 = new Picture();
        picture1.setId(1L);
        Picture picture2 = new Picture();
        picture2.setId(picture1.getId());
        assertThat(picture1).isEqualTo(picture2);
        picture2.setId(2L);
        assertThat(picture1).isNotEqualTo(picture2);
        picture1.setId(null);
        assertThat(picture1).isNotEqualTo(picture2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PictureDTO.class);
        PictureDTO pictureDTO1 = new PictureDTO();
        pictureDTO1.setId(1L);
        PictureDTO pictureDTO2 = new PictureDTO();
        assertThat(pictureDTO1).isNotEqualTo(pictureDTO2);
        pictureDTO2.setId(pictureDTO1.getId());
        assertThat(pictureDTO1).isEqualTo(pictureDTO2);
        pictureDTO2.setId(2L);
        assertThat(pictureDTO1).isNotEqualTo(pictureDTO2);
        pictureDTO1.setId(null);
        assertThat(pictureDTO1).isNotEqualTo(pictureDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pictureMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pictureMapper.fromId(null)).isNull();
    }
}
