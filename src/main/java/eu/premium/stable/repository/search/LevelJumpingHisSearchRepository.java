package eu.premium.stable.repository.search;

import eu.premium.stable.domain.LevelJumpingHis;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LevelJumpingHis entity.
 */
public interface LevelJumpingHisSearchRepository extends ElasticsearchRepository<LevelJumpingHis, Long> {
}
