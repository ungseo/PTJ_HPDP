package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findAccountByMember_Id(Long memberId);
}