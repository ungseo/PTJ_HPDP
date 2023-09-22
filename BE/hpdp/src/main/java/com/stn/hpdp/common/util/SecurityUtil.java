package com.stn.hpdp.common.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SecurityUtil {
    public static String getCurrentMemberLoginId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        return authentication.getName();
    }
    public static List<String> getCurrentMemberRole() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        List<String> list = new ArrayList<>();
        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
        for(GrantedAuthority role : roles) {
            list.add(role.getAuthority());
        }
        return list;
    }
    public static boolean checkUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }

        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
        for(GrantedAuthority role : roles) {
            if(role.getAuthority().equals("ROLE_USER"))
                return true;
        }
        return false;
    }

    public static boolean checkCompany() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }

        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
        for(GrantedAuthority role : roles) {
            if(role.getAuthority().equals("ROLE_COMPANY"))
                return true;
        }
        return false;
    }
}