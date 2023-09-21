package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.model.repository.WalletQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.stn.hpdp.common.exception.ErrorCode.WALLET_NOT_FOUND;


@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class WalletQueryService {

    private final WalletQueryRepository walletQueryRepository;

    public WalletRes findWallet(Long memberId) {
        WalletRes response = walletQueryRepository.findWalletByMember(memberId);
        if (response == null) throw new CustomException(WALLET_NOT_FOUND);
        return response;
    }
}
