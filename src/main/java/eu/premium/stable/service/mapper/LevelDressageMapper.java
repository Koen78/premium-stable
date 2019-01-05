package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.LevelDressageDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LevelDressage and its DTO LevelDressageDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LevelDressageMapper extends EntityMapper<LevelDressageDTO, LevelDressage> {



    default LevelDressage fromId(Long id) {
        if (id == null) {
            return null;
        }
        LevelDressage levelDressage = new LevelDressage();
        levelDressage.setId(id);
        return levelDressage;
    }
}
