package com.stn.hpdp.service.auth;

import com.stn.hpdp.common.exception.CustomException;
import com.stn.hpdp.model.entity.Company;
import com.stn.hpdp.model.entity.Member;
import com.stn.hpdp.model.repository.CompanyRepository;
import com.stn.hpdp.model.repository.MemberRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import static com.stn.hpdp.common.exception.ErrorCode.ID_ALREADY_EXIST;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        if(memberRepository.existsByLoginId(loginId)) {
            return memberRepository.findByLoginId(loginId)
                    .map(this::createUserDetails)
                    .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
        }
        else {
            return companyRepository.findByLoginId(loginId)
                    .map(this::createUserDetails)
                    .orElseThrow(() -> new UsernameNotFoundException("해당하는 기업을 찾을 수 없습니다."));
        }

    }
    // 해당하는 User 의 데이터가 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(Member member) {
        return new User(member.getLoginId(), member.getPassword(), member.getAuthorities());
    }

    private UserDetails createUserDetails(Company company) {
        return new User(company.getLoginId(), company.getPassword(), company.getAuthorities());
    }
}