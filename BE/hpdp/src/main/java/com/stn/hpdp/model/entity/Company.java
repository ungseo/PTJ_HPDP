package com.stn.hpdp.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stn.hpdp.controller.company.request.UpdateCompanyReq;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "company")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
public class Company extends TimeBaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long id;

    @NonNull
    private String loginId;

    @JsonIgnore
    @NonNull
    private String loginPw;

    @NonNull
    private String name;

    @NotNull
    private String hashtag;

    @NotNull
    private String email;

    @NotNull
    private String phoneNumber;

    @NotNull
    private String address;

    @NotNull
    private String registrationNumber;

    @NotNull
    private String websiteUrl;

    @NotNull
    @Column(length = 500)
    private String introduce;

    @NotNull
    private String accountNumber;

    private String profile;
    private String banner;
    private String privateKey;
    private int point;

    @Column
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    public void changePoint(int point) {
        this.point += point;
    }

    public void update(UpdateCompanyReq updateCompanyReq) {
        this.name = updateCompanyReq.getHashtag();
        this.phoneNumber = updateCompanyReq.getPhoneNumber();
        this.email = updateCompanyReq.getEmail();
        this.websiteUrl = updateCompanyReq.getWebsiteUrl();
        this.introduce = updateCompanyReq.getIntroduce();
        this.hashtag = updateCompanyReq.getHashtag();
        this.accountNumber = updateCompanyReq.getAccountNumber();
    }

    @Override
    public String getPassword() {
        return loginPw;
    }

    @Override
    public String getUsername() {
        return loginId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
