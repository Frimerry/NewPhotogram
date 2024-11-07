package com.cos.photogramstart.service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.photogramstart.domain.user.User;
import com.cos.photogramstart.domain.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AuthService {
	
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder encoder;
	
	@Transactional
	public User toSignup(User user) throws Exception {
		// 회원가입
		
		// 아이디 중복 검사
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new Exception("이미 존재하는 아이디입니다.");
        }
        
		String orgPassword = user.getPassword();
		String encPassword = encoder.encode(orgPassword);
		user.setPassword(encPassword);
		user.setRole("ROLE_USER");
		return userRepository.save(user);
	}

}
