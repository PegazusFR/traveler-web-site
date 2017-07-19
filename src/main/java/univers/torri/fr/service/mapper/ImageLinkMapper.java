package univers.torri.fr.service.mapper;

import univers.torri.fr.domain.*;
import univers.torri.fr.service.dto.ImageLinkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ImageLink and its DTO ImageLinkDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class, })
public interface ImageLinkMapper extends EntityMapper <ImageLinkDTO, ImageLink> {

    @Mapping(source = "article.id", target = "articleId")
    ImageLinkDTO toDto(ImageLink imageLink); 

    @Mapping(source = "articleId", target = "article")
    ImageLink toEntity(ImageLinkDTO imageLinkDTO); 
    default ImageLink fromId(Long id) {
        if (id == null) {
            return null;
        }
        ImageLink imageLink = new ImageLink();
        imageLink.setId(id);
        return imageLink;
    }
}
