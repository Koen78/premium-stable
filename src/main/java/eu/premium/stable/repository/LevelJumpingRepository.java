package eu.premium.stable.repository;

import eu.premium.stable.domain.LevelJumping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LevelJumping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LevelJumpingRepository extends JpaRepository<LevelJumping, Long> {

}
