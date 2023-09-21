package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.WalletQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.stn.hpdp.common.exception.ErrorCode.USER_NOT_FOUND;
import static com.stn.hpdp.common.exception.ErrorCode.WALLET_NOT_FOUND;


@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class WalletQueryService {

    private final WalletQueryRepository walletQueryRepository;
    private final MemberRepository memberRepository;

    public WalletRes findWallet() {

        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        WalletRes response = walletQueryRepository.findWalletByMember(member.getId());
        if (response == null) throw new CustomException(WALLET_NOT_FOUND);
        return response;
    }
}
