package com.stn.hpdp.service.bank;

import com.stn.hpdp.common.enums.BankCode;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.bank.request.SaveAccountReq;
import com.stn.hpdp.controller.bank.request.TransferAccountReq;
import com.stn.hpdp.controller.bank.response.FindAccountRes;
import com.stn.hpdp.controller.bank.response.FindTransferRes;
import com.stn.hpdp.controller.bank.response.TransferAccountRes;
import com.stn.hpdp.controller.company.response.FindCompanyDetailRes;
import com.stn.hpdp.controller.company.response.FindCompanyRes;
import com.stn.hpdp.model.entity.*;
import com.stn.hpdp.model.repository.*;
import jnr.a64asm.Mem;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.swing.tree.TreeNode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class BankService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final TransferRepository transferRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final ApplicationEventPublisher eventPublisher;

    public void saveAccount(SaveAccountReq saveAccountReq){
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if(saved.isPresent()){
            saved.get().setMember(null);
            accountRepository.save(saved.get());
        }

        Account account = saveAccountReq.toEntity(member);
        accountRepository.save(account);
    }

    public FindAccountRes findAccount() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if (saved.isEmpty()) {
            throw new CustomException(CONNECTED_ACCOUNT_NOT_FOUND);
        }

        return FindAccountRes.of(saved.get());
    }

    public void deleteAccount(){
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if(saved.isPresent()){
            saved.get().setMember(null);
            accountRepository.save(saved.get());
        }
    }

    public TransferAccountRes transferAccount(TransferAccountReq transferAccountReq) {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if (saved.isEmpty()) {
            throw new CustomException(CONNECTED_ACCOUNT_NOT_FOUND);
        }

        // opponentBankCode 임의 세팅
        String name = transferAccountReq.getOpponentName();
        if(name.equals("Americano") || name.equals("americano") || name.equals("아메리카노")){
            transferAccountReq.setOpponentBankCode(BankCode.KDB);
        }else if(name.equals("Candy") || name.equals("candy") || name.equals("사탕")){
            transferAccountReq.setOpponentBankCode(BankCode.IBK);
        }else if(name.equals("Allowance") || name.equals("allowance") || name.equals("용돈")){
            transferAccountReq.setOpponentBankCode(BankCode.KB);
        }else if(name.equals("Salary") || name.equals("salary") || name.equals("월급")){
            transferAccountReq.setOpponentBankCode(BankCode.NH);
        }else{
            transferAccountReq.setOpponentBankCode(BankCode.GJ);
        }
        Transfer transfer = transferAccountReq.toEntity(saved.get());
        transferRepository.save(transfer);

        saved.get().setBalance(transfer.getAfterBlnc());
        accountRepository.save(saved.get());

        return TransferAccountRes.of(transfer);
    }

    @Transactional
    @Scheduled(cron = "10 * * * * *") // 10초마다 자동이체
    public void autopay(){
        // 1. account 남은 잔액 확인
        List<Account> accounts = accountRepository.getAccounts();
        if(accounts.isEmpty()) return;

        for (Account account : accounts){
            int penny = account.getBalance() % 1000;
            // 2. 남은 잔액 빼고 account 저장
            account.setBalance(account.getBalance() - penny);
            accountRepository.save(account);

            // 3. transfer에 저장
            Transfer transfer = Transfer.builder()
                    .account(account)
                    .uuid(UUID.randomUUID())
                    .opponentBankCode(BankCode.NH)
//                    .opponentName("포인트 자동 충전")
                    .opponentName("point autopay")
                    .opponentAccount("123-456-78910")
                    .flag(true)
                    .depositAmount(penny)
                    .afterBlnc(account.getBalance())
                    .build();
            transferRepository.save(transfer);

            // 4. point에 저장
            Optional<Member> member = memberRepository.findById(account.getMember().getId());
            member.get().setPoint(member.get().getPoint() + penny);
            memberRepository.save(member.get());
            PointHistory pointHistory = PointHistory.builder()
                    .member(member.get())
//                    .content("자동이체")
                    .content("autopay")
                    .flag(false)
                    .paymentPoint(penny)
                    .afterPoint(member.get().getPoint())
                    .build();
            pointHistoryRepository.save(pointHistory);
        }
    }

    public List<FindTransferRes> findTransfer() {
        Member member = memberRepository.findByLoginId(SecurityUtil.getCurrentMemberLoginId())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Optional<Account> saved = accountRepository.findAccountByMember_Id(member.getId());
        if (saved.isEmpty()) {
            throw new CustomException(CONNECTED_ACCOUNT_NOT_FOUND);
        }

        List<Transfer> transferList = transferRepository.findAllByAccount_Uuid(saved.get().getUuid());
        List<FindTransferRes> result = new ArrayList<>();
        for (Transfer transfer : transferList){
            result.add(FindTransferRes.of(transfer));
        }

        return result;
    }
}