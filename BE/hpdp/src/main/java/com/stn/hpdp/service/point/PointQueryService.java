package com.stn.hpdp.service.point;

import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.model.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class PointQueryService {

    private final MemberRepository memberRepository;

    public int getPoint() {
        return memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId()).get().getPoint();
    }


}

