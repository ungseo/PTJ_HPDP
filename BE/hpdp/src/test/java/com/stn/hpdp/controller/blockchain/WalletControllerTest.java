package com.stn.hpdp.controller.blockchain;

import com.stn.hpdp.ControllerTestSupport;
import com.stn.hpdp.controller.blockchain.response.WalletRes;
import com.stn.hpdp.service.blockchain.WalletQueryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@SpringBootTest
class WalletControllerTest extends ControllerTestSupport {

    @MockBean
    private WalletQueryService walletQueryService;

    @DisplayName("로그인 한 사용자의 지갑을 조회 할 수 있다.")
    @WithMockUser
    @Test
    void getWallet() throws Exception {
        //given
        WalletRes walletRes = createWalletRes("0x12345678", "file", "pw");

        //when
        given(walletQueryService.findWallet()).willReturn(walletRes);
        //then
        mockMvc.perform(
                        get("/api/wallet")
                                .with(csrf())
                )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value("200"))
                .andExpect(jsonPath("$.status").value("OK"))
                .andExpect(jsonPath("$.message").value("SUCCESS"))
                .andExpect(jsonPath("$.data").isNotEmpty());
    }

    private WalletRes createWalletRes(String account, String file, String pw) {
        return WalletRes.builder()
                .account(account)
                .keyfile(file)
                .keyPw(pw)
                .build();
    }


}