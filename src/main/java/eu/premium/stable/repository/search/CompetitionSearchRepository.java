package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Competition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Competition entity.
 */
public interface CompetitionSearchRepository extends ElasticsearchRepository<Competition, Long> {
}
