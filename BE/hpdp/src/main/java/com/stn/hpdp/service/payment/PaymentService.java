package com.stn.hpdp.service.payment;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.payment.request.SavePaymentReq;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.PointHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.util.LogCurrent.*;
@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentService {
    private final MemberRepository memberRepository;
    private final PointHistoryRepository pointHistoryRepository;
    @Transactional
    public void savePayment (SavePaymentReq savePaymentReq){
        log.info(logCurrent(getClassName(), getMethodName(), START));

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        pointHistoryRepository.save(savePaymentReq.toEntity(member));
        log.info(logCurrent(getClassName(), getMethodName(), END));
    }
}