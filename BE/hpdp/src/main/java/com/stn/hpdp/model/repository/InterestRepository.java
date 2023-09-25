package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findByMember_Id(Long memberId);
    boolean existsByCompany_Id(Long companyId);
    boolean existsByMember_IdAndCompany_Id(Long memberId, Long companyId);
    Interest findByCompany_Id(Long companyId);
    Interest findByMember_IdAndCompany_Id(Long memberId, Long companyId);

}