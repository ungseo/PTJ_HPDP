package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.NewsAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NewsAlarmRepository extends JpaRepository<NewsAlarm, Long> {
    Optional<NewsAlarm> findById(long id);
    Optional<NewsAlarm> findByIdAndMember_Id(long id, long memberId);
    List<NewsAlarm> findByMember_Id(long memberId);
}