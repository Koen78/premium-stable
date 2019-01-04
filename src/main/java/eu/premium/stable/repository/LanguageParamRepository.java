package eu.premium.stable.repository;

import eu.premium.stable.domain.LanguageParam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LanguageParam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LanguageParamRepository extends JpaRepository<LanguageParam, Long> {

}
