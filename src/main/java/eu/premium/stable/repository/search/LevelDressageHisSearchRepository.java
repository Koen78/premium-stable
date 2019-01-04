package eu.premium.stable.repository.search;

import eu.premium.stable.domain.LevelDressageHis;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LevelDressageHis entity.
 */
public interface LevelDressageHisSearchRepository extends ElasticsearchRepository<LevelDressageHis, Long> {
}
