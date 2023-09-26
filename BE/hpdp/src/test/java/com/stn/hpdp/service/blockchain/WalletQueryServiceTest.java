package com.stn.hpdp.service.blockchain;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Wallet;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.WalletRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Transactional
class WalletQueryServiceTest extends IntegrationTestSupport {

    @Autowired
    private WalletQueryService walletQueryService;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("로그인 한 사용자의 지갑을 조회 할 때 지갑을 가지고 있지 않다면 예외가 발생한다.")
    @WithMockUser(username = "test")
    @Test
    void getWalletNotExist() throws Exception {
        //given
        Member member = InsertMember();

        //when
        //then
        assertThatThrownBy(() -> walletQueryService.findWallet())
                .isInstanceOf(CustomException.class)
                .satisfies(e -> {
                    CustomException customException = (CustomException) e;
                    assertThat(customException.getErrorCode()).isEqualTo(ErrorCode.WALLET_NOT_FOUND);
                });

    }
//
//    @DisplayName("로그인한 사용자의 지갑을 조회 할 수 있다.")
//    @WithMockUser(username = "test", value = "ROLE")
//    @Test
//    public void getWallet() {
//        // Given
//
//        Member member = InsertMember();
//        Wallet wallet = InsertWallet("0x6f68CF31F6278B22c3d6355c39833592654d0225", "UTC--2023-09-15T05-52-01.470016300Z--879788d3c7bf2161e0696146cfdcfc77c4b493be", "1q2w3e4r!", member);
//
//
//        // When
//        WalletRes response = walletQueryService.findWallet();
//        // Then
//        assertThat(response.getAccount()).isEqualTo(wallet.getAccount());
//    }

    private Wallet InsertWallet(String account, String keyfile, String keyPw, Member member) {
        Wallet wallet = Wallet.builder()
                .account(account)
                .keyFile(keyfile)
                .keyPw(keyPw)
                .member(member)
                .build();
        return walletRepository.save(wallet);
    }

    private Member InsertMember() {
        Member member = Member.builder()
                .loginId("test")
                .loginPw("test")
                .name("test")
                .build();
        return memberRepository.save(member);
    }

}