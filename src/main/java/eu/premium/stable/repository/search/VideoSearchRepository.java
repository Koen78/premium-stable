package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Video;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Video entity.
 */
public interface VideoSearchRepository extends ElasticsearchRepository<Video, Long> {
}
