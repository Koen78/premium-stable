package eu.premium.stable.repository.search;

import eu.premium.stable.domain.LevelDressage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LevelDressage entity.
 */
public interface LevelDressageSearchRepository extends ElasticsearchRepository<LevelDressage, Long> {
}
