package eu.premium.stable.repository;

import eu.premium.stable.domain.MedCheckDet;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedCheckDet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedCheckDetRepository extends JpaRepository<MedCheckDet, Long> {

}
