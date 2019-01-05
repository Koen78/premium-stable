package eu.premium.stable.repository.search;

import eu.premium.stable.domain.MedCheckDet;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MedCheckDet entity.
 */
public interface MedCheckDetSearchRepository extends ElasticsearchRepository<MedCheckDet, Long> {
}
