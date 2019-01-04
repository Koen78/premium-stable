package eu.premium.stable.service.mapper;

import eu.premium.stable.domain.*;
import eu.premium.stable.service.dto.VideoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Video and its DTO VideoDTO.
 */
@Mapper(componentModel = "spring", uses = {HorseMapper.class})
public interface VideoMapper extends EntityMapper<VideoDTO, Video> {

    @Mapping(source = "horse.id", target = "horseId")
    VideoDTO toDto(Video video);

    @Mapping(source = "horseId", target = "horse")
    Video toEntity(VideoDTO videoDTO);

    default Video fromId(Long id) {
        if (id == null) {
            return null;
        }
        Video video = new Video();
        video.setId(id);
        return video;
    }
}
