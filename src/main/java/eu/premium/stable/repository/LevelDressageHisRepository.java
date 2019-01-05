package eu.premium.stable.repository;

import eu.premium.stable.domain.LevelDressageHis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LevelDressageHis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelDressageHisRepository extends JpaRepository<LevelDressageHis, Long> {

}
