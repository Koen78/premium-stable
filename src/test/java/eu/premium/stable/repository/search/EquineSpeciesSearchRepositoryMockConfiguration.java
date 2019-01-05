package eu.premium.stable.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of EquineSpeciesSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EquineSpeciesSearchRepositoryMockConfiguration {

    @MockBean
    private EquineSpeciesSearchRepository mockEquineSpeciesSearchRepository;

}
