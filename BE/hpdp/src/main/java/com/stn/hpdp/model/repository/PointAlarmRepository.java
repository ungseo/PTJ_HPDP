package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.PointAlarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointAlarmRepository extends JpaRepository<PointAlarm, Long> {
}