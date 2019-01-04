package eu.premium.stable.repository.search;

import eu.premium.stable.domain.Gender;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Gender entity.
 */
public interface GenderSearchRepository extends ElasticsearchRepository<Gender, Long> {
}
