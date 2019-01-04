package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.LevelJumpingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LevelJumping and its DTO LevelJumpingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LevelJumpingMapper extends EntityMapper<LevelJumpingDTO, LevelJumping> {



    default LevelJumping fromId(Long id) {
        if (id == null) {
            return null;
        }
        LevelJumping levelJumping = new LevelJumping();
        levelJumping.setId(id);
        return levelJumping;
    }
}
