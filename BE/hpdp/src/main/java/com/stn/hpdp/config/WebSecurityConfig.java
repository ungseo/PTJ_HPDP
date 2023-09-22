package com.stn.hpdp.config;

import com.stn.hpdp.common.jwt.JwtAuthenticationFilter;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.common.jwt.JwtExceptionFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final CorsFilter corsFilter;
    private final JwtExceptionFilter jwtExceptionFilter;
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().mvcMatchers(
                "/error",
                "/favicon.ico",
                "/swagger-ui.html",
                "/swagger/**",
                "/swagger-resources/**",
                "/webjars/**"
        );
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .httpBasic().disable()
                .csrf().disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/hello").permitAll() // test api
                .antMatchers("/api/auth").permitAll()
                .antMatchers("/api/auth/logout").authenticated()
                .antMatchers("/api/members/adminTest").hasRole("ADMIN")
                .antMatchers("/api/companies").permitAll()
                .antMatchers("/api/banks").permitAll()
                .antMatchers(HttpMethod.GET, "/api/fundings").permitAll()
                .antMatchers("/api/fundings").hasRole("ADMIN")
                .antMatchers("/api/fundings/settle").hasRole("COMPANY")
                .antMatchers("/api/fundings/report").hasRole("COMPANY")
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter,JwtAuthenticationFilter.class); // jwt 에러처리를 위한 필터등록
        // JwtAuthenticationFilter를 UsernamePasswordAuthentictaionFilter 전에 적용시킨다.
    }

    // 암호화에 필요한 PasswordEncoder Bean 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}