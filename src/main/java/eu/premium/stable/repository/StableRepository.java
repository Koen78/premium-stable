package eu.premium.stable.repository;

import eu.premium.stable.domain.Stable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StableRepository extends JpaRepository<Stable, Long> {

}
