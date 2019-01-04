package eu.premium.stable.repository;

import eu.premium.stable.domain.EquineSpecies;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EquineSpecies entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquineSpeciesRepository extends JpaRepository<EquineSpecies, Long> {

}
