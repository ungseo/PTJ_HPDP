package com.stn.hpdp.service.auth;
import com.stn.hpdp.common.ApiResponse;
import com.stn.hpdp.common.enums.Authority;
import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.common.util.SecurityUtil;
import com.stn.hpdp.controller.auth.Request.CompanySignUpReq;
import com.stn.hpdp.controller.auth.Request.ReissueReq;
import com.stn.hpdp.controller.auth.Request.SignInReq;
import com.stn.hpdp.controller.auth.Request.SignUpReq;
import com.stn.hpdp.controller.auth.Response.SignInRes;
import com.stn.hpdp.controller.auth.Response.TokenInfoRes;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;
import com.stn.hpdp.common.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

import static com.stn.hpdp.common.exception.ErrorCode.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisTemplate redisTemplate;

    public ApiResponse<Object> memberSignUp(SignUpReq signUpReq) {
        if (memberRepository.existsByLoginId(signUpReq.getLoginId())) {
            throw new CustomException(USER_ALREADY_EXIST);
        }

        Member member = Member.builder()
                .loginId(signUpReq.getLoginId())
                .loginPw(passwordEncoder.encode(signUpReq.getLoginPw()))
                .name(signUpReq.getName())
                .phoneNumber(signUpReq.getPhoneNumber())
                .email(signUpReq.getEmail())
                .address(signUpReq.getAddress())
                .roles(Collections.singletonList(Authority.ROLE_USER.name()))
                .build();
        memberRepository.save(member);

        return ApiResponse.messageOk("회원가입에 성공했습니다.");
    }

    public ApiResponse<Object> CompanySignUp(CompanySignUpReq signUpReq) {
        if (companyRepository.existsByLoginId(signUpReq.getLoginId())) {
            throw new CustomException(USER_ALREADY_EXIST);
        }

        Company company = Company.builder()
                .loginId(signUpReq.getLoginId())
                .loginPw(passwordEncoder.encode(signUpReq.getLoginPw()))
                .name(signUpReq.getName())
                .phoneNumber(signUpReq.getPhoneNumber())
                .email(signUpReq.getEmail())
                .address(signUpReq.getAddress())
                .websiteUrl(signUpReq.getWebsiteUrl())
                .introduce(signUpReq.getIntroduce())
                .hashtag(signUpReq.getHashtag())
                .accountNumber(signUpReq.getAccountNumber())
                .roles(Collections.singletonList(Authority.ROLE_COMPANY.name()))
                .build();
        companyRepository.save(company);

        return ApiResponse.messageOk("기업 회원가입에 성공했습니다.");
    }

    public ApiResponse<Object> checkLoginId(String loginId) {
        if(memberRepository.countByLoginId(loginId) > 0){
            throw new CustomException(ID_ALREADY_EXIST);
        }
        return ApiResponse.messageOk("사용 가능한 ID 입니다.");
    }

    public ApiResponse<Object> signIn(SignInReq signIpReq, HttpServletResponse response) {

        Member member = memberRepository.findByLoginId(signIpReq.getLoginId())
                .orElseThrow(() -> new CustomException(USER_BAD_REQUEST));

        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = signIpReq.toAuthentication();

        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenInfoRes tokenInfo = jwtTokenProvider.generateToken(authentication);
        setHeader(response, tokenInfo);

        // 4. RefreshToken Redis 저장 (expirationTime 설정을 통해 자동 삭제 처리)
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        SignInRes signInRes = SignInRes.builder()
                .name(member.getName())
                .build();
        return ApiResponse.messageDataOk("로그인에 성공했습니다.", signInRes);
    }

    public ApiResponse<Object> regenerate(ReissueReq reissue, HttpServletResponse response) {
        // 1. Refresh Token 검증
        if (!jwtTokenProvider.validateToken(reissue.getRefreshToken())) {
            throw new CustomException(REFRESH_TOKEN_NOT_VALID);
        }

        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(reissue.getAccessToken());

        // 3. Redis 에서 User email 을 기반으로 저장된 Refresh Token 값을 가져옵니다.
        String refreshToken = (String)redisTemplate.opsForValue().get("RT:" + authentication.getName());
        // (추가) 로그아웃되어 Redis 에 RefreshToken 이 존재하지 않는 경우 처리
        if(ObjectUtils.isEmpty(refreshToken)) {
            throw new CustomException(REFRESH_TOKEN_EMPTY);
        }
        if(!refreshToken.equals(reissue.getRefreshToken())) {
            throw new CustomException(REFRESH_TOKEN_MISMATCH);
        }

        // 4. 새로운 토큰 생성
        TokenInfoRes tokenInfo = jwtTokenProvider.generateToken(authentication);
        setHeader(response, tokenInfo);

        // 5. RefreshToken Redis 업데이트
        redisTemplate.opsForValue()
                .set("RT:" + authentication.getName(), tokenInfo.getRefreshToken(), tokenInfo.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return ApiResponse.messageOk("Token 정보가 갱신되었습니다.");
    }

    public ApiResponse<Object> signOut(HttpServletRequest request) {

        String token = resolveToken(request);
        // 1. Access Token 검증
        if (!jwtTokenProvider.validateToken(token)) {
            throw new CustomException(TOKEN_BAD_REQUEST);
        }

        // 2. Access Token 에서 User email 을 가져옵니다.
        Authentication authentication = jwtTokenProvider.getAuthentication(token);

        // 3. Redis 에서 해당 User email 로 저장된 Refresh Token 이 있는지 여부를 확인 후 있을 경우 삭제합니다.
        if (redisTemplate.opsForValue().get("RT:" + authentication.getName()) != null) {
            // Refresh Token 삭제
            redisTemplate.delete("RT:" + authentication.getName());
        }

        // 4. 해당 Access Token 유효시간 가지고 와서 BlackList 로 저장하기
        Long expiration = jwtTokenProvider.getExpiration(token);
        redisTemplate.opsForValue()
                .set(token, "logout", expiration, TimeUnit.MILLISECONDS);

        return ApiResponse.messageOk("로그아웃 되었습니다.");
    }

    public ApiResponse<Object> authority() {
        // SecurityContext에 담겨 있는 authentication userEamil 정보
        String loginId = SecurityUtil.getCurrentMemberLoginId();

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("No authentication information."));

        // add ROLE_ADMIN
        member.getRoles().add(Authority.ROLE_ADMIN.name());
        memberRepository.save(member);

        return ApiResponse.ok(null);
    }

    private static final String AUTHORIZATION_HEADER = "AccessToken";
    private static final String BEARER_TYPE = "Bearer";

    // Request Header 에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        System.out.println(request);
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private void setHeader(HttpServletResponse response, TokenInfoRes tokenInfo) {
        response.addHeader("accessToken", tokenInfo.getAccessToken());
        response.addHeader("refreshToken", tokenInfo.getRefreshToken());
    }
}