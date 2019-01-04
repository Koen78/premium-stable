package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Stable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Stable entity.
 */
public interface StableSearchRepository extends ElasticsearchRepository<Stable, Long> {
}
