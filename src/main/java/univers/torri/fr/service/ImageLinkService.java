package univers.torri.fr.service;

import univers.torri.fr.service.dto.ImageLinkDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ImageLink.
 */
public interface ImageLinkService {

    /**
     * Save a imageLink.
     *
     * @param imageLinkDTO the entity to save
     * @return the persisted entity
     */
    ImageLinkDTO save(ImageLinkDTO imageLinkDTO);

    /**
     *  Get all the imageLinks.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ImageLinkDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" imageLink.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ImageLinkDTO findOne(Long id);

    /**
     *  Delete the "id" imageLink.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
