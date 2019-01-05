package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.LevelDressageHisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LevelDressageHis and its DTO LevelDressageHisDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class, LevelDressageMapper.class})
public interface LevelDressageHisMapper extends EntityMapper<LevelDressageHisDTO, LevelDressageHis> {

    @Mapping(source = "horse.id", target = "horseId")
    @Mapping(source = "levelDressage.id", target = "levelDressageId")
    LevelDressageHisDTO toDto(LevelDressageHis levelDressageHis);

    @Mapping(source = "horseId", target = "horse")
    @Mapping(source = "levelDressageId", target = "levelDressage")
    LevelDressageHis toEntity(LevelDressageHisDTO levelDressageHisDTO);

    default LevelDressageHis fromId(Long id) {
        if (id == null) {
            return null;
        }
        LevelDressageHis levelDressageHis = new LevelDressageHis();
        levelDressageHis.setId(id);
        return levelDressageHis;
    }
}
