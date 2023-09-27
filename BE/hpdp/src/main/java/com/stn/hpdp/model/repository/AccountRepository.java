package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findAccountByMember_Id(Long memberId);

    @Query("SELECT a from Account a where mod(a.balance, 1000) != 0")
    List<Account> getAccounts();
}