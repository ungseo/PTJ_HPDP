package com.stn.hpdp.controller.message;

import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.controller.message.request.SendMessageReq;
import com.stn.hpdp.controller.message.response.FindMessagesRes;
import com.stn.hpdp.service.message.MessageQueryService;
import com.stn.hpdp.service.message.MessageService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.stn.hpdp.common.exception.ErrorCode.INVALID_FIELDS_REQUEST;
import static com.stn.hpdp.common.util.LogCurrent.*;

@Slf4j
@Api
@RequiredArgsConstructor
@RequestMapping("/api/messages")
@RestController
public class MessageController {

    private final MessageService messageService;
    private final MessageQueryService messageQueryService;

    @PostMapping("") // 쪽지 보내기
    public ApiResponse<Object> sendMessage(@Validated @RequestBody SendMessageReq sendMessageReq, Errors errors) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        // validation check
        if (errors.hasErrors()) {
            errors.getFieldErrors().forEach(e-> {
                System.out.println("message : " + e.getDefaultMessage());
            });
            log.info(logCurrent(getClassName(), getMethodName(), END));
            throw new CustomException(INVALID_FIELDS_REQUEST);
        }

        messageService.sendMessage(sendMessageReq);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.messageOk("Success");
    }

    @GetMapping("") // 쪽지 조회
    public ApiResponse<Object> getMessages(@RequestParam(required = false, name = "flag") Integer flag) {
        log.info(logCurrent(getClassName(), getMethodName(), START));

        List<FindMessagesRes> result = messageQueryService.getMessages(flag);

        log.info(logCurrent(getClassName(), getMethodName(), END));

        return ApiResponse.ok(result);
    }
}
