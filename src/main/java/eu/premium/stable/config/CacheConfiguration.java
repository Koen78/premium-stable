package eu.premium.stable.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(eu.premium.stable.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(eu.premium.stable.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Person.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Person.class.getName() + ".stables", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Person.class.getName() + ".horses", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Stable.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Stable.class.getName() + ".horses", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Stable.class.getName() + ".owners", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".pictures", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".videos", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".competitions", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".medChecks", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".levelJumpingHisses", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".levelDressageHisses", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Horse.class.getName() + ".owners", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.EquineSpecies.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Race.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.LevelDressage.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.LevelJumping.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.LevelDressageHis.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Gender.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Color.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.LevelJumpingHis.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.LanguageParam.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Picture.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.MedCheck.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.MedCheck.class.getName() + ".details", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.MedCheck.class.getName() + ".xrays", jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.MedCheckDet.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.MedCheckXray.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Video.class.getName(), jcacheConfiguration);
            cm.createCache(eu.premium.stable.domain.Competition.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
