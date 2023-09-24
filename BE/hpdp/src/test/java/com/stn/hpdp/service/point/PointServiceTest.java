package com.stn.hpdp.service.point;

import com.stn.hpdp.IntegrationTestSupport;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.exception.ErrorCode;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@Transactional
class PointServiceTest extends IntegrationTestSupport {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PointService pointService;

    @DisplayName("사용자가 후원 시 후원 금액보다 가지고 있는 포인트가 적을시 예외가 발생한다.")
    @WithMockUser(username = "test")
    @Test
    void fundingFailByNotEnoughPoint() throws Exception {
        //given
        Member member = createMember(50000);


        //when
        //then
        assertThatThrownBy(() -> pointService.fundingCheck(100000))
                .isInstanceOf(CustomException.class)
                .satisfies(e -> {
                    CustomException customException = (CustomException) e;
                    assertThat(customException.getErrorCode()).isEqualTo(ErrorCode.SCARCE_POINT_BAD_REQUEST);
                });
    }

    private Member createMember(int point) {
        Member member = Member.builder()
                .loginId("test")
                .loginPw("test")
                .point(point)
                .name("test")
                .build();
        return memberRepository.save(member);
    }

}