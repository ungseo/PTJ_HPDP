package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Wallet findByMember_Id(Long memberId);
}
