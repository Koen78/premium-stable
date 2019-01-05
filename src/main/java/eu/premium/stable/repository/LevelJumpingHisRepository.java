package eu.premium.stable.repository;

import eu.premium.stable.domain.LevelJumpingHis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LevelJumpingHis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelJumpingHisRepository extends JpaRepository<LevelJumpingHis, Long> {

}
