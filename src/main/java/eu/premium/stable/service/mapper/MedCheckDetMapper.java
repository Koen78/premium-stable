package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.MedCheckDetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MedCheckDet and its DTO MedCheckDetDTO.
 */
@Mapper(componentModel = "spring", uses = {MedCheckMapper.class})
public interface MedCheckDetMapper extends EntityMapper<MedCheckDetDTO, MedCheckDet> {

    @Mapping(source = "medCheck.id", target = "medCheckId")
    MedCheckDetDTO toDto(MedCheckDet medCheckDet);

    @Mapping(source = "medCheckId", target = "medCheck")
    MedCheckDet toEntity(MedCheckDetDTO medCheckDetDTO);

    default MedCheckDet fromId(Long id) {
        if (id == null) {
            return null;
        }
        MedCheckDet medCheckDet = new MedCheckDet();
        medCheckDet.setId(id);
        return medCheckDet;
    }
}
