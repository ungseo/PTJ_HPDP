package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {

}