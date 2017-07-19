package univers.torri.fr.service;

import univers.torri.fr.service.dto.ArticleDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Article.
 */
public interface ArticleService {

    /**
     * Save a article.
     *
     * @param articleDTO the entity to save
     * @return the persisted entity
     */
    ArticleDTO save(ArticleDTO articleDTO);

    /**
     *  Get all the articles.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<ArticleDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" article.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    ArticleDTO findOne(Long id);

    /**
     *  Delete the "id" article.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
