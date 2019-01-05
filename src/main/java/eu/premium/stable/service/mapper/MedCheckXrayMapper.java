package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.MedCheckXrayDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MedCheckXray and its DTO MedCheckXrayDTO.
 */
@Mapper(componentModel = "spring", uses = {MedCheckMapper.class})
public interface MedCheckXrayMapper extends EntityMapper<MedCheckXrayDTO, MedCheckXray> {

    @Mapping(source = "medCheck.id", target = "medCheckId")
    MedCheckXrayDTO toDto(MedCheckXray medCheckXray);

    @Mapping(source = "medCheckId", target = "medCheck")
    MedCheckXray toEntity(MedCheckXrayDTO medCheckXrayDTO);

    default MedCheckXray fromId(Long id) {
        if (id == null) {
            return null;
        }
        MedCheckXray medCheckXray = new MedCheckXray();
        medCheckXray.setId(id);
        return medCheckXray;
    }
}
