package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Funding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FundingRepository extends JpaRepository<Funding, Long> {
}