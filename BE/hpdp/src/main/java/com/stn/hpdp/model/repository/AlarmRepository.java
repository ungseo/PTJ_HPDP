package com.stn.hpdp.model.repository;

import com.stn.hpdp.model.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}