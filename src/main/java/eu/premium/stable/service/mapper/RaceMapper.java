package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.RaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Race and its DTO RaceDTO.
 */
@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface RaceMapper extends EntityMapper<RaceDTO, Race> {

    @Mapping(source = "country.id", target = "countryId")
    RaceDTO toDto(Race race);

    @Mapping(source = "countryId", target = "country")
    Race toEntity(RaceDTO raceDTO);

    default Race fromId(Long id) {
        if (id == null) {
            return null;
        }
        Race race = new Race();
        race.setId(id);
        return race;
    }
}
