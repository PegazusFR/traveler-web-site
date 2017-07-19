package univers.torri.fr.service.mapper;

import univers.torri.fr.domain.*;
import univers.torri.fr.service.dto.ArticleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Article and its DTO ArticleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ArticleMapper extends EntityMapper <ArticleDTO, Article> {
    
    @Mapping(target = "imagelinks", ignore = true)
    @Mapping(target = "comments", ignore = true)
    Article toEntity(ArticleDTO articleDTO); 
    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }
}
