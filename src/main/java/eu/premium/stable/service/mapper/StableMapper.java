package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.StableDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Stable and its DTO StableDTO.
 */
@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface StableMapper extends EntityMapper<StableDTO, Stable> {

    @Mapping(source = "country.id", target = "countryId")
    StableDTO toDto(Stable stable);

    @Mapping(target = "horses", ignore = true)
    @Mapping(source = "countryId", target = "country")
    @Mapping(target = "owners", ignore = true)
    Stable toEntity(StableDTO stableDTO);

    default Stable fromId(Long id) {
        if (id == null) {
            return null;
        }
        Stable stable = new Stable();
        stable.setId(id);
        return stable;
    }
}
