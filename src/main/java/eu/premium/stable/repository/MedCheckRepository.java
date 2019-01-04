package eu.premium.stable.repository;

import eu.premium.stable.domain.MedCheck;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedCheck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedCheckRepository extends JpaRepository<MedCheck, Long> {

}
