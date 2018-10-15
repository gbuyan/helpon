package io.halpon.backend.service.impl;

import io.halpon.backend.domain.User;
import io.halpon.backend.service.AuthService;
import io.halpon.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    @Autowired
    public AuthServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void auth() {
        User user = userService.getUser();
        if (user == null) {
            throw new AccessDeniedException("User not found");
        } else {
            SecurityContextHolder.getContext().setAuthentication(user);
        }
    }
}
