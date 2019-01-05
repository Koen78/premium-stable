package eu.premium.stable.repository;

import eu.premium.stable.domain.Horse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Horse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorseRepository extends JpaRepository<Horse, Long> {

}
