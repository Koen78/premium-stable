package eu.premium.stable.repository;

import eu.premium.stable.domain.LevelDressage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LevelDressage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelDressageRepository extends JpaRepository<LevelDressage, Long> {

}
