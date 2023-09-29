package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.NewsAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsAlarmRepository extends JpaRepository<NewsAlarm, Long> {
}