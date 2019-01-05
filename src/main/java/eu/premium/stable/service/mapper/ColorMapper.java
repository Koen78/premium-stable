package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.ColorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Color and its DTO ColorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ColorMapper extends EntityMapper<ColorDTO, Color> {



    default Color fromId(Long id) {
        if (id == null) {
            return null;
        }
        Color color = new Color();
        color.setId(id);
        return color;
    }
}
