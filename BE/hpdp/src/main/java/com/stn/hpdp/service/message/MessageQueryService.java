package com.stn.hpdp.service.message;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.message.response.FindDetailMessageRes;
import com.stn.hpdp.controller.message.response.FindMessagesRes;
import com.stn.hpdp.model.entity.Message;
import com.stn.hpdp.model.repository.MessageQueryRepository;
import com.stn.hpdp.model.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.stn.hpdp.common.exception.ErrorCode.MESSAGE_NOT_FOUND;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MessageQueryService {

    private final MessageQueryRepository messageQueryRepository;
    private final MessageRepository messageRepository;

    public List<FindMessagesRes> getMessages(Integer flag) {
        boolean isUser = SecurityUtil.checkUser();
        List<Message> result = messageQueryRepository.findMessagesByFlag(flag, isUser);
        log.info("size: {}", result.size());

        List<FindMessagesRes> findMessagesResList = new ArrayList<>();
        for (Message message : result){
            FindMessagesRes findMessagesRes = new FindMessagesRes().of(message);
            // opponent name 세팅
            if(isUser) findMessagesRes.setOpponentName(message.getCompany().getName());
            else findMessagesRes.setOpponentName(message.getMember().getName());
            findMessagesResList.add(findMessagesRes);
        }

        return findMessagesResList;
    }

    public FindDetailMessageRes getDetailMessage(Long messageId) {
        Optional<Message> result = messageRepository.findById(messageId);
        if(result.isEmpty()){
            throw new CustomException(MESSAGE_NOT_FOUND);
        }

        boolean isUser = SecurityUtil.checkUser();
        FindDetailMessageRes findDetailMessageRes = new FindDetailMessageRes().of(result.get());
        if(isUser) findDetailMessageRes.setOpponentName(result.get().getCompany().getName());
        else findDetailMessageRes.setOpponentName(result.get().getMember().getName());

        return findDetailMessageRes;
    }
}
