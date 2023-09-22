package com.stn.hpdp.service.message;

import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.message.request.SendMessageReq;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.entity.Message;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.model.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;

    public void sendMessage(SendMessageReq sendMessageReq){
        String loginId = SecurityUtil.getCurrentMemberLoginId();
        boolean isUser = SecurityUtil.checkUser();
        Member member = isUser ? memberRepository.findByLoginId(loginId).get() : memberRepository.findById(sendMessageReq.getReceiverId()).get();
        Company company = isUser ? companyRepository.findById(sendMessageReq.getReceiverId()).get() : companyRepository.findByLoginId(loginId).get();

        Message message = sendMessageReq.toEntity(company, member, isUser);

        messageRepository.save(message);
    }

}