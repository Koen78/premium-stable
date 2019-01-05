package eu.premium.stable.repository.search;

import eu.premium.stable.domain.LevelJumping;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the LevelJumping entity.
 */
public interface LevelJumpingSearchRepository extends ElasticsearchRepository<LevelJumping, Long> {
}
