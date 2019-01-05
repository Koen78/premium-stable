package eu.premium.stable.repository.search;

import eu.premium.stable.domain.MedCheck;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MedCheck entity.
 */
public interface MedCheckSearchRepository extends ElasticsearchRepository<MedCheck, Long> {
}
