package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.HorseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Horse and its DTO HorseDTO.
 */
@Mapper(componentModel = "spring", uses = {StableMapper.class, LevelDressageMapper.class, LevelJumpingMapper.class, GenderMapper.class, ColorMapper.class})
public interface HorseMapper extends EntityMapper<HorseDTO, Horse> {

    @Mapping(source = "stable.id", target = "stableId")
    @Mapping(source = "levelDressage.id", target = "levelDressageId")
    @Mapping(source = "levelJumping.id", target = "levelJumpingId")
    @Mapping(source = "gender.id", target = "genderId")
    @Mapping(source = "color.id", target = "colorId")
    HorseDTO toDto(Horse horse);

    @Mapping(source = "stableId", target = "stable")
    @Mapping(target = "pictures", ignore = true)
    @Mapping(target = "videos", ignore = true)
    @Mapping(target = "competitions", ignore = true)
    @Mapping(target = "medChecks", ignore = true)
    @Mapping(target = "levelJumpingHisses", ignore = true)
    @Mapping(target = "levelDressageHisses", ignore = true)
    @Mapping(source = "levelDressageId", target = "levelDressage")
    @Mapping(source = "levelJumpingId", target = "levelJumping")
    @Mapping(source = "genderId", target = "gender")
    @Mapping(source = "colorId", target = "color")
    @Mapping(target = "owners", ignore = true)
    Horse toEntity(HorseDTO horseDTO);

    default Horse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Horse horse = new Horse();
        horse.setId(id);
        return horse;
    }
}
