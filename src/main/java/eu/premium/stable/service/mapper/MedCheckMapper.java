package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.MedCheckDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MedCheck and its DTO MedCheckDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class})
public interface MedCheckMapper extends EntityMapper<MedCheckDTO, MedCheck> {

    @Mapping(source = "horse.id", target = "horseId")
    MedCheckDTO toDto(MedCheck medCheck);

    @Mapping(source = "horseId", target = "horse")
    @Mapping(target = "details", ignore = true)
    @Mapping(target = "xrays", ignore = true)
    MedCheck toEntity(MedCheckDTO medCheckDTO);

    default MedCheck fromId(Long id) {
        if (id == null) {
            return null;
        }
        MedCheck medCheck = new MedCheck();
        medCheck.setId(id);
        return medCheck;
    }
}
