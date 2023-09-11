package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @EntityGraph(attributePaths = "authorities") // Eager 조회
    Optional<Member> findOneWithAuthoritiesByLoginId(String loginId);
}