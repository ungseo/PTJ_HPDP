package com.stn.hpdp.model.repository;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Wallet;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.*;


@Transactional
class WalletQueryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private WalletQueryRepository walletQueryRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("로그인한 사용자의 지갑 주소, 키파일, 비밀번호를 조회 할 수 있다.")
    @Test
    void getWallet() throws Exception {
        //given
        Member member = InsertMember();
        Wallet wallet = InsertWallet("0x6f68CF31F6278B22c3d6355c39833592654d0225", "UTC--2023-09-15T05-52-01.470016300Z--879788d3c7bf2161e0696146cfdcfc77c4b493be", "1q2w3e4r!", member);

        //when
        WalletRes walletRes = walletQueryRepository.findWalletByMember(member.getId());

        //then
        assertThat(walletRes.getAccount()).isEqualTo(wallet.getAccount());

    }

    private Member InsertMember() {
        Member member = Member.builder()
                .loginId("test")
                .loginPw("test")
                .name("test")
                .build();
        return memberRepository.save(member);
    }

    private Wallet InsertWallet(String account, String keyfile, String keyPw, Member member) {
        Wallet wallet = Wallet.builder()
                .account(account)
                .keyFile(keyfile)
                .keyPw(keyPw)
                .member(member)
                .build();
        return walletRepository.save(wallet);
    }


}