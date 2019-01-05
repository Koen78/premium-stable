package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Horse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Horse entity.
 */
public interface HorseSearchRepository extends ElasticsearchRepository<Horse, Long> {
}
