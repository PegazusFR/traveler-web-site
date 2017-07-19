package univers.torri.fr.web.rest;

import univers.torri.fr.TravelerWebSiteApp;

import univers.torri.fr.domain.ImageLink;
import univers.torri.fr.repository.ImageLinkRepository;
import univers.torri.fr.service.ImageLinkService;
import univers.torri.fr.service.dto.ImageLinkDTO;
import univers.torri.fr.service.mapper.ImageLinkMapper;
import univers.torri.fr.web.rest.errors.ExceptionTranslator;

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

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static univers.torri.fr.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ImageLinkResource REST controller.
 *
 * @see ImageLinkResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TravelerWebSiteApp.class)
public class ImageLinkResourceIntTest {

    private static final String DEFAULT_URL_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_URL_IMAGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ImageLinkRepository imageLinkRepository;

    @Autowired
    private ImageLinkMapper imageLinkMapper;

    @Autowired
    private ImageLinkService imageLinkService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImageLinkMockMvc;

    private ImageLink imageLink;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ImageLinkResource imageLinkResource = new ImageLinkResource(imageLinkService);
        this.restImageLinkMockMvc = MockMvcBuilders.standaloneSetup(imageLinkResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImageLink createEntity(EntityManager em) {
        ImageLink imageLink = new ImageLink()
            .urlImage(DEFAULT_URL_IMAGE)
            .date(DEFAULT_DATE);
        return imageLink;
    }

    @Before
    public void initTest() {
        imageLink = createEntity(em);
    }

    @Test
    @Transactional
    public void createImageLink() throws Exception {
        int databaseSizeBeforeCreate = imageLinkRepository.findAll().size();

        // Create the ImageLink
        ImageLinkDTO imageLinkDTO = imageLinkMapper.toDto(imageLink);
        restImageLinkMockMvc.perform(post("/api/image-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageLinkDTO)))
            .andExpect(status().isCreated());

        // Validate the ImageLink in the database
        List<ImageLink> imageLinkList = imageLinkRepository.findAll();
        assertThat(imageLinkList).hasSize(databaseSizeBeforeCreate + 1);
        ImageLink testImageLink = imageLinkList.get(imageLinkList.size() - 1);
        assertThat(testImageLink.getUrlImage()).isEqualTo(DEFAULT_URL_IMAGE);
        assertThat(testImageLink.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createImageLinkWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imageLinkRepository.findAll().size();

        // Create the ImageLink with an existing ID
        imageLink.setId(1L);
        ImageLinkDTO imageLinkDTO = imageLinkMapper.toDto(imageLink);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImageLinkMockMvc.perform(post("/api/image-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageLinkDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<ImageLink> imageLinkList = imageLinkRepository.findAll();
        assertThat(imageLinkList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImageLinks() throws Exception {
        // Initialize the database
        imageLinkRepository.saveAndFlush(imageLink);

        // Get all the imageLinkList
        restImageLinkMockMvc.perform(get("/api/image-links?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imageLink.getId().intValue())))
            .andExpect(jsonPath("$.[*].urlImage").value(hasItem(DEFAULT_URL_IMAGE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getImageLink() throws Exception {
        // Initialize the database
        imageLinkRepository.saveAndFlush(imageLink);

        // Get the imageLink
        restImageLinkMockMvc.perform(get("/api/image-links/{id}", imageLink.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imageLink.getId().intValue()))
            .andExpect(jsonPath("$.urlImage").value(DEFAULT_URL_IMAGE.toString()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingImageLink() throws Exception {
        // Get the imageLink
        restImageLinkMockMvc.perform(get("/api/image-links/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImageLink() throws Exception {
        // Initialize the database
        imageLinkRepository.saveAndFlush(imageLink);
        int databaseSizeBeforeUpdate = imageLinkRepository.findAll().size();

        // Update the imageLink
        ImageLink updatedImageLink = imageLinkRepository.findOne(imageLink.getId());
        updatedImageLink
            .urlImage(UPDATED_URL_IMAGE)
            .date(UPDATED_DATE);
        ImageLinkDTO imageLinkDTO = imageLinkMapper.toDto(updatedImageLink);

        restImageLinkMockMvc.perform(put("/api/image-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageLinkDTO)))
            .andExpect(status().isOk());

        // Validate the ImageLink in the database
        List<ImageLink> imageLinkList = imageLinkRepository.findAll();
        assertThat(imageLinkList).hasSize(databaseSizeBeforeUpdate);
        ImageLink testImageLink = imageLinkList.get(imageLinkList.size() - 1);
        assertThat(testImageLink.getUrlImage()).isEqualTo(UPDATED_URL_IMAGE);
        assertThat(testImageLink.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingImageLink() throws Exception {
        int databaseSizeBeforeUpdate = imageLinkRepository.findAll().size();

        // Create the ImageLink
        ImageLinkDTO imageLinkDTO = imageLinkMapper.toDto(imageLink);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restImageLinkMockMvc.perform(put("/api/image-links")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageLinkDTO)))
            .andExpect(status().isCreated());

        // Validate the ImageLink in the database
        List<ImageLink> imageLinkList = imageLinkRepository.findAll();
        assertThat(imageLinkList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteImageLink() throws Exception {
        // Initialize the database
        imageLinkRepository.saveAndFlush(imageLink);
        int databaseSizeBeforeDelete = imageLinkRepository.findAll().size();

        // Get the imageLink
        restImageLinkMockMvc.perform(delete("/api/image-links/{id}", imageLink.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImageLink> imageLinkList = imageLinkRepository.findAll();
        assertThat(imageLinkList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageLink.class);
        ImageLink imageLink1 = new ImageLink();
        imageLink1.setId(1L);
        ImageLink imageLink2 = new ImageLink();
        imageLink2.setId(imageLink1.getId());
        assertThat(imageLink1).isEqualTo(imageLink2);
        imageLink2.setId(2L);
        assertThat(imageLink1).isNotEqualTo(imageLink2);
        imageLink1.setId(null);
        assertThat(imageLink1).isNotEqualTo(imageLink2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageLinkDTO.class);
        ImageLinkDTO imageLinkDTO1 = new ImageLinkDTO();
        imageLinkDTO1.setId(1L);
        ImageLinkDTO imageLinkDTO2 = new ImageLinkDTO();
        assertThat(imageLinkDTO1).isNotEqualTo(imageLinkDTO2);
        imageLinkDTO2.setId(imageLinkDTO1.getId());
        assertThat(imageLinkDTO1).isEqualTo(imageLinkDTO2);
        imageLinkDTO2.setId(2L);
        assertThat(imageLinkDTO1).isNotEqualTo(imageLinkDTO2);
        imageLinkDTO1.setId(null);
        assertThat(imageLinkDTO1).isNotEqualTo(imageLinkDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(imageLinkMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(imageLinkMapper.fromId(null)).isNull();
    }
}
