package univers.torri.fr.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ImageLink entity.
 */
public class ImageLinkDTO implements Serializable {

    private Long id;

    private String urlImage;

    private ZonedDateTime date;

    private Long articleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ImageLinkDTO imageLinkDTO = (ImageLinkDTO) o;
        if(imageLinkDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imageLinkDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImageLinkDTO{" +
            "id=" + getId() +
            ", urlImage='" + getUrlImage() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
