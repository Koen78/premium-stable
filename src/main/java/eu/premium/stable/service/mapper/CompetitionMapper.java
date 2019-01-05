package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.CompetitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Competition and its DTO CompetitionDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class, RaceMapper.class})
public interface CompetitionMapper extends EntityMapper<CompetitionDTO, Competition> {

    @Mapping(source = "horse.id", target = "horseId")
    @Mapping(source = "race.id", target = "raceId")
    CompetitionDTO toDto(Competition competition);

    @Mapping(source = "horseId", target = "horse")
    @Mapping(source = "raceId", target = "race")
    Competition toEntity(CompetitionDTO competitionDTO);

    default Competition fromId(Long id) {
        if (id == null) {
            return null;
        }
        Competition competition = new Competition();
        competition.setId(id);
        return competition;
    }
}
