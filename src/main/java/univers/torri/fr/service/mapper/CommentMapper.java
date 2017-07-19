package univers.torri.fr.service.mapper;

import univers.torri.fr.domain.*;
import univers.torri.fr.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class, })
public interface CommentMapper extends EntityMapper <CommentDTO, Comment> {

    @Mapping(source = "article.id", target = "articleId")
    CommentDTO toDto(Comment comment); 

    @Mapping(source = "articleId", target = "article")
    Comment toEntity(CommentDTO commentDTO); 
    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
