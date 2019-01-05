package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Color;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Color entity.
 */
public interface ColorSearchRepository extends ElasticsearchRepository<Color, Long> {
}
