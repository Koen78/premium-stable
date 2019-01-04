package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.PictureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Picture and its DTO PictureDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class})
public interface PictureMapper extends EntityMapper<PictureDTO, Picture> {

    @Mapping(source = "horse.id", target = "horseId")
    PictureDTO toDto(Picture picture);

    @Mapping(source = "horseId", target = "horse")
    Picture toEntity(PictureDTO pictureDTO);

    default Picture fromId(Long id) {
        if (id == null) {
            return null;
        }
        Picture picture = new Picture();
        picture.setId(id);
        return picture;
    }
}
