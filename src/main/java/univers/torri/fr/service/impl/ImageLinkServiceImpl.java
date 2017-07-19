package univers.torri.fr.service.impl;

import univers.torri.fr.service.ImageLinkService;
import univers.torri.fr.domain.ImageLink;
import univers.torri.fr.repository.ImageLinkRepository;
import univers.torri.fr.service.dto.ImageLinkDTO;
import univers.torri.fr.service.mapper.ImageLinkMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ImageLink.
 */
@Service
@Transactional
public class ImageLinkServiceImpl implements ImageLinkService{

    private final Logger log = LoggerFactory.getLogger(ImageLinkServiceImpl.class);

    private final ImageLinkRepository imageLinkRepository;

    private final ImageLinkMapper imageLinkMapper;

    public ImageLinkServiceImpl(ImageLinkRepository imageLinkRepository, ImageLinkMapper imageLinkMapper) {
        this.imageLinkRepository = imageLinkRepository;
        this.imageLinkMapper = imageLinkMapper;
    }

    /**
     * Save a imageLink.
     *
     * @param imageLinkDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ImageLinkDTO save(ImageLinkDTO imageLinkDTO) {
        log.debug("Request to save ImageLink : {}", imageLinkDTO);
        ImageLink imageLink = imageLinkMapper.toEntity(imageLinkDTO);
        imageLink = imageLinkRepository.save(imageLink);
        return imageLinkMapper.toDto(imageLink);
    }

    /**
     *  Get all the imageLinks.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ImageLinkDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ImageLinks");
        return imageLinkRepository.findAll(pageable)
            .map(imageLinkMapper::toDto);
    }

    /**
     *  Get one imageLink by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ImageLinkDTO findOne(Long id) {
        log.debug("Request to get ImageLink : {}", id);
        ImageLink imageLink = imageLinkRepository.findOne(id);
        return imageLinkMapper.toDto(imageLink);
    }

    /**
     *  Delete the  imageLink by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ImageLink : {}", id);
        imageLinkRepository.delete(id);
    }
}
