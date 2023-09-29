package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.TrxReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends JpaRepository<TrxReceipt, Long> {

    TrxReceipt findByFunding_Id(Long fundingId);
}
