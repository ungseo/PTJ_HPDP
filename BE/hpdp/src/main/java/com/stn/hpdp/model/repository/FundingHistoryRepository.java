package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Funding;
import com.stn.hpdp.model.entity.FundingHistory;
import com.stn.hpdp.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FundingHistoryRepository extends JpaRepository<FundingHistory, Long> {
    List<FundingHistory> findAllByMember_Id(Long memberId);

    @Query("SELECT DISTINCT fh.funding FROM FundingHistory fh WHERE fh.member.id = :memberId")
    List<Funding> findDistinctFundingByMemberId(Long memberId);

    FundingHistory findByFunding_Id(Long fundingId);

    List<FundingHistory> findAllByFunding_Id(Long fundingId);

    @Query("SELECT distinct fh.member from FundingHistory fh where fh.funding.id = :fundingId")
    List<Member> getParticipantByFundingId(@Param(value="fundingId") Long fundingId);

    @Query("SELECT SUM(price) FROM FundingHistory")
    Integer getSumPrice();

    @Query("SELECT SUM(price) FROM FundingHistory where funding.id = :fundingId")
    Integer getSumPriceByFundingId(@Param(value="fundingId") Long fundingId);
}