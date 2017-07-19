package univers.torri.fr.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "short_description")
    private String shortDescription;

    @Column(name = "full_description")
    private String fullDescription;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @Column(name = "date_update")
    private ZonedDateTime dateUpdate;

    @Column(name = "lieu")
    private String lieu;

    @Column(name = "position_x")
    private Float positionX;

    @Column(name = "position_y")
    private Float positionY;

    @Column(name = "country_code")
    private String countryCode;

    @OneToMany(mappedBy = "article")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ImageLink> imagelinks = new HashSet<>();

    @OneToMany(mappedBy = "article")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Comment> comments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public Article shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getFullDescription() {
        return fullDescription;
    }

    public Article fullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
        return this;
    }

    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Article date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public ZonedDateTime getDateUpdate() {
        return dateUpdate;
    }

    public Article dateUpdate(ZonedDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
        return this;
    }

    public void setDateUpdate(ZonedDateTime dateUpdate) {
        this.dateUpdate = dateUpdate;
    }

    public String getLieu() {
        return lieu;
    }

    public Article lieu(String lieu) {
        this.lieu = lieu;
        return this;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public Float getPositionX() {
        return positionX;
    }

    public Article positionX(Float positionX) {
        this.positionX = positionX;
        return this;
    }

    public void setPositionX(Float positionX) {
        this.positionX = positionX;
    }

    public Float getPositionY() {
        return positionY;
    }

    public Article positionY(Float positionY) {
        this.positionY = positionY;
        return this;
    }

    public void setPositionY(Float positionY) {
        this.positionY = positionY;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public Article countryCode(String countryCode) {
        this.countryCode = countryCode;
        return this;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public Set<ImageLink> getImagelinks() {
        return imagelinks;
    }

    public Article imagelinks(Set<ImageLink> imageLinks) {
        this.imagelinks = imageLinks;
        return this;
    }

    public Article addImagelink(ImageLink imageLink) {
        this.imagelinks.add(imageLink);
        imageLink.setArticle(this);
        return this;
    }

    public Article removeImagelink(ImageLink imageLink) {
        this.imagelinks.remove(imageLink);
        imageLink.setArticle(null);
        return this;
    }

    public void setImagelinks(Set<ImageLink> imageLinks) {
        this.imagelinks = imageLinks;
    }

    public Set<Comment> getComments() {
        return comments;
    }

    public Article comments(Set<Comment> comments) {
        this.comments = comments;
        return this;
    }

    public Article addComment(Comment comment) {
        this.comments.add(comment);
        comment.setArticle(this);
        return this;
    }

    public Article removeComment(Comment comment) {
        this.comments.remove(comment);
        comment.setArticle(null);
        return this;
    }

    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", shortDescription='" + getShortDescription() + "'" +
            ", fullDescription='" + getFullDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", dateUpdate='" + getDateUpdate() + "'" +
            ", lieu='" + getLieu() + "'" +
            ", positionX='" + getPositionX() + "'" +
            ", positionY='" + getPositionY() + "'" +
            ", countryCode='" + getCountryCode() + "'" +
            "}";
    }
}
