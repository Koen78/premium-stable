package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.LevelJumpingHisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LevelJumpingHis and its DTO LevelJumpingHisDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class, LevelJumpingMapper.class})
public interface LevelJumpingHisMapper extends EntityMapper<LevelJumpingHisDTO, LevelJumpingHis> {

    @Mapping(source = "horse.id", target = "horseId")
    @Mapping(source = "levelJumping.id", target = "levelJumpingId")
    LevelJumpingHisDTO toDto(LevelJumpingHis levelJumpingHis);

    @Mapping(source = "horseId", target = "horse")
    @Mapping(source = "levelJumpingId", target = "levelJumping")
    LevelJumpingHis toEntity(LevelJumpingHisDTO levelJumpingHisDTO);

    default LevelJumpingHis fromId(Long id) {
        if (id == null) {
            return null;
        }
        LevelJumpingHis levelJumpingHis = new LevelJumpingHis();
        levelJumpingHis.setId(id);
        return levelJumpingHis;
    }
}
