package univers.torri.fr.repository;

import univers.torri.fr.domain.ImageLink;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ImageLink entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageLinkRepository extends JpaRepository<ImageLink,Long> {
    
}
