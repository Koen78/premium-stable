package eu.premium.stable.repository;

import eu.premium.stable.domain.Color;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Color entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

}
