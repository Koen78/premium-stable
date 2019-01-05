package eu.premium.stable.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of LevelJumpingSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class LevelJumpingSearchRepositoryMockConfiguration {

    @MockBean
    private LevelJumpingSearchRepository mockLevelJumpingSearchRepository;

}
