package com.mysite.sbb.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SiteUser create(String username, String email, String password){
        SiteUser user = new SiteUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        // SecurityConfig.java에서 빈으로 등록한 PasswordEncoder 객체 주입받아 사용
            // 빈(Bean) 스프링 컨테이너에서 관리되는 재사용 가능한 자바 객체
        this.userRepository.save(user);
        return user;
    }
}

