package eu.premium.stable.repository;

import eu.premium.stable.domain.MedCheckXray;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MedCheckXray entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedCheckXrayRepository extends JpaRepository<MedCheckXray, Long> {

}
