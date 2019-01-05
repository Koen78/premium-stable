package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.GenderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Gender and its DTO GenderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GenderMapper extends EntityMapper<GenderDTO, Gender> {



    default Gender fromId(Long id) {
        if (id == null) {
            return null;
        }
        Gender gender = new Gender();
        gender.setId(id);
        return gender;
    }
}
