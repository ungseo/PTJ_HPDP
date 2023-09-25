package com.stn.hpdp.service.message;

import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.message.response.FindMessagesRes;
import com.stn.hpdp.model.entity.Message;
import com.stn.hpdp.model.repository.MessageQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MessageQueryService {

    private final MessageQueryRepository messageQueryRepository;

    public List<FindMessagesRes> getMessages(Integer flag) {
        boolean isUser = SecurityUtil.checkUser();
        List<Message> result = messageQueryRepository.findMessagesByFlag(flag, isUser);

        List<FindMessagesRes> findMessagesResList = new ArrayList<>();
        for (Message message : result){
            FindMessagesRes findMessagesRes = new FindMessagesRes().of(message);
            // opponent name 세팅
            if(isUser) findMessagesRes.setOpponentName(message.getCompany().getName());
            else findMessagesRes.setOpponentName(message.getMember().getName());
        }

        return findMessagesResList;
    }
}
