package eu.premium.stable.repository.search;

import eu.premium.stable.domain.MedCheckXray;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MedCheckXray entity.
 */
public interface MedCheckXraySearchRepository extends ElasticsearchRepository<MedCheckXray, Long> {
}
