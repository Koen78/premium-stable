package eu.premium.stable.repository.search;

import eu.premium.stable.domain.LanguageParam;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LanguageParam entity.
 */
public interface LanguageParamSearchRepository extends ElasticsearchRepository<LanguageParam, Long> {
}
