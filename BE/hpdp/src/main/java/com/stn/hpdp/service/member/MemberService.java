package com.stn.hpdp.service.member;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.member.Request.SignUpReq;
import com.stn.hpdp.controller.member.Response.SignUpRes;
import com.stn.hpdp.model.entity.Authority;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.USER_ALREADY_EXIST;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public SignUpRes signup(SignUpReq signUpReq) {
        if (memberRepository.findOneWithAuthoritiesByLoginId(signUpReq.getLoginId()).orElse(null) != null) {
            throw new CustomException(USER_ALREADY_EXIST);
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        Member member = Member.builder()
                .loginId(signUpReq.getLoginId())
                .loginPw(passwordEncoder.encode(signUpReq.getLoginPw()))
                .name(signUpReq.getName())
                .authorities(Collections.singleton(authority))
                .email(signUpReq.getEmail())
                .phoneNumber(signUpReq.getPhoneNumber())
                .address(signUpReq.getAddress())
                .build();

//        return memberRepository.save(member);
        return SignUpRes.from(memberRepository.save(member));
    }

    @Transactional(readOnly = true)
    public Optional<Member> getUserWithAuthorities(String loginId) {
        return memberRepository.findOneWithAuthoritiesByLoginId(loginId);
    }
//    public SignUpReq getUserWithAuthorities(String loginId) {
//        return SignUpReq.from(memberRepository.findOneWithAuthoritiesByLoginId(loginId).orElse(null));
//    }

    @Transactional(readOnly = true)
    public Optional<Member> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(memberRepository::findOneWithAuthoritiesByLoginId);
    }
//    public SignUpReq getMyUserWithAuthorities() {
//        return SignUpReq.from(SecurityUtil.getCurrentUsername().flatMap(memberRepository::findOneWithAuthoritiesByLoginId).orElse(null));
//    }
}