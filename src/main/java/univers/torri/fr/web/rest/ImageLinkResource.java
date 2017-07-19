package univers.torri.fr.web.rest;

import com.codahale.metrics.annotation.Timed;
import univers.torri.fr.service.ImageLinkService;
import univers.torri.fr.web.rest.util.HeaderUtil;
import univers.torri.fr.web.rest.util.PaginationUtil;
import univers.torri.fr.service.dto.ImageLinkDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ImageLink.
 */
@RestController
@RequestMapping("/api")
public class ImageLinkResource {

    private final Logger log = LoggerFactory.getLogger(ImageLinkResource.class);

    private static final String ENTITY_NAME = "imageLink";

    private final ImageLinkService imageLinkService;

    public ImageLinkResource(ImageLinkService imageLinkService) {
        this.imageLinkService = imageLinkService;
    }

    /**
     * POST  /image-links : Create a new imageLink.
     *
     * @param imageLinkDTO the imageLinkDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imageLinkDTO, or with status 400 (Bad Request) if the imageLink has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/image-links")
    @Timed
    public ResponseEntity<ImageLinkDTO> createImageLink(@RequestBody ImageLinkDTO imageLinkDTO) throws URISyntaxException {
        log.debug("REST request to save ImageLink : {}", imageLinkDTO);
        if (imageLinkDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new imageLink cannot already have an ID")).body(null);
        }
        ImageLinkDTO result = imageLinkService.save(imageLinkDTO);
        return ResponseEntity.created(new URI("/api/image-links/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /image-links : Updates an existing imageLink.
     *
     * @param imageLinkDTO the imageLinkDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imageLinkDTO,
     * or with status 400 (Bad Request) if the imageLinkDTO is not valid,
     * or with status 500 (Internal Server Error) if the imageLinkDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/image-links")
    @Timed
    public ResponseEntity<ImageLinkDTO> updateImageLink(@RequestBody ImageLinkDTO imageLinkDTO) throws URISyntaxException {
        log.debug("REST request to update ImageLink : {}", imageLinkDTO);
        if (imageLinkDTO.getId() == null) {
            return createImageLink(imageLinkDTO);
        }
        ImageLinkDTO result = imageLinkService.save(imageLinkDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imageLinkDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /image-links : get all the imageLinks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of imageLinks in body
     */
    @GetMapping("/image-links")
    @Timed
    public ResponseEntity<List<ImageLinkDTO>> getAllImageLinks(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ImageLinks");
        Page<ImageLinkDTO> page = imageLinkService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/image-links");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /image-links/:id : get the "id" imageLink.
     *
     * @param id the id of the imageLinkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imageLinkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/image-links/{id}")
    @Timed
    public ResponseEntity<ImageLinkDTO> getImageLink(@PathVariable Long id) {
        log.debug("REST request to get ImageLink : {}", id);
        ImageLinkDTO imageLinkDTO = imageLinkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imageLinkDTO));
    }

    /**
     * DELETE  /image-links/:id : delete the "id" imageLink.
     *
     * @param id the id of the imageLinkDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/image-links/{id}")
    @Timed
    public ResponseEntity<Void> deleteImageLink(@PathVariable Long id) {
        log.debug("REST request to delete ImageLink : {}", id);
        imageLinkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
