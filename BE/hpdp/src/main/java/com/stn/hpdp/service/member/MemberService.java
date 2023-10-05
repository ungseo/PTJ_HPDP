package com.stn.hpdp.service.member;

import com.stn.hpdp.common.AwsS3Uploader;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.member.request.UpdateMemberPwReq;
import com.stn.hpdp.controller.member.request.UpdateMemberReq;
import com.stn.hpdp.controller.member.response.FindMemberInfoRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AwsS3Uploader awsS3Uploader;

    @Transactional
    public FindMemberInfoRes updateMemberInfo(UpdateMemberReq memberUpdateReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        member.changeInfo(memberUpdateReq);

        if (memberUpdateReq.getProfile() != null) {
            try {
                String profileUrl = awsS3Uploader.uploadFile(memberUpdateReq.getProfile(), "member/profile");
                member.setProfile(profileUrl);
                System.out.println(profileUrl);
            } catch (IOException e) {
                log.info(e.getMessage());
            }
        }
        log.info(logCurrent(getClassName(), getMethodName(), END));
        return FindMemberInfoRes.of(member);
    }

    @Transactional
    public void updatePassword(UpdateMemberPwReq updateMemberPwReq) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        member.changePw(passwordEncoder.encode(updateMemberPwReq.getLoginPw()));
    }
}