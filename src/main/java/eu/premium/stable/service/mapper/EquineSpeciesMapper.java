package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.EquineSpeciesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EquineSpecies and its DTO EquineSpeciesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EquineSpeciesMapper extends EntityMapper<EquineSpeciesDTO, EquineSpecies> {



    default EquineSpecies fromId(Long id) {
        if (id == null) {
            return null;
        }
        EquineSpecies equineSpecies = new EquineSpecies();
        equineSpecies.setId(id);
        return equineSpecies;
    }
}
