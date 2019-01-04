package eu.premium.stable.repository.search;

import eu.premium.stable.domain.EquineSpecies;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EquineSpecies entity.
 */
public interface EquineSpeciesSearchRepository extends ElasticsearchRepository<EquineSpecies, Long> {
}
