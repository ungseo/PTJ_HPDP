package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.TrxReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends JpaRepository<TrxReceipt, Long> {

    TrxReceipt findByPointHistoryId(Long pointHistoryId);
    @Query(value = "SELECT * FROM TrxReceipt ORDER BY createdDate DESC LIMIT 1", nativeQuery = true)
    TrxReceipt findOneCond();
}
