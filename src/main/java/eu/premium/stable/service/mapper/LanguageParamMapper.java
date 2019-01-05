package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.LanguageParamDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LanguageParam and its DTO LanguageParamDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LanguageParamMapper extends EntityMapper<LanguageParamDTO, LanguageParam> {



    default LanguageParam fromId(Long id) {
        if (id == null) {
            return null;
        }
        LanguageParam languageParam = new LanguageParam();
        languageParam.setId(id);
        return languageParam;
    }
}
