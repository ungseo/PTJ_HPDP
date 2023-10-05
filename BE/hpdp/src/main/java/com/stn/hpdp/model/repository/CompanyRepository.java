package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findByLoginId(String loginId);
    Company findById(long id);
    int countByLoginId(String loginId);
    boolean existsByLoginId(String loginId);
}