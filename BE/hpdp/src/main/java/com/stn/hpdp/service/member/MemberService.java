package com.stn.hpdp.service.member;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.member.requset.MemberUpdateReq;
import com.stn.hpdp.controller.member.response.MemberInfoRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional(readOnly = true)
    public MemberInfoRes getMemberInfo() {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return MemberInfoRes.from(member);
    }
    @Transactional
    public MemberInfoRes updateMemberInfo(MemberUpdateReq memberUpdateReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberRepository.findByLoginId(auth.getName())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        member.setProfile(memberUpdateReq.getProfile());
        member.setName(memberUpdateReq.getName());
        member.setPhoneNumber(memberUpdateReq.getPhoneNumber());
        member.setEmail(memberUpdateReq.getEmail());

        memberRepository.save(member);

        log.info(logCurrent(getClassName(), getMethodName(), END));
        return MemberInfoRes.from(member);
    }

}